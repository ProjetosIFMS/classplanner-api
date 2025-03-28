import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateDayoffDto } from 'src/modules/dayoff/dto/create-dayoff.dto';
import { CreateDayoffRepository } from 'src/modules/dayoff/repository/create-dayoff.repository';

@Injectable()
export class CreateDayoffUseCase {
  constructor(
    private readonly createDayoffRepository: CreateDayoffRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateDayoffDto) {
    try {
      const dayoff = await this.createDayoffRepository.createDayoff(data);
      this.logger.log('Dayoff created');
      return dayoff;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating dayoff',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
