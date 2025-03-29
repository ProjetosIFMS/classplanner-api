import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindDayoffByUserIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDayoffByUserId(user_id: string) {
    return await this.prisma.dayoff.findUnique({
      where: { user_id },
    });
  }
}
