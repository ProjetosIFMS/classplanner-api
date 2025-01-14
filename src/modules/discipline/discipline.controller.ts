import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Discipline')
@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  create(@Body() data: CreateDisciplineDto) {
    return this.disciplineService.createDiscipline(data);
  }

  @Get()
  findAll() {
    return this.disciplineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplineService.findDisciplineById(id);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.disciplineService.findDisciplineByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDisciplineDto) {
    return this.disciplineService.updateDiscipline(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplineService.deleteDiscipline(id);
  }
}
