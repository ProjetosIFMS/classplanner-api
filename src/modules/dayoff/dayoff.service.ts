import { Injectable } from '@nestjs/common';
import { CreateDayoffDto } from './dto/create-dayoff.dto';
import { UpdateDayoffDto } from './dto/update-dayoff.dto';
import {
  CreateDayoffUseCase,
  DeleteDayoffUseCase,
  DeleteMyDayoffUseCase,
  FindAllDayoffsUseCase,
  FindDayoffByIdUseCase,
  UpdateDayoffUseCase,
  ApproveDayoffUseCase,
  RejectDayoffUseCase,
} from 'src/modules/dayoff/use-cases';
import { DAYOFF_STATUS } from 'src/modules/dayoff/dto/dayoff-status';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';
import { FindDayoffByUserIdUseCase } from 'src/modules/dayoff/use-cases/find-dayoff-by-user-id.use-case';

@Injectable()
export class DayoffService {
  constructor(
    private readonly createDayoffUseCase: CreateDayoffUseCase,
    private readonly deleteDayoffUseCase: DeleteDayoffUseCase,
    private readonly deleteMyDayoffUseCase: DeleteMyDayoffUseCase,
    private readonly findAllDayoffsUseCase: FindAllDayoffsUseCase,
    private readonly findDayoffByIdUseCase: FindDayoffByIdUseCase,
    private readonly findDayoffByUserIdUseCase: FindDayoffByUserIdUseCase,
    private readonly updateDayoffUseCase: UpdateDayoffUseCase,
    private readonly approveDayoffUseCase: ApproveDayoffUseCase,
    private readonly rejectDayoffUseCase: RejectDayoffUseCase,
  ) {}

  async createDayoff(user_id: string, createDayoffDto: CreateDayoffDto) {
    return await this.createDayoffUseCase.execute(user_id, createDayoffDto);
  }

  async findAllDayoffs(status: DAYOFF_STATUS | '', weekday: WEEKDAY | '') {
    return await this.findAllDayoffsUseCase.execute(status, weekday);
  }

  async findDayoffById(id: string) {
    return await this.findDayoffByIdUseCase.execute(id);
  }

  async findDayoffByUserId(user_id: string) {
    return await this.findDayoffByUserIdUseCase.execute(user_id);
  }

  async updateDayoff(id: string, updateDayoffDto: UpdateDayoffDto) {
    return await this.updateDayoffUseCase.execute(id, updateDayoffDto);
  }

  async approveDayoff(id: string) {
    return await this.approveDayoffUseCase.execute(id);
  }

  async rejectDayoff(id: string) {
    return await this.rejectDayoffUseCase.execute(id);
  }

  async DeleteMyDayoff(user_id: string) {
    return await this.deleteMyDayoffUseCase.execute(user_id);
  }

  async deleteDayoff(id: string) {
    return await this.deleteDayoffUseCase.execute(id);
  }
}
