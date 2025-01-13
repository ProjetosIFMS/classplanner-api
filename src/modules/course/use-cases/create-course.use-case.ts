import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CreateCourseRepository } from '../repository/create-course.repository';

@Injectable()
export class CreateCourseUseCase {
  constructor(
    private readonly createCourseRepository: CreateCourseRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateCourseDto) {
    try {
      const course = await this.createCourseRepository.createCourse(data);
      this.logger.log('Course created', CreateCourseUseCase.name);
      return course;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating course',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
