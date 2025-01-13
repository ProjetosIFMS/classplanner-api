import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdateAreaInput } from '../inputs/update-area.input';

@Injectable()
export class UpdateAreaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateArea(id: string, data: UpdateAreaInput) {
    const area = await this.prisma.area.update({
      where: { id },
      data,
    });
    return area;
  }
}
