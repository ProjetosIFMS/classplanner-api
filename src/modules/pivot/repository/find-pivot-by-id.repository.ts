import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindPivotByIdRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findPivotById(id: string) {
    const pivot = await this.prisma.pivot.findUnique({
      where: { id },
    });

    return pivot;
  }
}
