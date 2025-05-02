import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class CountSystemConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async countSystemConfig() {
    return await this.prisma.systemConfig.count();
  }
}
