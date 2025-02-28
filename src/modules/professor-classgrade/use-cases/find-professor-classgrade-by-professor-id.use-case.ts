import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindProfessorClassgradeByProfessorIdRepository } from '../repository/find-professor-classgrade-by-professor-id.repository';

@Injectable()
export class FindProfessorClassgradeByProfessorIdUseCase {
  constructor(
    private readonly findProfessorClassgradeByProfessorIdRepository: FindProfessorClassgradeByProfessorIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(user_id: string) {
    try {
      const professorExists =
        this.findProfessorClassgradeByProfessorIdRepository.findByProfessorId(
          user_id,
        );

      if (!professorExists) {
        new NotFoundException('Professor related to classgrade(s) not found');
      }
      this.logger.log(
        'Professor related to classgrade(s) found',
        FindProfessorClassgradeByProfessorIdUseCase.name,
      );

      return professorExists;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding professor related to classgrade(s)',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
