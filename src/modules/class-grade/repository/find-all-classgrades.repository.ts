import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllClassGradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllClassGrades() {
    return await this.prisma.classGrade.findMany();
  }
}
