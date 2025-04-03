import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteClassGradeRepository } from '../repository/delete-classgrade.repository';
import { FindClassGradeByIdRepository } from '../repository/find-classgrade-by-id.repository';

@Injectable()
export class DeleteClassGradeUseCase {
  constructor(
    private readonly deleteClassGradeRepository: DeleteClassGradeRepository,
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
      await this.deleteClassGradeRepository.deleteClassGrade(id);
      this.logger.log('Class Grade deleted', DeleteClassGradeUseCase.name);
      return true;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting class grade',
      });
      this.logger.error(err.message, DeleteClassGradeUseCase.name);
      throw err;
    }
  }
}
