import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateInterestSelectionRepository } from '../repository/create-interest-selection.repository';
import { CreateInterestSelectionDto } from '../dto/create-interest-selection.dto';

@Injectable()
export class CreateInterestSelectionUseCase {
  constructor(
    private readonly createInterestSelectionRepository: CreateInterestSelectionRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateInterestSelectionDto) {
    try {
      const createdInterest =
        await this.createInterestSelectionRepository.createInterestSelection(
          data,
        );
      this.logger.log(
        'Interest related to professor',
        CreateInterestSelectionUseCase.name,
      );
      return createdInterest;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating professor interest',
      });

      this.logger.error(error.message);
      throw err;
    }
  }
}
