import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateModalityInput } from '../inputs/create-modality.input';

@Injectable()
export class CreateModalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createModality(data: CreateModalityInput) {
    return await this.prisma.modality.create({
      data,
    });
  }
}
