import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateClassGradeInput } from '../inputs/update-classgrade.input';

@Injectable()
export class UpdateClassGradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateClassGrade(id: string, data: UpdateClassGradeInput) {
    return await this.prisma.classGrade.update({
      where: { id },
      data,
    });
  }
}
