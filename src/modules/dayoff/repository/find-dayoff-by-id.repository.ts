import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindDayoffByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDayoffById(id: string) {
    return await this.prisma.dayoff.findUnique({
      where: { id },
    });
  }
}
