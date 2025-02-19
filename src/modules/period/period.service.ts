import { UpdatePeriodUseCase } from './use-cases/update-period.use-case';
import { DeletePeriodUseCase } from './use-cases/delete-period.use-case';
import { Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { CreatePeriodUseCase } from './use-cases/create-period.use-case';
import { FindAllPeriodsUseCase, FindPeriodByIdUseCase } from './use-cases';
import { UpdatePeriodDto } from './dto/update-period.dto';

@Injectable()
export class PeriodService {
  constructor(
    private readonly createPeriodUseCase: CreatePeriodUseCase,
    private readonly findAllPeriodsUseCase: FindAllPeriodsUseCase,
    private readonly findPeriodByIdUseCase: FindPeriodByIdUseCase,
    private readonly deletePeriodUseCase: DeletePeriodUseCase,
    private readonly updatePeriodUseCase: UpdatePeriodUseCase,
  ) {}

  async createPeriod(data: CreatePeriodDto) {
    return await this.createPeriodUseCase.execute(data);
  }

  async findAllPeriods() {
    return await this.findAllPeriodsUseCase.execute();
  }

  async findPeriodById(id: string) {
    return await this.findPeriodByIdUseCase.execute(id);
  }

  async updatePeriod(id: string, data: UpdatePeriodDto) {
    return await this.updatePeriodUseCase.execute(id, data);
  }

  async deletePeriod(id: string) {
    return await this.deletePeriodUseCase.execute(id);
  }
}
