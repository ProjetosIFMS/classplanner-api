import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteClassGradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteClassGrade(id: string) {
    return await this.prisma.classGrade.delete({
      where: { id },
    });
  }
}
