import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateProfessorClassGradeDto } from '../dto/create-professor-classgrade.dto';
import { CreateProfessorClassGradeRepository } from '../repository/create-professor-classgrade.repository';

@Injectable()
export class CreateProfessorClassgradeUseCase {
  constructor(
    private readonly createProfessorClassgradeRepository: CreateProfessorClassGradeRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateProfessorClassGradeDto) {
    try {
      const professorClassgrade =
        this.createProfessorClassgradeRepository.createProfessorClassGrade(
          data,
        );
      this.logger.log(
        'Professor alocated to classgrade',
        CreateProfessorClassgradeUseCase.name,
      );
      return professorClassgrade;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error alocating professor to classgrade',
      });
      this.logger.error(err.message);
      throw new err();
    }
  }
}
