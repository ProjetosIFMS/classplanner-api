import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteCourseRepository } from '../repository/delete-course.repository';
import { FindCourseByIdRepository } from '../repository/find-course-by-id.repository';

@Injectable()
export class DeleteCourseUseCase {
  constructor(
    private readonly deleteCourseRepository: DeleteCourseRepository,
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const courseExists =
        await this.findCourseByIdRepository.findCourseById(id);
      if (!courseExists) {
        const error = new NotFoundException('Course not found');
        this.logger.error(error.message);
        throw error;
      }

      const course = await this.deleteCourseRepository.deleteCourse(id);
      this.logger.log('Course deleted', DeleteCourseUseCase.name);
      return course;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting course',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
