import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindPedagogicalProjectsByCourseIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPedagogicalProjectsByCourseId(course_id: string) {
    const course = this.prisma.pedagogicalProject.findMany({
      where: {
        course_id,
      },
    });

    return course;
  }
}
