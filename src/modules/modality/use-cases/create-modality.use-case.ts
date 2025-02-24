import { CreateModalityDto } from '../dto/create-modality.dto';
import { FindModalityByIdRepository } from '../repository/find-modality-by-id.repository';
import { CreateModalityRepository } from './../repository/create-modality.reporitory';
import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class CreateModalityUseCase {
  constructor(
    private readonly createModalityRepository: CreateModalityRepository,
    private readonly findModalityByIdRepository: FindModalityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateModalityDto) {
    try {
      const modalityExists =
        await this.findModalityByIdRepository.findModalityById(data.id);
      if (modalityExists) {
        throw new ConflictException('Modality already exists');
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
