import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateClassGradeRepository } from '../repository/create-classgrade.reporitory';
import { CreateClassGradeDto } from '../dto/create-classgrade.dto';

@Injectable()
export class CreateClassGradeUseCase {
  constructor(
    private readonly createClassGradeRepository: CreateClassGradeRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateClassGradeDto) {
    try {
      const classGrade =
        await this.createClassGradeRepository.createClassGrade(data);
      this.logger.log('Class grade created', CreateClassGradeUseCase.name);
      return classGrade;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating class grade',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
