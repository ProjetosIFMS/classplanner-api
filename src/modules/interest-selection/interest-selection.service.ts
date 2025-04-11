import { Injectable } from '@nestjs/common';
import { CreateInterestSelectionDto } from './dto/create-interest-selection.dto';
import { UpdateInterestSelectionDto } from './dto/update-interest-selection.dto';
import {
  CreateInterestSelectionUseCase,
  FindAllInterestSelectionsUseCase,
  FindInterestSelectionByIdUseCase,
  FindInterestSelectionByProfessorIdUseCase,
  UpdateInterestSelectionUseCase,
} from './use-cases';

@Injectable()
export class InterestSelectionService {
  constructor(
    private readonly createInterestSelectionUseCase: CreateInterestSelectionUseCase,
    private readonly updateInterestSelectionUseCase: UpdateInterestSelectionUseCase,
    private readonly findAllInterestSelectionUseCase: FindAllInterestSelectionsUseCase,
    private readonly findInterestSelectionByIdUseCase: FindInterestSelectionByIdUseCase,
    private readonly findInterestSelecionByProfessorIdUseCase: FindInterestSelectionByProfessorIdUseCase,
  ) {}

  create(data: CreateInterestSelectionDto) {
    return this.createInterestSelectionUseCase.execute(data);
  }

  update(id: string, data: UpdateInterestSelectionDto) {
    return this.updateInterestSelectionUseCase.execute(id, data);
  }

  findAll() {
    return this.findAllInterestSelectionUseCase.execute();
  }

  findOne(id: string) {
    return this.findInterestSelectionByIdUseCase.execute(id);
  }

  findByProfessor(id: string) {
    return this.findInterestSelecionByProfessorIdUseCase.execute(id);
  }
}
