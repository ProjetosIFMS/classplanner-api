import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllCoursesRepository } from '../repository/find-all-course.repository';

@Injectable()
export class FindAllCoursesUseCase {
  constructor(
    private readonly findAllCoursesRepository: FindAllCoursesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(
    includeDisciplines: boolean,
    includePedagogicalProjects: boolean,
  ) {
    try {
      const courses = await this.findAllCoursesRepository.findAllCourses(
        includeDisciplines,
        includePedagogicalProjects,
      );
      if (!courses) {
        throw new NotFoundException('Courses not found');
      }
      this.logger.log('Courses found', FindAllCoursesUseCase.name);
      return courses;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error finding all courses',
      });
      this.logger.error(error.message, FindAllCoursesUseCase.name);
      throw error;
    }
  }
}
