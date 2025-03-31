import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllCoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCourses(
    includeDisciplines: boolean,
    includePedagogicalProjects: boolean,
  ) {
    const courses = await this.prisma.course.findMany({
      include: {
        disciplines: includeDisciplines ? true : false,
        pedagogicalProjects: includePedagogicalProjects ? true : false,
      },
    });

    return courses;
  }
}
