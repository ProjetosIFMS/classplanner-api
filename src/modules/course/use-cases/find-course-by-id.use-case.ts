import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindCourseByIdRepository } from '../repository/find-course-by-id.repository';

@Injectable()
export class FindCourseByIdUseCase {
  constructor(
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const course = await this.findCourseByIdRepository.findCourseById(id);

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      this.logger.log('Course found', FindCourseByIdUseCase.name);
      return course;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error find course',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
