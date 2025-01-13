import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdatePedagogicalProjectRepository } from '../repository/update-pedagogical-project.repository';
import { FindPedagogicalProjectByIdRepository } from '../repository/find-pedagogical-project-by-id.repository';
import { UpdatePedagogicalProjectDto } from '../dto/update-pedagogical-project.dto';

@Injectable()
export class UpdatePedagogicalProjectUseCase {
  constructor(
    private readonly updatePedagogicalProjectRepository: UpdatePedagogicalProjectRepository,
    private readonly findPedagogicalProjectByIdRepository: FindPedagogicalProjectByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdatePedagogicalProjectDto) {
    try {
      const pedagogicalProjectExists =
        await this.findPedagogicalProjectByIdRepository.findPedagogicalProjectByIdRepository(
          id,
        );
      if (!pedagogicalProjectExists) {
        const error = new NotFoundException('Pedagogical project not found');
        this.logger.error(error.message);
        throw error;
      }
      const pedagogicalProject =
        await this.updatePedagogicalProjectRepository.updatePedagogicalProject(
          id,
          data,
        );
      this.logger.log('Area updated', UpdatePedagogicalProjectUseCase.name);
      return pedagogicalProject;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error updating pedagogical project',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
