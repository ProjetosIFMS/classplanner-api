import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class KeepRecentSystemConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async KeepRecentSystemConfig() {
    const configs = await this.prisma.systemConfig.findMany({
      orderBy: { updated_at: 'desc' },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [latest, ...outdated] = configs;

    if (outdated.length > 0) {
      await this.prisma.systemConfig.deleteMany({
        where: {
          id: { in: outdated.map((c) => c.id) },
        },
      });
    }
  }
}
