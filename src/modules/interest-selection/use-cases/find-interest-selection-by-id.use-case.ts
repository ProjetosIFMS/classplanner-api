import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindInterestSelectionByIdRepository } from '../repository';

@Injectable()
export class FindInterestSelectionByIdUseCase {
  constructor(
    private readonly findInterestSelectionByIdRepository: FindInterestSelectionByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    try {
      const interest =
        await this.findInterestSelectionByIdRepository.findInterest(id);

      if (!interest) {
        this.logger.error(
          'Interest selection not found',
          FindInterestSelectionByIdUseCase.name,
        );
        throw new NotFoundException('Interest selection found');
      }
      this.logger.log('Interest found', FindInterestSelectionByIdUseCase.name);

      return interest;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding interest selection',
      });
      this.logger.log(error.message, FindInterestSelectionByIdUseCase.name);
      throw err;
    }
  }
}
