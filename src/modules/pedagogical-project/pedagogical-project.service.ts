import { Injectable } from '@nestjs/common';
import {
  CreatePedagogicalProjectUseCase,
  DeletePedagogicalProjectUseCase,
  FindAllPedagogicalProjectsUseCase,
  FindPedagogicalProjectByIdUseCase,
  FindPedagogicalProjectsByCourseIdUseCase,
  UpdatePedagogicalProjectUseCase,
} from './use-cases';
import { CreatePedagogicalProjectDto } from './dto/create-pedagogical-project.dto';
import { UpdatePedagogicalProjectDto } from './dto/update-pedagogical-project.dto';

@Injectable()
export class PedagogicalProjectService {
  constructor(
    private readonly createPedagogicalProjectUseCase: CreatePedagogicalProjectUseCase,
    private readonly findAllPedagogicalProjectsUseCase: FindAllPedagogicalProjectsUseCase,
    private readonly findPedagogicalProjectByIdUseCase: FindPedagogicalProjectByIdUseCase,
    private readonly findPedagogicalProjectsByCourseIdUseCase: FindPedagogicalProjectsByCourseIdUseCase,
    private readonly updatePedagogicalProjectUseCase: UpdatePedagogicalProjectUseCase,
    private readonly deletePedagogicalProjectUseCase: DeletePedagogicalProjectUseCase,
  ) {}
  async createPedagogicalProject(
    createPedagogicalProjectDto: CreatePedagogicalProjectDto,
  ) {
    return await this.createPedagogicalProjectUseCase.execute(
      createPedagogicalProjectDto,
    );
  }

  async findAllPedagogicalProjects() {
    return await this.findAllPedagogicalProjectsUseCase.execute();
  }

  async findPedagogicalProjectById(id: string) {
    return await this.findPedagogicalProjectByIdUseCase.execute(id);
  }

  async updatePedagogicalProject(
    id: string,
    updatePedagogicalProjectDTO: UpdatePedagogicalProjectDto,
  ) {
    return await this.updatePedagogicalProjectUseCase.execute(
      id,
      updatePedagogicalProjectDTO,
    );
  }

  async deletePedagogicalProject(id: string) {
    return await this.deletePedagogicalProjectUseCase.execute(id);
  }

  async findPedagogicalProjectsByCourseId(course_id: string) {
    return await this.findPedagogicalProjectsByCourseIdUseCase.execute(
      course_id,
    );
  }
}
