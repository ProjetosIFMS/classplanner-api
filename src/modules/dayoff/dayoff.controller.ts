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
import { DayoffService } from './dayoff.service';
import { CreateDayoffDto } from './dto/create-dayoff.dto';
import { UpdateDayoffDto } from './dto/update-dayoff.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/modules/user/dto/Role';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Dayoff')
@Controller('dayoff')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR, Role.PROFESSOR)
export class DayoffController {
  constructor(private readonly dayoffService: DayoffService) {}

  @Post()
  @Roles(Role.PROFESSOR)
  createCourse(@Body() createDayoffDto: CreateDayoffDto) {
    return this.dayoffService.createDayoff(createDayoffDto);
  }

  @Get()
  findAllDayoffs() {
    return this.dayoffService.findAllDayoffs();
  }

  @Get(':id')
  findDayoffById(@Param('id') id: string) {
    return this.dayoffService.findDayoffById(id);
  }

  @Patch(':id')
  @Roles(Role.PROFESSOR)
  updateDayoff(
    @Param('id') id: string,
    @Body() updateDayoffDto: UpdateDayoffDto,
  ) {
    return this.dayoffService.updateDayoff(id, updateDayoffDto);
  }

  @Delete(':id')
  deleteDayoff(@Param('id') id: string) {
    return this.dayoffService.deleteDayoff(id);
  }
}
