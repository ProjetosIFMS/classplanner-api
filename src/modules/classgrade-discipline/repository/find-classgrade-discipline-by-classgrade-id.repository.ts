import { PrismaService } from 'src/shared/databases/prisma.database';

export class FindClassgradeDisciplineByClassGradeIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindByClassgrade(classGrade_id: string) {
    return await this.prisma.classGradeDiscipline.findFirst({
      where: {
        classGrade_id,
      },
    });
  }
}
