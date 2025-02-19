import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllPeriodsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAllPeriods() {
    return await this.prisma.period.findMany();
  }
}
