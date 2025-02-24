import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllClassgradeDisciplinesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllClassgradeDisciplines() {
    return await this.prisma.classGradeDiscipline.findMany();
  }
}
