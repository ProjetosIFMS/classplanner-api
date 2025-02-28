import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindProfessorClassgradeByClassgradeIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByClassgradeId(classGrade_id: string) {
    const classgrade_professors = this.prisma.professorClassGrade.findMany({
      where: { classGrade_id },
    });

    return classgrade_professors;
  }
}
