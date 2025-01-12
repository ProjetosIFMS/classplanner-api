import { Injectable } from '@nestjs/common';
import {
  CreateDisciplineUseCase,
  DeleteDisciplineUseCase,
  FindAllDisciplinesUseCase,
  FindDisciplineByIdUseCase,
  FindDisciplinesByNameUseCase,
  UpdateDisciplineUseCase,
} from './use-cases';
import { Prisma } from '@prisma/client';

@Injectable()
export class DisciplineService {
  constructor(
    private readonly createDisciplineUseCase: CreateDisciplineUseCase,
    private readonly deleteDisciplineUseCase: DeleteDisciplineUseCase,
    private readonly findAllDisciplinesUseCase: FindAllDisciplinesUseCase,
    private readonly findDiscisciplineByIdUseCase: FindDisciplineByIdUseCase,
    private readonly findDisciplineByNameUseCase: FindDisciplinesByNameUseCase,
    private readonly updateDisciplineUseCase: UpdateDisciplineUseCase,
  ) {}

  async createDiscipline(data: Prisma.DisciplineCreateInput) {
    return await this.createDisciplineUseCase.execute(data);
  }

  async findAll() {
    return await this.findAllDisciplinesUseCase.execute();
  }

  async findDisciplineById(id: string) {
    return await this.findDiscisciplineByIdUseCase.execute(id);
  }

  async findDisciplineByName(name: string) {
    return await this.findDisciplineByNameUseCase.execute(name);
  }

  async updateDiscipline(id: string, data: Prisma.DisciplineUpdateInput) {
    return await this.updateDisciplineUseCase.execute(id, data);
  }

  async deleteDiscipline(id: string) {
    return await this.deleteDisciplineUseCase.execute(id);
  }
}
