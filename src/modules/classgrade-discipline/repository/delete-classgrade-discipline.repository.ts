import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteClassgradeDisciplineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async DeleteClassgradeDiscipline(id: string) {
    this.prisma.classGradeDiscipline.delete({
      where: { id },
    });
  }
}
