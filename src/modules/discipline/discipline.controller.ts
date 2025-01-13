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
import { CreateDisciplineInput } from './inputs/create-discipline.input';
import { UpdateDisciplineInput } from './inputs/update-discipline.input';

@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  create(@Body() data: CreateDisciplineInput) {
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
  update(@Param('id') id: string, @Body() data: UpdateDisciplineInput) {
    return this.disciplineService.updateDiscipline(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplineService.deleteDiscipline(id);
  }
}
