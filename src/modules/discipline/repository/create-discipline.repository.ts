import { PrismaService } from '../../../shared/databases/prisma.database';
import { Injectable } from '@nestjs/common';
import { CreateDisciplineInput } from '../inputs/create-discipline.input';

@Injectable()
export class CreateDisciplineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDiscipline(data: CreateDisciplineInput) {
    return await this.prisma.discipline.create({
      data,
    });
  }
}
