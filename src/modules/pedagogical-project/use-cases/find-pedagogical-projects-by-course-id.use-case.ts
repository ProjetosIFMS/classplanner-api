import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindPedagogicalProjectsByCourseIdRepository } from '../repository/find-pedagogical-projects-by-course-id.repository';
import { FindCourseByIdRepository } from 'src/modules/course/repository/find-course-by-id.repository';

@Injectable()
export class FindPedagogicalProjectsByCourseIdUseCase {
  constructor(
    private readonly findPedagogicalProjectsByCourseIdRepository: FindPedagogicalProjectsByCourseIdRepository,
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(course_id: string) {
    try {
      const courseExists =
        await this.findCourseByIdRepository.findCourseById(course_id);
      if (!courseExists) {
        throw new NotFoundException('Course not found');
      }
      const pedagogicalProjects =
        await this.findPedagogicalProjectsByCourseIdRepository.findPedagogicalProjectsByCourseId(
          course_id,
        );
      this.logger.log(
        'Pedagogical Projects found by Course id',
        FindPedagogicalProjectsByCourseIdUseCase.name,
      );
      return pedagogicalProjects;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding pedagogical projects by course id',
      });
      this.logger.log(error.message);
      throw err;
    }
  }
}
