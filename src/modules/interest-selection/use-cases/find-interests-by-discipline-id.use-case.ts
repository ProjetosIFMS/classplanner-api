import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindInterestsByDisciplineIdRepository } from '../repository/find-interests-by-discipline-id.repository';

@Injectable()
export class FindInterestsByDisciplineIdUseCase {
  constructor(
    private readonly findInterestsByDisciplineIdRepository: FindInterestsByDisciplineIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(discipline_id: string) {
    try {
      const interests =
        await this.findInterestsByDisciplineIdRepository.findInterests(
          discipline_id,
        );

      this.logger.log(
        'Interest found',
        FindInterestsByDisciplineIdUseCase.name,
      );

      return interests;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding interests selection',
      });
      this.logger.log(error.message, FindInterestsByDisciplineIdUseCase.name);
      throw err;
    }
  }
}
