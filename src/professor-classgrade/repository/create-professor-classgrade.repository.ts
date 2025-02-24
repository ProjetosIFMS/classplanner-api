import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateProfessorClassgradeInput } from '../inputs/create-professor-classgrade.input';

@Injectable()
export class CreateProfessorClassGradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfessorClassGrade(data: CreateProfessorClassgradeInput) {
    const professorClassgrade = this.prisma.professorClassGrade.create({
      data,
    });
    return professorClassgrade;
  }
}
