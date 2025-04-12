import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindInterestsByDisciplineIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findInterests(discipline_id: string) {
    return await this.prisma.professorInterest.findMany({
      where: {
        discipline_id: discipline_id,
      },
      include: {
        Professor: true,
      },
    });
  }
}
