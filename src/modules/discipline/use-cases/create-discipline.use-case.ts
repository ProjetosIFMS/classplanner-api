import {
  Injectable,
  ServiceUnavailableException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { CreateDisciplineRepository } from '../repository/create-discipline.repository';
import { FindDisciplineByNameRepository } from '../repository/find-discipline-by-name.repository';
import { CreateDisciplineInput } from '../inputs/create-discipline.input';

@Injectable()
export class CreateDisciplineUseCase {
  constructor(
    private readonly createDisciplineRepository: CreateDisciplineRepository,
    private readonly findDisciplineByNameRepository: FindDisciplineByNameRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateDisciplineInput) {
    try {
      const disciplineExists =
        await this.findDisciplineByNameRepository.findDisciplineByName(
          data.name,
        );
      if (disciplineExists) {
        throw new ConflictException('Discipline already exists');
      }

      const discipline =
        await this.createDisciplineRepository.createDiscipline(data);
      this.logger.log('Discipline created', CreateDisciplineUseCase.name);
      return discipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating discipline',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
