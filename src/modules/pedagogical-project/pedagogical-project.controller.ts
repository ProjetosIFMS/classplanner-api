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
import { PedagogicalProjectService } from './pedagogical-project.service';
import { CreatePedagogicalProjectDto } from './dto/create-pedagogical-project.dto';
import { UpdatePedagogicalProjectDto } from './dto/update-pedagogical-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../user/dto/Role';

@ApiTags('Pedagogical Project')
@Controller('pedagogical-project')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR)
export class PedagogicalProjectController {
  constructor(
    private readonly pedagogicalProjectService: PedagogicalProjectService,
  ) {}

  @Post()
  CreatePedagogicalProject(
    @Body() createPedagogicalProjectDto: CreatePedagogicalProjectDto,
  ) {
    return this.pedagogicalProjectService.createPedagogicalProject(
      createPedagogicalProjectDto,
    );
  }

  @Get()
  @Roles(Role.PROFESSOR)
  async findAllPedagogicalProjects() {
    return this.pedagogicalProjectService.findAllPedagogicalProjects();
  }

  @Get(':id')
  findPedagogicalProjectById(@Param('id') id: string) {
    return this.pedagogicalProjectService.findPedagogicalProjectById(id);
  }

  @Patch(':id')
  updatePedagogicalProject(
    @Param('id') id: string,
    @Body() updatePedagogicalProjectDto: UpdatePedagogicalProjectDto,
  ) {
    return this.pedagogicalProjectService.updatePedagogicalProject(
      id,
      updatePedagogicalProjectDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedagogicalProjectService.deletePedagogicalProject(id);
  }
}
