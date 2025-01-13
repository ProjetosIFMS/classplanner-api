import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindDisciplineByNameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPedagogicalProjectByYear(year: number) {
    return await this.prisma.pedagogicalProject.findMany({
      where: {
        year,
      },
    });
  }
}
