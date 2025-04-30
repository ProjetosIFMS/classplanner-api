import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class CreateSystemConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSystemConfig() {
    return await this.prisma.systemConfig.create({ data: {} });
  }
}
