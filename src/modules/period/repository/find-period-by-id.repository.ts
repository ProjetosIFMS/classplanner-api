import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindPeriodByIdRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findPeriodById(id: string) {
    return await this.prisma.period.findUnique({
      where: {
        id,
      },
    });
  }
}
