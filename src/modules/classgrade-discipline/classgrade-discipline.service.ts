import { Injectable } from '@nestjs/common';
import {
  CreateClassgradeDisciplineUseCase,
  DeleteClassgradeDisciplineUseCase,
  FindAllClassgradeDisciplinesUseCase,
  FindClassgradeDisciplineByClassgradeIdUseCase,
  FindClassgradeDisciplineByIdUseCase,
  FindClassgradeDisciplineByPeriodIdUseCase,
  UpdateClassgradeDisciplineUseCase,
} from './use-cases';
import { CreateClassgradeDisciplineDto } from './dto/create-classgrade-discipline.dto';
import { UpdateClassgradeDisciplineDto } from './dto/update-classgrade-discipline.dto';

@Injectable()
export class ClassgradeDisciplineService {
  constructor(
    private readonly createClassgradeDisciplineUseCase: CreateClassgradeDisciplineUseCase,
    private readonly deleteClassgradeDisciplineUseCase: DeleteClassgradeDisciplineUseCase,
    private readonly updateClassgradeDisciplineUseCase: UpdateClassgradeDisciplineUseCase,
    private readonly findAllClassgradeDisciplinesUseCase: FindAllClassgradeDisciplinesUseCase,
    private readonly findClassgradeDisciplineByIdUseCase: FindClassgradeDisciplineByIdUseCase,
    private readonly findClassgradeDisciplineByClassgradeIdUseCase: FindClassgradeDisciplineByClassgradeIdUseCase,
    private readonly findClassgradeDisciplineByPeriodIdUseCase: FindClassgradeDisciplineByPeriodIdUseCase,
  ) {}

  async createClassgradeDiscipline(data: CreateClassgradeDisciplineDto) {
    return await this.createClassgradeDisciplineUseCase.execute(data);
  }

  async deleteClassGradeDiscipline(id: string) {
    return await this.deleteClassgradeDisciplineUseCase.execute(id);
  }

  async updateClassgradeDiscipline(
    id: string,
    data: UpdateClassgradeDisciplineDto,
  ) {
    return await this.updateClassgradeDisciplineUseCase.execute(id, data);
  }

  async findAllClassgradeDisciplines() {
    return await this.findAllClassgradeDisciplinesUseCase.execute();
  }

  async findClassgradeDisciplineById(id: string) {
    return await this.findClassgradeDisciplineByIdUseCase.execute(id);
  }

  async findClassgradeDisciplineByClassgradeId(classgrade_id: string) {
    return await this.findClassgradeDisciplineByClassgradeIdUseCase.execute(
      classgrade_id,
    );
  }

  async findClassgradeDisciplineByPeriodId(period_id: string) {
    return await this.findClassgradeDisciplineByPeriodIdUseCase.execute(
      period_id,
    );
  }
}
