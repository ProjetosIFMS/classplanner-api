import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteModalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteModality(id: string) {
    return await this.prisma.modality.delete({
      where: { id },
    });
  }
}
