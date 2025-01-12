import { Injectable } from '@nestjs/common';
import { CreatePivotDto } from './dto/create-pivot.dto';
import { UpdatePivotDto } from './dto/update-pivot.dto';
import { CreatePivotUseCase } from './use-cases/create-pivot.use-case';
import { FindAllPivotsUseCase } from './use-cases/find-all-pivots.use-case';
import { FindPivotByIdUseCase } from './use-cases/find-pivot-by-id.use-case';
import { DeletePivotUseCase } from './use-cases';
import { UpdatePivotUseCase } from './use-cases/update-pivot.use-case';

@Injectable()
export class PivotService {
  constructor(
    private readonly createPivotUseCase: CreatePivotUseCase,
    private readonly findAllPivotsUseCase: FindAllPivotsUseCase,
    private readonly findPivotByIdUseCase: FindPivotByIdUseCase,
    private readonly deletePivotUseCase: DeletePivotUseCase,
    private readonly updatePivotUseCase: UpdatePivotUseCase,
  ) {}
  async createPivot(createPivotDto: CreatePivotDto) {
    return await this.createPivotUseCase.execute(createPivotDto);
  }

  async findAllPivots() {
    return await this.findAllPivotsUseCase.execute();
  }

  async findPivotById(id: string) {
    return await this.findPivotByIdUseCase.execute(id);
  }

  async updatePivot(id: string, updatePivotDto: UpdatePivotDto) {
    return await this.updatePivotUseCase.execute(id, updatePivotDto);
  }

  async deletePivot(id: string) {
    return await this.deletePivotUseCase.execute(id);
  }
}
