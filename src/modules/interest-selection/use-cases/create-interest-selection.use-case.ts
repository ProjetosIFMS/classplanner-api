import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateInterestSelectionRepository } from '../repository/create-interest-selection.repository';
import { CreateInterestSelectionDto } from '../dto/create-interest-selection.dto';
import {
  FindInterestSelectionByProfessorIdRepository,
  UpdateInterestSelectionRepository,
} from '../repository';
import { ProfessorInterest } from '@prisma/client';

@Injectable()
export class CreateInterestSelectionUseCase {
  constructor(
    private readonly createInterestSelectionRepository: CreateInterestSelectionRepository,
    private readonly findInterestByProfessorIdRepository: FindInterestSelectionByProfessorIdRepository,
    private readonly updateInterestRepository: UpdateInterestSelectionRepository,
    private readonly logger: Logger,
  ) {}

  async execute(user_id: string, data: CreateInterestSelectionDto) {
    try {
      const existingInterests =
        await this.findInterestByProfessorIdRepository.findInterests(user_id);

      const existingInterestsDisciplinesIds = existingInterests.map(
        (existingInterest) => existingInterest.discipline_id,
      );

      const interestsDisciplinesIdsToAdd: string[] =
        data.disciplines_ids.filter(
          (discipline_id) =>
            !existingInterestsDisciplinesIds.includes(discipline_id),
        );

      const interestsDisciplinesIdsToActivate: string[] =
        existingInterestsDisciplinesIds.filter((discipline_id) =>
          data.disciplines_ids.includes(discipline_id),
        );

      const interestsDisciplinesIdsToInactivate: string[] =
        existingInterestsDisciplinesIds.filter(
          (discipline_id) => !data.disciplines_ids.includes(discipline_id),
        );

      const returningInterests: ProfessorInterest[] = [];

      if (interestsDisciplinesIdsToAdd.length > 0) {
        returningInterests.push(
          ...(await this.createInterestSelectionRepository.createInterestSelection(
            user_id,
            {
              disciplines_ids: interestsDisciplinesIdsToAdd,
              status: data.status,
            },
          )),
        );
      }

      if (interestsDisciplinesIdsToActivate.length > 0) {
        const activatedInterests = await Promise.all(
          interestsDisciplinesIdsToActivate.map(async (discipline_id) => {
            const interestIdToActivate = existingInterests.find(
              (interest) => interest.discipline_id === discipline_id,
            )?.id;
            if (interestIdToActivate) {
              return await this.updateInterestRepository.updateInterestSelection(
                interestIdToActivate,
                {
                  status: 'ACTIVE',
                },
              );
            }
            return null;
          }),
        );

        returningInterests.push(...activatedInterests.filter(Boolean));
      }

      if (interestsDisciplinesIdsToInactivate.length > 0) {
        const inactivatedInterests = await Promise.all(
          interestsDisciplinesIdsToInactivate.map(async (discipline_id) => {
            const interestIdToInactivate = existingInterests.find(
              (interest) => interest.discipline_id === discipline_id,
            )?.id;
            if (interestIdToInactivate) {
              return await this.updateInterestRepository.updateInterestSelection(
                interestIdToInactivate,
                {
                  status: 'INACTIVE',
                },
              );
            }
            return null;
          }),
        );

        returningInterests.push(...inactivatedInterests.filter(Boolean));
      }

      this.logger.log(
        'Interest related to professor',
        CreateInterestSelectionUseCase.name,
      );

      return returningInterests;
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
