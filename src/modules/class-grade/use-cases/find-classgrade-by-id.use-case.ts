import {
  Logger,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindClassGradeByIdRepository } from '../repository/find-classgrade-by-id.repository';
@Injectable()
export class FindClassGradeByIdUseCase {
  constructor(
    private readonly findClassGradeByIdRepository: FindClassGradeByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const classGradeExists =
        await this.findClassGradeByIdRepository.findClassGradeById(id);

      if (!classGradeExists) {
        throw new NotFoundException('Class grade not found');
      }
      this.logger.log('Class grade found', FindClassGradeByIdRepository.name);
      return classGradeExists;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding class grade',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
