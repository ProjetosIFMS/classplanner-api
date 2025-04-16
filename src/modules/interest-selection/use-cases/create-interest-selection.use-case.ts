import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateInterestSelectionRepository } from '../repository/create-interest-selection.repository';
import { CreateInterestSelectionDto } from '../dto/create-interest-selection.dto';
import { FindInterestSelectionByProfessorIdRepository } from '../repository';

@Injectable()
export class CreateInterestSelectionUseCase {
  constructor(
    private readonly createInterestSelectionRepository: CreateInterestSelectionRepository,
    private readonly findInterestByProfessorIdRepository: FindInterestSelectionByProfessorIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(user_id: string, data: CreateInterestSelectionDto) {
    try {
      const relatedInterests =
        await this.findInterestByProfessorIdRepository.findInterests(user_id);

      if (
        relatedInterests.some((discipline) =>
          data.disciplines_ids.includes(discipline.discipline_id),
        )
      ) {
        throw new ConflictException(
          'Discipline(s) already related to professor',
        );
      }

      const createdInterest =
        await this.createInterestSelectionRepository.createInterestSelection(
          user_id,
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
