import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllDisciplinesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllDisciplines(includeModalities: boolean = false) {
    return await this.prisma.discipline.findMany({
      include: {
        Modality: includeModalities ? true : false,
      },
    });
  }
}
