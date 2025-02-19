import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdatePeriodInput } from '../inputs/update-period.input';

@Injectable()
export class UpdatePeriodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updatePeriod(id: string, data: UpdatePeriodInput) {
    const period = await this.prisma.period.update({
      where: { id },
      data,
    });
    return period;
  }
}
