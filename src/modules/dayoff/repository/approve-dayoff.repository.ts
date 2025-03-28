import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class ApproveDayoffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async approveDayoff(id: string) {
    return this.prisma.dayoff.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }
}
