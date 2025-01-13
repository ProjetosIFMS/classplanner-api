import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreatePedagogicalProjectRepository } from '../repository/create-pedagogical-project.repository';
import { CreatePedagogicalProjectDto } from '../dto/create-pedagogical-project.dto';

@Injectable()
export class CreatePedagogicalProjectUseCase {
  constructor(
    private readonly createAreaRepository: CreatePedagogicalProjectRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreatePedagogicalProjectDto) {
    try {
      const pedagogicalProject =
        await this.createAreaRepository.createPedagogicalProject(data);
      this.logger.log(
        'Pedagogical Project created',
        CreatePedagogicalProjectUseCase.name,
      );
      return pedagogicalProject;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating area',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}