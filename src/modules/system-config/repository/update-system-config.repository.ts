import { Injectable } from '@nestjs/common';
import { UpdateSystemConfigInput } from 'src/modules/system-config/input/update-system-config.input';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class UpdateSystemConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateSystemConfig(data: UpdateSystemConfigInput, user_id: string) {
    return await this.prisma.systemConfig.update({
      data: { ...data, updated_by: user_id },
      where: { id: 'singleton' },
    });
  }
}
