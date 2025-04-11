import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindInterestSelectionByProfessorIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findInterests(user_id: string) {
    return await this.prisma.professorInterest.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        Discipline: true,
      },
    });
  }
}
