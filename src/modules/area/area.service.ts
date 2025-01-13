import { Injectable } from '@nestjs/common';
import {
  CreateAreaUseCase,
  DeleteAreaUseCase,
  FindAllAreasUseCase,
  FindAreaByIdUseCase,
  UpdateAreaUseCase,
} from './use-cases';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(
    private readonly createAreaUseCase: CreateAreaUseCase,
    private readonly findAllAreasUseCase: FindAllAreasUseCase,
    private readonly findAreaByIdUseCase: FindAreaByIdUseCase,
    private readonly deleteAreaUseCase: DeleteAreaUseCase,
    private readonly updateAreaUseCase: UpdateAreaUseCase,
  ) {}
  async createArea(createAreaDto: CreateAreaDto) {
    return await this.createAreaUseCase.execute(createAreaDto);
  }

  async findAllAreas() {
    return await this.findAllAreasUseCase.execute();
  }

  async findAreaById(id: string) {
    return await this.findAreaByIdUseCase.execute(id);
  }

  async updateArea(id: string, updateAreaDto: UpdateAreaDto) {
    return await this.updateAreaUseCase.execute(id, updateAreaDto);
  }

  async deleteArea(id: string) {
    return await this.deleteAreaUseCase.execute(id);
  }
}
