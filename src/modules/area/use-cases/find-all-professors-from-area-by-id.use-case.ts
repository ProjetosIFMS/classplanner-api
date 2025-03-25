import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllProfessorsFromAreaByIdRepository } from 'src/modules/area/repository/find-all-professors-from-area-by-id.repository';

@Injectable()
export class FindAllProfessorsFromAreaByIdUseCase {
  constructor(
    private readonly FindAllProfessorsFromAreaById: FindAllProfessorsFromAreaByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const professors =
        await this.FindAllProfessorsFromAreaById.findAllProfessorsFromAreaById(
          id,
        );

      if (!professors) {
        throw new NotFoundException('Professors not found');
      }

      this.logger.log(
        'Professors found',
        FindAllProfessorsFromAreaByIdUseCase.name,
      );
      return professors;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error find professors',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
