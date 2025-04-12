import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllInterestSelections } from '../repository/find-all-interest-selections.repository';

@Injectable()
export class FindAllInterestSelectionsUseCase {
  constructor(
    private readonly findAllInterestSelectionsRepository: FindAllInterestSelections,
    private readonly logger: Logger,
  ) {}

  async execute() {
    try {
      const interests =
        await this.findAllInterestSelectionsRepository.findAll();

      this.logger.log('Interests found', FindAllInterestSelectionsUseCase.name);

      return interests;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding interests selections',
      });
      this.logger.log(error.message, FindAllInterestSelectionsUseCase.name);
      throw err;
    }
  }
}
