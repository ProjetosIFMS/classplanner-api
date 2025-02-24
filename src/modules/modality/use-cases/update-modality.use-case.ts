import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindModalityByIdRepository } from './../repository/find-modality-by-id.repository';
import { UpdateModalityRepository } from './../repository/update-modality.repository';
import { UpdateModalityDto } from '../dto/update-modality.dto';
@Injectable()
export class UpdateModalityUseCase {
  constructor(
    private readonly updateModalityRepository: UpdateModalityRepository,
    private readonly findModalityByIdRepository: FindModalityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateModalityDto) {
    try {
      const disciplineExists =
        await this.findModalityByIdRepository.findModalityById(id);
      if (!disciplineExists) {
        const error = new NotFoundException('Discipline not found');
        this.logger.error(error.message);
        throw error;
      }
      const discipline = await this.updateModalityRepository.updateModality(
        id,
        data,
      );

      this.logger.log('Discipline updated', UpdateModalityUseCase.name);
      return discipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating discipline',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
