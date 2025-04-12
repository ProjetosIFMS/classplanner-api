import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateDisciplineRepository } from '../repository/update-discipline.repository';
import { FindDisciplineByIdRepository } from '../repository/find-discipline-by-id.repository';
import { UpdateDisciplineDto } from '../dto/update-discipline.dto';
import { FindAllModalitiesRepository } from 'src/modules/modality/repository/find-all-modalities.repository';

@Injectable()
export class UpdateDisciplineUseCase {
  constructor(
    private readonly updateDisciplineRepository: UpdateDisciplineRepository,
    private readonly findDisciplineByIdRepository: FindDisciplineByIdRepository,
    private readonly findAllModalitiesRepository: FindAllModalitiesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateDisciplineDto) {
    try {
      const disciplineExists =
        await this.findDisciplineByIdRepository.findDisciplineById(id);
      if (!disciplineExists) {
        const error = new NotFoundException('Discipline not found');
        this.logger.error(error.message);
        throw error;
      }

      const allModalities =
        await this.findAllModalitiesRepository.findAllModalities();

      for (const modality of data.modalities_ids) {
        const modalityExists = allModalities.find(
          (modalityItem) => modalityItem.id === modality,
        );

        if (!modalityExists) {
          throw new NotFoundException(
            `Modality with id ${modality} does not exist`,
          );
        }
      }

      const modalitiesFromBody = data.modalities_ids.map((modality) => {
        return {
          id: modality,

          name: allModalities.find(
            (modalityItem) => modalityItem.id === modality,
          ).name,
        };
      });

      const hasOferta = modalitiesFromBody.some(
        (modality) => modality.name === 'Oferta',
      );

      const hasEletiva = modalitiesFromBody.some(
        (modality) => modality.name === 'Eletiva',
      );

      if (hasOferta && hasEletiva) {
        throw new ConflictException(
          'Modalities cannot have both Oferta and Eletiva',
        );
      }

      if (!hasOferta && !hasEletiva) {
        throw new ConflictException(
          'Modality must have either Oferta or Eletiva',
        );
      }

      const discipline = await this.updateDisciplineRepository.updateDiscipline(
        id,
        data,
      );

      this.logger.log('Discipline updated', UpdateDisciplineUseCase.name);
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
