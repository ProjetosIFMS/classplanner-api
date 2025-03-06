import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindModalityByIdRepository } from './../repository/find-modality-by-id.repository';
import { UpdateModalityRepository } from './../repository/update-modality.repository';
import { UpdateModalityDto } from '../dto/update-modality.dto';
import { FindModalityByNameRepository } from '../repository/find-modality-by-name.repository';
@Injectable()
export class UpdateModalityUseCase {
  constructor(
    private readonly updateModalityRepository: UpdateModalityRepository,
    private readonly findModalityByNameRepository: FindModalityByNameRepository,
    private readonly findModalityByIdRepository: FindModalityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateModalityDto) {
    try {
      const modalityExists =
        await this.findModalityByIdRepository.findModalityById(id);
      if (!modalityExists) {
        const error = new NotFoundException('Modality not found');
        this.logger.error(error.message);
        throw error;
      }

      const modalityNameExists =
        await this.findModalityByNameRepository.findModalityByName(data.name);
      if (modalityNameExists) {
        throw new ConflictException('Modality name already in use.');
      }
      const modality = await this.updateModalityRepository.updateModality(
        id,
        data,
      );

      this.logger.log('Modality updated', UpdateModalityUseCase.name);
      return modality;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating modality',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
