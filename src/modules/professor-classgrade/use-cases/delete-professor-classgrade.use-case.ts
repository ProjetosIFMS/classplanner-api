import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindProfessorClassgradeByIdRepository } from '../repository/find-professor-classgrade-by-id.repository';
import { DeleteProfessorClassgradeRepository } from '../repository/delete-professor-classgrade.repository';

@Injectable()
export class DeleteProfessorClassgradeUseCase {
  constructor(
    private readonly findProfessorClassgradeByIdRepository: FindProfessorClassgradeByIdRepository,
    private readonly deleteProfessorClassgradeRepository: DeleteProfessorClassgradeRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const relationExists =
        this.findProfessorClassgradeByIdRepository.findById(id);
      if (!relationExists) {
        throw new NotFoundException(
          'Professor related to classgrade not found',
          DeleteProfessorClassgradeUseCase.name,
        );
      }
      const deletedProfessor =
        this.deleteProfessorClassgradeRepository.deleteProfessorClassgrade(id);
      this.logger.log(
        'Relation of professor with classgrade deleted',
        DeleteProfessorClassgradeUseCase.name,
      );
      return deletedProfessor;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting relation of professor with classgrade',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
