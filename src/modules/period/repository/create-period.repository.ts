import { Injectable } from '@nestjs/common';
import { CreatePeriodInput } from '../inputs/create-period.input';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class CreatePeriodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPeriod(data: CreatePeriodInput) {
    const period = await this.prisma.period.create({
      data,
    });
    return period;
  }
}
