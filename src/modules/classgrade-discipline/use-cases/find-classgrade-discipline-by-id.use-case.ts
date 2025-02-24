import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindClassgradeDisciplineByIdRepository } from '../repository/find-classgrade-discipline-by-id.repository';

@Injectable()
export class FindClassgradeDisciplineByIdUseCase {
  constructor(
    private readonly findClassgradeDisciplineByIdRepository: FindClassgradeDisciplineByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const disciplineAlocated =
        await this.findClassgradeDisciplineByIdRepository.FindById(id);

      if (!disciplineAlocated) {
        const error = new NotFoundException(
          "Discipline isn't alocated in classgrade",
        );
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log(
        'Discipline found',
        FindClassgradeDisciplineByIdRepository.name,
      );
      return disciplineAlocated;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding discipline',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
