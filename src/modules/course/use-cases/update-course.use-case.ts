import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateCourseRepository } from '../repository/update-course.repository';
import { FindCourseByIdRepository } from '../repository/find-course-by-id.repository';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class UpdateCourseUseCase {
  constructor(
    private readonly updateCourseRepository: UpdateCourseRepository,
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateCourseDto) {
    try {
      const courseExists =
        await this.findCourseByIdRepository.findCourseById(id);
      if (!courseExists) {
        const error = new NotFoundException('Course not found');
        this.logger.error(error.message);
        throw error;
      }
      const course = await this.updateCourseRepository.updateCourse(id, data);
      this.logger.log('Course updated', UpdateCourseUseCase.name);
      return course;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error updating course',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
