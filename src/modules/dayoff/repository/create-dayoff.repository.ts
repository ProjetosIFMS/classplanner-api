import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateDayoffInput } from 'src/modules/dayoff/inputs/create-dayoff.input';

@Injectable()
export class CreateDayoffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDayoff(user_id: string, data: CreateDayoffInput) {
    return await this.prisma.dayoff.create({
      data: {
        user_id,
        ...data,
      },
    });
  }
}
