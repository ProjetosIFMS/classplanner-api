import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindClassgradeDisciplineByClassGradeIdRepository } from '../repository/find-classgrade-discipline-by-classgrade-id.repository';

@Injectable()
export class FindClassgradeDisciplineByClassgradeIdUseCase {
  constructor(
    private readonly findClassgradeDisciplineByClassgradeIdRepository: FindClassgradeDisciplineByClassGradeIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(classGrade_id: string) {
    try {
      const classgradeExists =
        await this.findClassgradeDisciplineByClassgradeIdRepository.FindByClassgrade(
          classGrade_id,
        );

      if (!classgradeExists) {
        const error = new NotFoundException('Classgrade not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log(
        'Classgrade alocated to discipline found',
        FindClassgradeDisciplineByClassGradeIdRepository.name,
      );
      return classgradeExists;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding discipline related to the classgrade',
      });
    }
  }
}
