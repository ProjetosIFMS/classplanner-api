import { DeleteModalityRepository } from './../repository/delete-modality.repository';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindModalityByIdRepository } from '../repository/find-modality-by-id.repository';

@Injectable()
export class DeleteModalityUseCase {
  constructor(
    private readonly deleteModalityRepository: DeleteModalityRepository,
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
      const modality = await this.deleteModalityRepository.deleteModality(id);
      this.logger.log('Modality deleted', DeleteModalityUseCase.name);
      return modality;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting modality',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
