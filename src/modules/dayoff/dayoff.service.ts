import { Injectable } from '@nestjs/common';
import { CreateDayoffDto } from './dto/create-dayoff.dto';
import { UpdateDayoffDto } from './dto/update-dayoff.dto';
import {
  CreateDayoffUseCase,
  DeleteDayoffUseCase,
  FindAllDayoffsUseCase,
  FindDayoffByIdUseCase,
  UpdateDayoffUseCase,
} from 'src/modules/dayoff/use-cases';

@Injectable()
export class DayoffService {
  constructor(
    private readonly createDayoffUseCase: CreateDayoffUseCase,
    private readonly deleteDayoffUseCase: DeleteDayoffUseCase,
    private readonly findAllDayoffsUseCase: FindAllDayoffsUseCase,
    private readonly findDayoffByIdUseCase: FindDayoffByIdUseCase,
    private readonly updateDayoffUseCase: UpdateDayoffUseCase,
  ) {}

  async createDayoff(createDayoffDto: CreateDayoffDto) {
    return await this.createDayoffUseCase.execute(createDayoffDto);
  }

  async findAllDayoffs() {
    return await this.findAllDayoffsUseCase.execute();
  }

  async findDayoffById(id: string) {
    return await this.findDayoffByIdUseCase.execute(id);
  }

  async updateDayoff(id: string, updateDayoffDto: UpdateDayoffDto) {
    return await this.updateDayoffUseCase.execute(id, updateDayoffDto);
  }

  async deleteDayoff(id: string) {
    return await this.deleteDayoffUseCase.execute(id);
  }
}
