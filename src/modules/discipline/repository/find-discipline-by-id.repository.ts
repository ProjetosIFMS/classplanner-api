import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindDisciplineByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindDisciplineById(id: string) {
    return await this.prisma.discipline.findUnique({
      where: { id },
    });
  }
}
