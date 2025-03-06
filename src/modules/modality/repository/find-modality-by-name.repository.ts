import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindModalityByNameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findModalityByName(name: string) {
    return await this.prisma.modality.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }
}
