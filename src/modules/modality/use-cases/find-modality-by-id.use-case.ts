import {
  Logger,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindModalityByIdRepository } from '../repository/find-modality-by-id.repository';
@Injectable()
export class FindModalityByIdUseCase {
  constructor(
    private readonly findModalityByIdRepository: FindModalityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const modalityExists =
        await this.findModalityByIdRepository.findModalityById(id);

      if (!modalityExists) {
        throw new NotFoundException('Modality not found');
      }
      this.logger.log('Modality found', FindModalityByIdRepository.name);
      return modalityExists;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding modality',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
