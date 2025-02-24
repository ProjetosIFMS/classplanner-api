import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../user/dto/Role';
import { ClassgradeDisciplineService } from './classgrade-discipline.service';
import { CreateClassgradeDisciplineDto } from './dto/create-classgrade-discipline.dto';
import { UpdateClassgradeDisciplineDto } from './dto/update-classgrade-discipline.dto';

@ApiTags('ClassgradeDiscipline')
@Controller('ClassgradeDiscipline')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR)
export class ClassgradeDisciplineController {
  constructor(
    private readonly classgradeDisciplineService: ClassgradeDisciplineService,
  ) {}

  @Post()
  create(@Body() data: CreateClassgradeDisciplineDto) {
    return this.classgradeDisciplineService.createClassgradeDiscipline(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateClassgradeDisciplineDto) {
    return this.classgradeDisciplineService.updateClassgradeDiscipline(
      id,
      data,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classgradeDisciplineService.deleteClassGradeDiscipline(id);
  }

  @Get()
  @Roles(Role.PROFESSOR)
  findAll() {
    return this.classgradeDisciplineService.findAllClassgradeDisciplines;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classgradeDisciplineService.findClassgradeDisciplineById(id);
  }

  @Get(':classGrade_id')
  findByClassgradeId(@Param('classGrade_id') classGrade_id: string) {
    return this.classgradeDisciplineService.findClassgradeDisciplineByClassgradeId(
      classGrade_id,
    );
  }

  @Get(':period_id')
  findByPeriodId(@Param('period_id') period_id: string) {
    return this.classgradeDisciplineService.findClassgradeDisciplineByPeriodId(
      period_id,
    );
  }
}
