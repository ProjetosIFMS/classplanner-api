import { Injectable } from '@nestjs/common';
import {
  CreateDisciplineUseCase,
  DeleteDisciplineUseCase,
  FindAllDisciplinesUseCase,
  FindDisciplineByIdUseCase,
  FindDisciplinesByCourseIdUseCase,
  FindDisciplinesByNameUseCase,
  UpdateDisciplineUseCase,
} from './use-cases';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Injectable()
export class DisciplineService {
  constructor(
    private readonly createDisciplineUseCase: CreateDisciplineUseCase,
    private readonly deleteDisciplineUseCase: DeleteDisciplineUseCase,
    private readonly findAllDisciplinesUseCase: FindAllDisciplinesUseCase,
    private readonly findDisciplineByIdUseCase: FindDisciplineByIdUseCase,
    private readonly findDisciplineByNameUseCase: FindDisciplinesByNameUseCase,
    private readonly updateDisciplineUseCase: UpdateDisciplineUseCase,
    private readonly findDisciplinesByCourseIdUseCase: FindDisciplinesByCourseIdUseCase,
  ) {}

  async createDiscipline(data: CreateDisciplineDto) {
    return await this.createDisciplineUseCase.execute(data);
  }

  async findAll(includeModalities: boolean) {
    return await this.findAllDisciplinesUseCase.execute(includeModalities);
  }

  async findDisciplineById(id: string, includeModalities: boolean) {
    return await this.findDisciplineByIdUseCase.execute(id, includeModalities);
  }

  async findDisciplineByName(name: string, includeModalities: boolean) {
    return await this.findDisciplineByNameUseCase.execute(
      name,
      includeModalities,
    );
  }

  async findDisciplinesByCourseId(
    course_id: string,
    includeModalities: boolean,
  ) {
    return await this.findDisciplinesByCourseIdUseCase.execute(
      course_id,
      includeModalities,
    );
  }

  async updateDiscipline(id: string, data: UpdateDisciplineDto) {
    return await this.updateDisciplineUseCase.execute(id, data);
  }

  async deleteDiscipline(id: string) {
    return await this.deleteDisciplineUseCase.execute(id);
  }
}
