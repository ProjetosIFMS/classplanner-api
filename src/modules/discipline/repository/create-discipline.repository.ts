import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateDisciplineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDiscipline(data: Prisma.DisciplineCreateInput) {
    return await this.prisma.discipline.create({
      data,
    });
  }
}
