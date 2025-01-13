import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllCoursesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAllCourses() {
    const courses = await this.prisma.course.findMany();

    return courses;
  }
}
