import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateDisciplineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateDiscipline(id: string, data: Prisma.DisciplineUpdateInput) {
    return await this.prisma.discipline.update({
      where: { id },
      data,
    });
  }
}
