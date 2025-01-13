import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteDisciplineRepository } from '../repository/delete-discipline.repository';
import { FindDisciplineByIdRepository } from '../repository/find-discipline-by-id.repository';

@Injectable()
export class DeleteDisciplineUseCase {
  constructor(
    private readonly deleteDisciplineRepository: DeleteDisciplineRepository,
    private readonly findDisciplineByIdRepository: FindDisciplineByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const disciplineExists =
        await this.findDisciplineByIdRepository.FindDisciplineById(id);
      if (!disciplineExists) {
        const error = new NotFoundException('Discipline not found');
        throw error;
      }
      const discipline =
        await this.deleteDisciplineRepository.deleteDiscipline(id);
      this.logger.log('Discipline deleted.', DeleteDisciplineUseCase.name);
      return discipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting discipline',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
