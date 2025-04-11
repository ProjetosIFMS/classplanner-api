import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateInterestSelectionRepository } from '../repository/update-interest-selection.repository';
import { FindInterestSelectionByIdRepository } from '../repository/find-interest-selection-by-id.repository';
import { UpdateInterestSelectionDto } from '../dto/update-interest-selection.dto';

@Injectable()
export class UpdateInterestSelectionUseCase {
  constructor(
    private readonly updateInterestSelectionRepository: UpdateInterestSelectionRepository,
    private readonly findInterestByIdRepository: FindInterestSelectionByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, data: UpdateInterestSelectionDto) {
    try {
      const isExistent = await this.findInterestByIdRepository.findInterest(id);

      if (!isExistent) {
        this.logger.error(
          'Interest not found',
          UpdateInterestSelectionUseCase.name,
        );
        throw new NotFoundException('Interest not found');
      }

      const updatedInterest =
        await this.updateInterestSelectionRepository.updateInterestSelection(
          id,
          data,
        );
      this.logger.log(
        'Interest related to professor',
        UpdateInterestSelectionUseCase.name,
      );

      return updatedInterest;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating professor interest',
      });

      this.logger.error(error.message);
      throw err;
    }
  }
}
