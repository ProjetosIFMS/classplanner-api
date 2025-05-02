import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindSystemConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findSystemConfig() {
    return await this.prisma.systemConfig.findUnique({
      where: { id: 'singleton' },
    });
  }
}
