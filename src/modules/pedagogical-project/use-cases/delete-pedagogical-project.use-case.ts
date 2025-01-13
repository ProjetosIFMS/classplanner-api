import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeletePedagogicalProjectRepository } from '../repository/delete-pedagogical-project.repository';
import { FindPedagogicalProjectByIdRepository } from '../repository/find-pedagogical-project-by-id.repository';

@Injectable()
export class DeletePedagogicalProjectUseCase {
  constructor(
    private readonly deletePedagogicalProjectRepository: DeletePedagogicalProjectRepository,
    private readonly findPedagogicalProjectByIdRepository: FindPedagogicalProjectByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
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
        await this.deletePedagogicalProjectRepository.deletePedagogicalProject(
          id,
        );
      this.logger.log(
        'Pedagogical Propject deleted',
        DeletePedagogicalProjectUseCase,
      );
      return pedagogicalProject;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting pedagogical project',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
