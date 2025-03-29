import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { UpdateDayoffDto } from 'src/modules/dayoff/dto/update-dayoff.dto';
import { FindDayoffByIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-id.repository';
import { UpdateDayoffRepository } from 'src/modules/dayoff/repository/update-dayoff.repository';

@Injectable()
export class UpdateDayoffUseCase {
  constructor(
    private readonly findDayoffByIdRepository: FindDayoffByIdRepository,
    private readonly updateDayoffRepository: UpdateDayoffRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateDayoffDto) {
    try {
      const dayoffExists =
        await this.findDayoffByIdRepository.findDayoffById(id);

      if (!dayoffExists) {
        const error = new NotFoundException('Dayoff not found');
        this.logger.error(error.message);
        throw error;
      }

      const dayoff = await this.updateDayoffRepository.updateDayoff(id, data);
      this.logger.log('Dayoff updated');
      return dayoff;
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.error(err.message, UpdateDayoffUseCase.name);
        throw err;
      }

      if (err instanceof PrismaClientValidationError) {
        const error = new UnprocessableEntityException(
          'The provided data is invalid or cannot be processed.',
        );
        this.logger.error(err.message, UpdateDayoffUseCase.name);
        throw error;
      }

      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error while updating dayoff',
      });
      this.logger.error(error.message, UpdateDayoffUseCase.name);
      throw error;
    }
  }
}
