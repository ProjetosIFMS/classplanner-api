import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../user/dto/Role';

@ApiTags('Discipline')
@Controller('discipline')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR)
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  create(@Body() data: CreateDisciplineDto) {
    return this.disciplineService.createDiscipline(data);
  }

  @Get()
  @Roles(Role.PROFESSOR, Role.COORDINATOR)
  findAll(
    @Query('includeModalities', new DefaultValuePipe(false), ParseBoolPipe)
    includeModalities: boolean,
  ) {
    return this.disciplineService.findAll(includeModalities);
  }

  @Get(':course_id')
  findByCourseId(
    @Param('course_id') course_id: string,
    @Query('includeModalities', new DefaultValuePipe(false), ParseBoolPipe)
    includeModalities: boolean,
  ) {
    return this.disciplineService.findDisciplinesByCourseId(
      course_id,
      includeModalities,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('includeModalities', new DefaultValuePipe(false), ParseBoolPipe)
    includeModalities: boolean,
  ) {
    return this.disciplineService.findDisciplineById(id, includeModalities);
  }

  @Get(':name')
  findByName(
    @Param('name') name: string,
    @Query('includeModalities', new DefaultValuePipe(false), ParseBoolPipe)
    includeModalities: boolean,
  ) {
    return this.disciplineService.findDisciplineByName(name, includeModalities);
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
