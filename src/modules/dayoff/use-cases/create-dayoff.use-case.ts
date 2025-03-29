import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { CreateDayoffDto } from 'src/modules/dayoff/dto/create-dayoff.dto';
import { CreateDayoffRepository } from 'src/modules/dayoff/repository/create-dayoff.repository';
import { FindDayoffByUserIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-user-id.repository';

@Injectable()
export class CreateDayoffUseCase {
  constructor(
    private readonly createDayoffRepository: CreateDayoffRepository,
    private readonly findDayoffByUserIdRepository: FindDayoffByUserIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(user_id: string, data: CreateDayoffDto) {
    try {
      const dayoffExists =
        await this.findDayoffByUserIdRepository.findDayoffByUserId(user_id);

      if (dayoffExists) {
        throw new ConflictException(
          `Dayoff for user ${user_id} already exists`,
        );
      }

      const dayoff = await this.createDayoffRepository.createDayoff(
        user_id,
        data,
      );
      this.logger.log('Dayoff created');
      return dayoff;
    } catch (err) {
      if (err instanceof ConflictException) {
        this.logger.error(err.message, CreateDayoffUseCase.name);
        throw err;
      }

      if (err instanceof PrismaClientValidationError) {
        const error = new UnprocessableEntityException(
          'The provided data is invalid or cannot be processed.',
        );
        this.logger.error(err.message, CreateDayoffUseCase.name);
        throw error;
      }

      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating dayoff',
      });
      this.logger.error(error.message, CreateDayoffUseCase.name);
      throw error;
    }
  }
}
