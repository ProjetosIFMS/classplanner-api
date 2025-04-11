import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindInterestSelectionByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findInterest(interest_id: string) {
    return await this.prisma.professorInterest.findUnique({
      where: {
        id: interest_id,
      },
    });
  }
}
