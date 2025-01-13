import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateCourseInput } from '../inputs/create-course.input';

@Injectable()
export class CreateCourseRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createCourse(data: CreateCourseInput) {
    const course = await this.prisma.course.create({
      data,
    });

    return course;
  }
}
