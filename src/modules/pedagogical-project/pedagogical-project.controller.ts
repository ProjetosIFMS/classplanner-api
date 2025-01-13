import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedagogicalProjectService } from './pedagogical-project.service';
import { CreatePedagogicalProjectDto } from './dto/create-pedagogical-project.dto';
import { UpdatePedagogicalProjectDto } from './dto/update-pedagogical-project.dto';

@Controller('pedagogical-project')
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
  findAllPedagogicalProjects() {
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
