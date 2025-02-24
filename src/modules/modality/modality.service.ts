import { FindAllModalitiesUseCase } from './use-cases/find-all-modalities.use-case';
import { Injectable } from '@nestjs/common';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import {
  CreateModalityUseCase,
  DeleteModalityUseCase,
  FindModalityByIdUseCase,
  UpdateModalityUseCase,
} from './use-cases';

@Injectable()
export class ModalityService {
  constructor(
    private createModalityUseCase: CreateModalityUseCase,
    private updateModalityUseCase: UpdateModalityUseCase,
    private findModalityByIdUseCase: FindModalityByIdUseCase,
    private findAllModalitiesUseCase: FindAllModalitiesUseCase,
    private deleteModalityUseCase: DeleteModalityUseCase,
  ) {}
  async createModality(data: CreateModalityDto) {
    return await this.createModalityUseCase.execute(data);
  }

  async findAll() {
    return await this.findAllModalitiesUseCase.execute();
  }

  async findModalityById(id: string) {
    return await this.findModalityByIdUseCase.execute(id);
  }

  async updateModaliity(id: string, data: UpdateModalityDto) {
    return await this.updateModalityUseCase.execute(id, data);
  }

  async deleteModality(id: string) {
    return await this.deleteModalityUseCase.execute(id);
  }
}
