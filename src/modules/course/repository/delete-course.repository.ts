import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
@Injectable()
export class DeleteCourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteCourse(id: string) {
    const course = await this.prisma.course.delete({
      where: { id },
    });
    return course;
  }
}
