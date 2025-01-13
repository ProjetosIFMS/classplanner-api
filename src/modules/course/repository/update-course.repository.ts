import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdateCourseInput } from '../inputs/update-course.input';

@Injectable()
export class UpdateCourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateCourse(id: string, data: UpdateCourseInput) {
    const course = await this.prisma.course.update({
      where: { id },
      data,
    });
    return course;
  }
}
