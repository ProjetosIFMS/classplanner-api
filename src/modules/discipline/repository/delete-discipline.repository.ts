import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteDisciplineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteDiscipline(id: string) {
    return await this.prisma.discipline.delete({
      where: { id },
    });
  }
}
