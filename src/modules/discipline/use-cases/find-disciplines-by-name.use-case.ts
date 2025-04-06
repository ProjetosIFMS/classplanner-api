import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindDisciplineByNameRepository } from '../repository/find-discipline-by-name.repository';

@Injectable()
export class FindDisciplinesByNameUseCase {
  constructor(
    private readonly findDisciplineByNameRepository: FindDisciplineByNameRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(name: string, includeModalities: boolean) {
    try {
      const disciplinesExists =
        await this.findDisciplineByNameRepository.findDisciplineByName(
          name,
          includeModalities,
        );

      if (!disciplinesExists) {
        const error = new NotFoundException('Discipline not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log('Discipline found ', FindDisciplineByNameRepository.name);
      return disciplinesExists;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Disciplines not found');
    }
  }
}
