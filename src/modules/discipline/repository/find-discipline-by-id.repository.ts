import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindDisciplineByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDisciplineById(id: string, includeModalities: boolean = false) {
    return await this.prisma.discipline.findUnique({
      where: { id },
      include: {
        Modality: includeModalities ? true : false,
      },
    });
  }
}
