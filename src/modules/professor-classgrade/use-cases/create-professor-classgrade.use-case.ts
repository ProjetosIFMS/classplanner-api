import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateProfessorClassGradeDto } from '../dto/create-professor-classgrade.dto';
import { CreateProfessorClassGradeRepository } from '../repository/create-professor-classgrade.repository';
import { FindClassGradeByIdRepository } from 'src/modules/class-grade/repository/find-classgrade-by-id.repository';
import { FindUserByIdRepository } from 'src/modules/user/repository/find-user-by-id.repository';

@Injectable()
export class CreateProfessorClassgradeUseCase {
  constructor(
    private readonly createProfessorClassgradeRepository: CreateProfessorClassGradeRepository,
    private readonly findClassgradeByIdRepository: FindClassGradeByIdRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateProfessorClassGradeDto) {
    try {
      const userExists = await this.findUserByIdRepository.findUserById(
        data.user_id,
      );
      const classGradeExists =
        await this.findClassgradeByIdRepository.findClassGradeById(
          data.classGrade_id,
        );

      if (!userExists || !classGradeExists) {
        throw new NotFoundException(
          'Professor or classgrade not found.',
          CreateProfessorClassgradeUseCase.name,
        );
      }

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
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error alocating professor to classgrade',
      });
      this.logger.error(err.message, CreateProfessorClassgradeUseCase.name);
      throw error;
    }
  }
}
