import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateClassgradeDisciplneRepository } from '../repository/create-classgrade-discipline.repository';
import { CreateClassgradeDisciplineDto } from '../dto/create-classgrade-discipline.dto';
import { FindClassGradeByIdRepository } from 'src/modules/class-grade/repository/find-classgrade-by-id.repository';
import { FindDisciplineByIdRepository } from 'src/modules/discipline/repository/find-discipline-by-id.repository';
import { FindModalityByIdRepository } from 'src/modules/modality/repository/find-modality-by-id.repository';
import { FindPeriodByIdRepository } from 'src/modules/period/repository/find-period-by-id.repository';

@Injectable()
export class CreateClassgradeDisciplineUseCase {
  constructor(
    private readonly createClassgradeDisciplineRepository: CreateClassgradeDisciplneRepository,
    private readonly findModalityByIdRepository: FindModalityByIdRepository,
    private readonly findPeriodByIdRepository: FindPeriodByIdRepository,
    private readonly findClassgradeByIdRepository: FindClassGradeByIdRepository,
    private readonly findDisciplineByIdRepository: FindDisciplineByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateClassgradeDisciplineDto) {
    try {
      const disciplineExists =
        this.findDisciplineByIdRepository.FindDisciplineById(
          data.discipline_id,
        );
      const periodExists = this.findPeriodByIdRepository.findPeriodById(
        data.period_id,
      );
      const classGradeExists =
        this.findClassgradeByIdRepository.findClassGradeById(
          data.classGrade_id,
        );
      const modalityExists = this.findModalityByIdRepository.findModalityById(
        data.modality_id,
      );

      const disciplineAlocated =
        disciplineExists && periodExists && classGradeExists && modalityExists;

      const relationCanExists = disciplineExists && classGradeExists;

      if (!relationCanExists) {
        throw new NotFoundException('Discipline or classgrade not found');
      }

      if (disciplineAlocated) {
        throw new ConflictException(
          'Discipline already alocated in Classgrade',
        );
      }

      const classgradeDiscipline =
        await this.createClassgradeDisciplineRepository.createClassgradeDiscipline(
          data,
        );

      this.logger.log(
        'Discipline alocated in Classgrade',
        CreateClassgradeDisciplineUseCase.name,
      );
      return classgradeDiscipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error alocating discipline into classgrade',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
