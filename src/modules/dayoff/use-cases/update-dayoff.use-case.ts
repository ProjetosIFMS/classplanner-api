import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
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
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error while updating dayoff',
      });
      this.logger.error(error.message, UpdateDayoffUseCase.name);
      throw error;
    }
  }
}
