import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllDisciplinesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllDisciplines() {
    return await this.prisma.discipline.findMany();
  }
}
