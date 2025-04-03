import { Injectable } from '@nestjs/common';
import { CreateClassGradeDto } from './dto/create-classgrade.dto';
import { UpdateClassGradeDto } from './dto/update-classgrade.dto';
import {
  CreateClassGradeUseCase,
  DeleteClassGradeUseCase,
  FindAllClassGradeUseCase,
  FindClassGradeByIdUseCase,
  UpdateClassGradeUseCase,
} from './use-cases';

@Injectable()
export class ClassgradeService {
  constructor(
    private createClassGradeUseCase: CreateClassGradeUseCase,
    private updateClassGradeUseCase: UpdateClassGradeUseCase,
    private findClassGradeByIdUseCase: FindClassGradeByIdUseCase,
    private findAllClassGradesUseCase: FindAllClassGradeUseCase,
    private deleteClassGradeUseCase: DeleteClassGradeUseCase,
  ) {}
  async createClassGrade(data: CreateClassGradeDto) {
    return await this.createClassGradeUseCase.execute(data);
  }

  async findAllClassGrade(includeDisciplines: boolean) {
    return await this.findAllClassGradesUseCase.execute(includeDisciplines); //;
  }

  async findClassGradeById(id: string) {
    return await this.findClassGradeByIdUseCase.execute(id);
  }

  async updateClassGrade(id: string, data: UpdateClassGradeDto) {
    return await this.updateClassGradeUseCase.execute(id, data);
  }
  async deleteClassGrade(id: string) {
    return await this.deleteClassGradeUseCase.execute(id);
  }
}
