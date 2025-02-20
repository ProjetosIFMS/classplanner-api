import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindClassgradeDisciplineByPeriodIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindByPeriodId(id: string) {
    return await this.prisma.classGradeDiscipline.findFirst({
      where: {
        id,
      },
    });
  }
}
