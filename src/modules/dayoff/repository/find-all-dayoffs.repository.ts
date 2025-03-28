import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { DAYOFF_STATUS } from 'src/modules/dayoff/dto/dayoff-status';
import { WEEKDAY } from '@prisma/client';

@Injectable()
export class FindAllDayoffsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllDayoffs(status: DAYOFF_STATUS | '', weekday: WEEKDAY | '') {
    return await this.prisma.dayoff.findMany({
      where: {
        ...(status && { status }),
        ...(weekday && { weekday }),
      },
    });
  }
}
