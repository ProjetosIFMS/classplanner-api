import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindDisciplinesByCourseIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDisciplinesByCourseId(
    course_id: string,
    includeModalities: boolean = false,
  ) {
    return await this.prisma.discipline.findMany({
      where: {
        course_id,
      },
      include: {
        Modality: includeModalities ? true : false,
      },
    });
  }
}
