import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateDisciplineRepository } from '../repository/update-discipline.repository';
import { FindDisciplineByIdRepository } from '../repository/find-discipline-by-id.repository';
import { UpdateDisciplineInput } from '../inputs/update-discipline.input';

@Injectable()
export class UpdateDisciplineUseCase {
  constructor(
    private readonly updateDisciplineRepository: UpdateDisciplineRepository,
    private readonly findDisciplineByIdRepository: FindDisciplineByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateDisciplineInput) {
    try {
      const disciplineExists =
        await this.findDisciplineByIdRepository.FindDisciplineById(id);
      if (!disciplineExists) {
        const error = new NotFoundException('Discipline not found');
        this.logger.error(error.message);
        throw error;
      }
      const discipline = await this.updateDisciplineRepository.updateDiscipline(
        id,
        data,
      );

      this.logger.log('Discipline updated', UpdateDisciplineUseCase.name);
      return discipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating discipline',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
