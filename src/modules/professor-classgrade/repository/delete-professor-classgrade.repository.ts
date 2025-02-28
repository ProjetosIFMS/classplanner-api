import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteProfessorClassgradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteProfessorClassgrade(id: string) {
    const professor = this.prisma.professorClassGrade.delete({
      where: { id },
    });
    return professor;
  }
}
