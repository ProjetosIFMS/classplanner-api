import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindInterestSelectionByProfessorIdRepository } from '../repository';

@Injectable()
export class FindInterestSelectionByProfessorIdUseCase {
  constructor(
    private readonly findInterestSelectionByProfessorIdRepository: FindInterestSelectionByProfessorIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(user_id: string) {
    try {
      const interests =
        await this.findInterestSelectionByProfessorIdRepository.findInterests(
          user_id,
        );

      if (!interests) {
        this.logger.error(
          'Interests selection not found',
          FindInterestSelectionByProfessorIdUseCase.name,
        );
        throw new NotFoundException('Interest selection found');
      }
      this.logger.log(
        'Interest found',
        FindInterestSelectionByProfessorIdUseCase.name,
      );

      return interests;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding interests selection',
      });
      this.logger.log(
        error.message,
        FindInterestSelectionByProfessorIdUseCase.name,
      );
      throw err;
    }
  }
}
