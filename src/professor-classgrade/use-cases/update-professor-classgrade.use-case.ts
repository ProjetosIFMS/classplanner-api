import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindProfessorClassgradeByIdRepository } from '../repository/find-professor-classgrade-by-id.repository';
import { UpdateProfessorClassgradeRepository } from '../repository/update-professor-classgrade.repository';
import { UpdateProfessorClassgradeDto } from '../dto/update-professor-classgrade.dto';

@Injectable()
export class UpdateProfessorClassgradeUseCase {
  constructor(
    private readonly findProfessorClassgradeByIdRepository: FindProfessorClassgradeByIdRepository,
    private readonly updateProfessorClassgradeRepository: UpdateProfessorClassgradeRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateProfessorClassgradeDto) {
    try {
      const professorClassgradeExists =
        this.findProfessorClassgradeByIdRepository.findById(id);
      if (!professorClassgradeExists) {
        throw new NotFoundException(
          'Professor related to classgrade not found',
        );
      }

      const professorClassgrade =
        this.updateProfessorClassgradeRepository.updateProfessorClassgrade(
          id,
          data,
        );
      this.logger.log(
        'Relation of professor with classgrade updated',
        UpdateProfessorClassgradeUseCase.name,
      );

      return professorClassgrade;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating relation of professor with classgrade',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
