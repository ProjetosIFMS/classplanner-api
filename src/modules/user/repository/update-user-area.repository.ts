import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class UpdateUserAreaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserArea(userId: string, areaId: string) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { area_id: areaId },
      });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }
}
