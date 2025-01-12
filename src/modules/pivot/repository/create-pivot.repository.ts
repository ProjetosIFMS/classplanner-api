import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreatePivotInput } from '../inputs/create-pivot.input';

@Injectable()
export class CreatePivotRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createPivot(data: CreatePivotInput) {
    const pivot = await this.prisma.pivot.create({
      data,
    });

    return pivot;
  }
}
