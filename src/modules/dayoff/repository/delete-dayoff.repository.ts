import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteDayoffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async DeleteDayoffRepository(id: string) {
    return await this.prisma.dayoff.delete({
      where: { id },
    });
  }
}
