import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateProfessorClassgradeInput } from '../inputs/update-professor-classgrade.input';

@Injectable()
export class UpdateProfessorClassgradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfessorClassgrade(
    id: string,
    data: UpdateProfessorClassgradeInput,
  ) {
    const professor = await this.prisma.professorClassGrade.update({
      where: {
        id,
      },
      data,
    });
    return professor;
  }
}
