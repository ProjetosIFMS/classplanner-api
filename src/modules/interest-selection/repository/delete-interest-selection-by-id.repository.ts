import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteInterestSelectionById {
  constructor(private readonly prisma: PrismaService) {}

  async DeleteInterestSelectionById(id: string) {
    return await this.prisma.professorInterest.delete({ where: { id } });
  }
}
