import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindCourseByIdRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    return course;
  }
}
