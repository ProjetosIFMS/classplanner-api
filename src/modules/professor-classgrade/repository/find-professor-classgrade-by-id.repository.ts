import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindProfessorClassgradeByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const professor = this.prisma.professorClassGrade.findUnique({
      where: { id },
    });
    return professor;
  }
}
