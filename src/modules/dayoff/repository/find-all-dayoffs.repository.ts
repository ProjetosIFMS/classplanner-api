import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllDayoffsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllDayoffs() {}
}
