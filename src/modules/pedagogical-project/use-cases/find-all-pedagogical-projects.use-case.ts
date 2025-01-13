import { FindAllPedagogicalProjectsRepository } from '../repository/find-all-pedagogical-project.repository';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class FindAllPedagogicalProjectsUseCase {
  constructor(
    private readonly findAllPedagogicalProjectsRepository: FindAllPedagogicalProjectsRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const pedagogicalProjects =
        await this.findAllPedagogicalProjectsRepository.findAllPedagogicalProjects();
      if (!pedagogicalProjects) {
        throw new NotFoundException('No pedagogical projects found');
      }
      this.logger.log(
        'Pedagogical projects found',
        FindAllPedagogicalProjectsUseCase,
      );
      return pedagogicalProjects;
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
