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
import { Prisma } from '@prisma/client';

@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  create(@Body() data: Prisma.DisciplineCreateInput) {
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
  update(@Param('id') id: string, @Body() data: Prisma.DisciplineUpdateInput) {
    return this.disciplineService.updateDiscipline(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplineService.deleteDiscipline(id);
  }
}
