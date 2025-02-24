import { PrismaService } from 'src/shared/databases/prisma.database';
import { Injectable } from '@nestjs/common';
import { CreateClassgradeDisciplineInput } from '../inputs/create-classgrade-discipline.input';

@Injectable()
export class CreateClassgradeDisciplneRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClassgradeDiscipline(data: CreateClassgradeDisciplineInput) {
    return await this.prisma.classGradeDiscipline.create({
      data: data,
    });
  }
}
