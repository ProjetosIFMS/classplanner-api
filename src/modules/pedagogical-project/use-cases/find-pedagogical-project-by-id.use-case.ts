import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindPedagogicalProjectByIdRepository } from '../repository/find-pedagogical-project-by-id.repository';

@Injectable()
export class FindPedagogicalProjectByIdUseCase {
  constructor(
    private readonly findPedagogicalProjectByIdRepository: FindPedagogicalProjectByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const pedagogicalProject =
        await this.findPedagogicalProjectByIdRepository.findPedagogicalProjectByIdRepository(
          id,
        );

      if (!pedagogicalProject) {
        throw new NotFoundException('Pedagogical project not found');
      }

      this.logger.log(
        'Pedagogical Project found',
        FindPedagogicalProjectByIdUseCase,
      );
      return pedagogicalProject;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error find pedagogical project',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
