import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
@Injectable()
export class DeleteAreaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteArea(id: string) {
    const area = await this.prisma.area.delete({
      where: { id },
    });
    return area;
  }
}
