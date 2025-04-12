import {
  Injectable,
  ServiceUnavailableException,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDisciplineRepository } from '../repository/create-discipline.repository';
import { FindDisciplineByNameRepository } from '../repository/find-discipline-by-name.repository';
import { CreateDisciplineDto } from '../dto/create-discipline.dto';
import { FindAllModalitiesRepository } from 'src/modules/modality/repository/find-all-modalities.repository';

@Injectable()
export class CreateDisciplineUseCase {
  constructor(
    private readonly createDisciplineRepository: CreateDisciplineRepository,
    private readonly findDisciplineByNameRepository: FindDisciplineByNameRepository,
    private readonly findAllModalitiesRepository: FindAllModalitiesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateDisciplineDto) {
    try {
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

      const discipline =
        await this.createDisciplineRepository.createDiscipline(data);
      this.logger.log('Discipline created', CreateDisciplineUseCase.name);

      return discipline;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating discipline',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
