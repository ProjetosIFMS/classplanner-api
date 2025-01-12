import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindAllDisciplinesRepository } from '../repository/find-all-disciplines.repository';

@Injectable()
export class FindAllDisciplinesUseCase {
  constructor(
    private readonly findAllDisciplinesRepository: FindAllDisciplinesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      return await this.findAllDisciplinesRepository.findAllDisciplines();
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Disciplines not found.');
    }
  }
}
