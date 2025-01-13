import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAreaByIdRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAreaById(id: string) {
    const area = await this.prisma.area.findUnique({
      where: { id },
    });

    return area;
  }
}
