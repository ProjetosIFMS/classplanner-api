import { Injectable } from '@nestjs/common';
import { UpdateDayoffInput } from 'src/modules/dayoff/inputs/update-dayoff.input';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class UpdateDayoffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateDayoff(id: string, data: UpdateDayoffInput) {
    return await this.prisma.dayoff.update({
      where: { id },
      data,
    });
  }
}
