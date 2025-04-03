import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllClassGradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllClassGrades(includeDisciplines) {
    return await this.prisma.classGrade.findMany({
      include: {
        ClassGradeDiscipline: includeDisciplines
          ? {
              include: { Discipline: true },
              omit: { discipline_id: true },
            }
          : false,
      },
    });
  }
}
