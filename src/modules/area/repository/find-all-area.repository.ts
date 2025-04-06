import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllAreasRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAllAreas() {
    const areas = await this.prisma.area.findMany({
      include: {
        User: true,
        Discipline: true,
      },
    });

    return areas;
  }
}
