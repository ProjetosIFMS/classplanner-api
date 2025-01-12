import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
@Injectable()
export class DeletePivotRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deletePivot(id: string) {
    return await this.prisma.pivot.delete({
      where: { id },
    });
  }
}
