import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdatePivotInput } from '../inputs/update-pivot.input';

@Injectable()
export class UpdatePivotRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(id: string, data: UpdatePivotInput) {
    return await this.prisma.pivot.update({
      where: { id },
      data,
    });
  }
}
