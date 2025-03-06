import { CreateModalityDto } from '../dto/create-modality.dto';
import { CreateModalityRepository } from '../repository/create-modality.repository';
import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindModalityByNameRepository } from '../repository/find-modality-by-name.repository';

@Injectable()
export class CreateModalityUseCase {
  constructor(
    private readonly createModalityRepository: CreateModalityRepository,
    private readonly findModalityByNameRepository: FindModalityByNameRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateModalityDto) {
    try {
      const modalityNameExists =
        await this.findModalityByNameRepository.findModalityByName(data.name);
      if (modalityNameExists) {
        throw new ConflictException('Modality name already in use.');
      }

      const modality = await this.createModalityRepository.createModality(data);
      this.logger.log('Modality created', CreateModalityUseCase.name);
      return modality;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating modality',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
