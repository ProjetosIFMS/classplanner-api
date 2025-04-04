import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindCourseByIdRepository } from 'src/modules/course/repository/find-course-by-id.repository';
import { FindDisciplinesByCourseIdRepository } from '../repository/find-disciplines-by-course-id.repository';

@Injectable()
export class FindDisciplinesByCourseIdUseCase {
  constructor(
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly findDisciplinesByCourseIdRepository: FindDisciplinesByCourseIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(course_id: string, includeModalities: boolean) {
    try {
      const courseExists =
        this.findCourseByIdRepository.findCourseById(course_id);
      if (!courseExists) {
        const error = new NotFoundException('Course not found');
        this.logger.error(error.message);
        throw error;
      }
      const disciplines =
        this.findDisciplinesByCourseIdRepository.findDisciplinesByCourseId(
          course_id,
          includeModalities,
        );
      this.logger.log(
        'Disciplines found by course id',
        FindDisciplinesByCourseIdUseCase.name,
      );
      return disciplines;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding disciplines',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
