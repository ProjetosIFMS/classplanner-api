import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllModalitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllModalities() {
    return await this.prisma.modality.findMany();
  }
}
