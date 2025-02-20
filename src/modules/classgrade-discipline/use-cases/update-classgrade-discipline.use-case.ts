import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateClassgradeDisciplineRepository } from '../repository/update-classgrade-discipline.repository';
import { FindClassgradeDisciplineByIdRepository } from '../repository/find-classgrade-discipline-by-id.repository';
import { UpdateClassgradeDisciplineDto } from '../dto/update-classgrade-discipline.dto';

@Injectable()
export class UpdateClassgradeDisciplineUseCase {
  constructor(
    private readonly updateClassgradeDisciplineRepository: UpdateClassgradeDisciplineRepository,
    private readonly findClassgradeDisciplineByIdRepository: FindClassgradeDisciplineByIdRepository,
    private logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateClassgradeDisciplineDto) {
    try {
      const disciplineAlocated =
        await this.findClassgradeDisciplineByIdRepository.FindById(id);

      if (!disciplineAlocated) {
        const error = new NotFoundException(
          'Discipline not alocated in classgrade',
        );
        this.logger.error(error.message);
        throw error;
      }

      const classgradeDiscipline =
        await this.updateClassgradeDisciplineRepository.updateClassgradeDiscipline(
          id,
          data,
        );

      this.logger.log(
        'Discipline alocated in classgrade updated',
        UpdateClassgradeDisciplineUseCase.name,
      );
      return classgradeDiscipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating discipline in classgrade',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
