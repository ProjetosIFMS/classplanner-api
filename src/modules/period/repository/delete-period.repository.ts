import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class DeletePeriodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deletePeriod(id: string) {
    const period = await this.prisma.period.delete({
      where: {
        id,
      },
    });
    return period;
  }
}
