import { Injectable } from '@nestjs/common';
import { CreateProfessorClassGradeDto } from './dto/create-professor-classgrade.dto';
import {
  CreateProfessorClassgradeUseCase,
  DeleteProfessorClassgradeUseCase,
  FindAllProfessorClassgradesUseCase,
  FindProfessorClassgradeByClassgradeIdUseCase,
  FindProfessorClassgradeByIdUseCase,
  FindProfessorClassgradeByProfessorIdUseCase,
  UpdateProfessorClassgradeUseCase,
} from './use-cases';
import { UpdateProfessorClassgradeDto } from './dto/update-professor-classgrade.dto';

@Injectable()
export class ProfessorClassgradeService {
  constructor(
    private readonly createProfessorClassgradeUseCase: CreateProfessorClassgradeUseCase,
    private readonly updateProfessorClassgradeUseCase: UpdateProfessorClassgradeUseCase,
    private readonly deleteProfessorClassgradeUseCase: DeleteProfessorClassgradeUseCase,
    private readonly findAllProfessorsClassgradesUseCase: FindAllProfessorClassgradesUseCase,
    private readonly findProfessorClassgradeByIdUseCase: FindProfessorClassgradeByIdUseCase,
    private readonly findProfessorClassgradeByProfessorIdUseCase: FindProfessorClassgradeByProfessorIdUseCase,
    private readonly findProfessorClassgradeByClassgradeIdUseCase: FindProfessorClassgradeByClassgradeIdUseCase,
  ) {}

  async createProfessorClassgrade(data: CreateProfessorClassGradeDto) {
    return await this.createProfessorClassgradeUseCase.execute(data);
  }

  async updateProfessorClassgrade(
    id: string,
    data: UpdateProfessorClassgradeDto,
  ) {
    return await this.updateProfessorClassgradeUseCase.execute(id, data);
  }

  async deleteProfessorClassgrade(id: string) {
    return await this.deleteProfessorClassgradeUseCase.execute(id);
  }

  async findAllProfessorsClassgrades() {
    return await this.findAllProfessorsClassgradesUseCase.execute();
  }

  async findProfessorClassgradeById(id: string) {
    return await this.findProfessorClassgradeByIdUseCase.execute(id);
  }

  async findProfessorClassgradeByClassgradeId(classgrade_id: string) {
    return await this.findProfessorClassgradeByClassgradeIdUseCase.execute(
      classgrade_id,
    );
  }

  async findProfessorClassgradeByProfessorId(user_id: string) {
    return await this.findProfessorClassgradeByProfessorIdUseCase.execute(
      user_id,
    );
  }
}
