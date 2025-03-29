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
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/modules/user/dto/Role';
import { ProfessorClassgradeService } from './professor-classgrade.service';
import { CreateProfessorClassGradeDto } from './dto/create-professor-classgrade.dto';
import { UpdateProfessorClassgradeDto } from './dto/update-professor-classgrade.dto';

@ApiTags('professor-classgrade')
@Controller('professor-classgrade')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR)
export class ProfessorClassgradeController {
  constructor(
    private readonly professorClassgradeService: ProfessorClassgradeService,
  ) {}

  @Post()
  create(@Body() data: CreateProfessorClassGradeDto) {
    return this.professorClassgradeService.createProfessorClassgrade(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProfessorClassgradeDto) {
    return this.professorClassgradeService.updateProfessorClassgrade(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.professorClassgradeService.deleteProfessorClassgrade(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.professorClassgradeService.findProfessorClassgradeById(id);
  }

  @Get()
  findAll() {
    return this.professorClassgradeService.findAllProfessorsClassgrades();
  }
}
