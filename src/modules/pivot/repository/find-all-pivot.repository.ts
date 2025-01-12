import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllPivotsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAllPivots() {
    const pivots = await this.prisma.pivot.findMany();

    return pivots;
  }
}
