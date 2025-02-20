import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateClassgradeDisciplineInput } from '../inputs/update-classgrade-discipline.input';

@Injectable()
export class UpdateClassgradeDisciplineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateClassgradeDiscipline(
    id: string,
    data: UpdateClassgradeDisciplineInput,
  ) {
    return await this.prisma.classGradeDiscipline.update({
      where: { id },
      data,
    });
  }
}
