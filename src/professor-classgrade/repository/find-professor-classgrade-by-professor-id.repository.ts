import { PrismaService } from 'src/shared/databases/prisma.database';

export class FindProfessorClassgradeByProfessorIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfessorId(user_id: string) {
    const professor_classgrades = this.prisma.professorClassGrade.findMany({
      where: { user_id },
    });
    return professor_classgrades;
  }
}
