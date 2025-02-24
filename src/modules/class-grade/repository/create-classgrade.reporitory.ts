import { Injectable } from '@nestjs/common';
import { CreateClassGradeInput } from '../inputs/create-classgrade.input';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class CreateClassGradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClassGrade(data: CreateClassGradeInput) {
    return await this.prisma.classGrade.create({
      data,
    });
  }
}
