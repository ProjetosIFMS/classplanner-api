import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindClassgradeDisciplineByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindById(id: string) {
    return await this.prisma.classGradeDiscipline.findUnique({
      where: { id },
    });
  }
}
