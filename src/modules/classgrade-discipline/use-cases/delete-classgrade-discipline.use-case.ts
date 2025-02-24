import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindClassgradeDisciplineByIdRepository } from '../repository/find-classgrade-discipline-by-id.repository';
import { DeleteClassgradeDisciplineRepository } from '../repository/delete-classgrade-discipline.repository';

@Injectable()
export class DeleteClassgradeDisciplineUseCase {
  constructor(
    private readonly findClassgradeDisciplineByIdRepository: FindClassgradeDisciplineByIdRepository,
    private readonly deleteClassgradeDisciplineRepository: DeleteClassgradeDisciplineRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const classgradeDisciplineExists =
        this.findClassgradeDisciplineByIdRepository.FindById(id);

      if (!classgradeDisciplineExists) {
        const error = new NotFoundException('ClassgradeDiscipline not found');
        this.logger.error(error.message);
        throw error;
      }

      const classgradeDiscipline =
        await this.deleteClassgradeDisciplineRepository.DeleteClassgradeDiscipline(
          id,
        );
      this.logger.log('Related discipline to classgrade deleted');
      return classgradeDiscipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting discipline related to classgrade',
      });
    }
  }
}
