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
import { ClassgradeService } from './classgrade.service';
import { CreateClassGradeDto } from './dto/create-classgrade.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/modules/user/dto/Role';
import { UpdateClassGradeDto } from './dto/update-classgrade.dto';

@ApiTags('ClassGrade')
@Controller('classgrade')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR)
export class ClassgradeController {
  constructor(private readonly classgradeService: ClassgradeService) {}

  @Post()
  create(@Body() createClassgradeDto: CreateClassGradeDto) {
    return this.classgradeService.createClassGrade(createClassgradeDto);
  }

  @Get()
  findAll() {
    return this.classgradeService.findAllClassGrade();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classgradeService.findClassGradeById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateClassGradeDto) {
    return this.classgradeService.updateClassGrade(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classgradeService.deleteClassGrade(id);
  }
}
