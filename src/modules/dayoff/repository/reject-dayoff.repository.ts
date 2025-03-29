import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class RejectDayoffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async rejectDayoff(id: string) {
    return this.prisma.dayoff.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }
}
