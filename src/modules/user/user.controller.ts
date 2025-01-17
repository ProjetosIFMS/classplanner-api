import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './dto/Role';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.userService.createUser(data);
  }

  @Get()
  @Roles(Role.PROFESSOR)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.FindUserByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
