import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateAreaInput } from '../inputs/create-area.input';

@Injectable()
export class CreateAreaRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createArea(data: CreateAreaInput) {
    const area = await this.prisma.area.create({
      data,
    });

    return area;
  }
}
