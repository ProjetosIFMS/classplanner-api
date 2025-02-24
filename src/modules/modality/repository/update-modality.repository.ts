import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateModalityInput } from '../inputs/update.modality.inputs';

@Injectable()
export class UpdateModalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateModality(id: string, data: UpdateModalityInput) {
    return await this.prisma.modality.update({
      where: { id },
      data,
    });
  }
}
