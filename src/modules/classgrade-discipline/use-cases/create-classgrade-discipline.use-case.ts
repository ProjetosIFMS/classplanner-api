import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateClassgradeDisciplneRepository } from '../repository/create-classgrade-discipline.repository';
import { FindClassgradeDisciplineByPeriodIdRepository } from '../repository/find-classgrade-discipline-by-period-id.repository';
import { CreateClassgradeDisciplineDto } from '../dto/create-classgrade-discipline.dto';
import { FindClassgradeDisciplineByClassGradeIdRepository } from '../repository/find-classgrade-discipline-by-classgrade-id.repository';

@Injectable()
export class CreateClassgradeDisciplineUseCase {
  constructor(
    private readonly createClassgradeDisciplineRepository: CreateClassgradeDisciplneRepository,
    private readonly findClassgradeDisciplineByPeriodIdRepository: FindClassgradeDisciplineByPeriodIdRepository,
    private readonly findClassgradeDisciplineByClassgradeIdRepository: FindClassgradeDisciplineByClassGradeIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateClassgradeDisciplineDto) {
    try {
      const disciplineAlocated =
        (await this.findClassgradeDisciplineByPeriodIdRepository.FindByPeriodId(
          data.period_id,
        )) &&
        (await this.findClassgradeDisciplineByClassgradeIdRepository.FindByClassgrade(
          data.classGrade_id,
        ));

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
      this.logger.error(err.mesage);
      throw new err();
    }
  }
}
