import {
  Injectable,
  ServiceUnavailableException,
  Logger,
} from '@nestjs/common';
import { CreateDisciplineRepository } from '../repository/create-discipline.repository';
import { FindDisciplineByNameRepository } from '../repository/find-discipline-by-name.repository';
import { Prisma } from '@prisma/client';
import { CreateUserUseCase } from 'src/modules/user/use-cases';

@Injectable()
export class CreateDisciplineUseCase {
  constructor(
    private readonly createDisciplineRepository: CreateDisciplineRepository,
    private readonly findDisciplineByNameRepository: FindDisciplineByNameRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: Prisma.DisciplineCreateInput) {
    try {
      const disciplineExists =
        await this.findDisciplineByNameRepository.findDisciplineByName(
          data.name,
        );
      if (disciplineExists) {
        throw new Error('Discipline already exists');
      }

      const discipline =
        await this.createDisciplineRepository.createDiscipline(data);
      this.logger.log('Discipline created', CreateUserUseCase.name);
      return discipline;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating discipline',
      });
      throw error;
    }
  }
}
