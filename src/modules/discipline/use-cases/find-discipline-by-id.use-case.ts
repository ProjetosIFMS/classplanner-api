import { FindDisciplineByIdRepository } from '../repository/find-discipline-by-id.repository';
import { Logger, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindDisciplineByIdUseCase {
  constructor(
    private readonly findDisciplineByIdRepository: FindDisciplineByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const disciplineExists =
        await this.findDisciplineByIdRepository.FindDisciplineById(id);

      if (!disciplineExists) {
        const error = new NotFoundException('Discipline not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log('Discipline found', FindDisciplineByIdRepository.name);
      return disciplineExists;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Discipline not found');
    }
  }
}
