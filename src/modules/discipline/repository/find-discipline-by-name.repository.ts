import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindDisciplineByNameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDisciplineByName(name: string) {
    return await this.prisma.discipline.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }
}
