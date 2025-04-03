import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateClassGradeRepository } from '../repository/update-classgrade.repository';
import { FindClassGradeByIdRepository } from '../repository/find-classgrade-by-id.repository';
import { UpdateClassGradeDto } from '../dto/update-classgrade.dto';
@Injectable()
export class UpdateClassGradeUseCase {
  constructor(
    private readonly updateClassGradeRepository: UpdateClassGradeRepository,
    private readonly findClassGradeByIdRepository: FindClassGradeByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateClassGradeDto) {
    try {
      const classGradeExists =
        await this.findClassGradeByIdRepository.findClassGradeById(id);
      if (!classGradeExists) {
        const error = new NotFoundException('Class Grade not found');
        this.logger.error(error.message);
        throw error;
      }
      const classGrade = await this.updateClassGradeRepository.updateClassGrade(
        id,
        data,
      );

      this.logger.log('Class grade updated', UpdateClassGradeUseCase.name);
      return classGrade;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating class grade',
      });
      this.logger.error(err.message, UpdateClassGradeUseCase.name);
      throw err;
    }
  }
}
