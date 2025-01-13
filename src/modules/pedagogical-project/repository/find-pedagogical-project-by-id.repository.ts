import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindPedagogicalProjectByIdRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findPedagogicalProjectByIdRepository(id: string) {
    const pedagogicalProject = await this.prisma.pedagogicalProject.findUnique({
      where: { id },
    });

    return pedagogicalProject;
  }
}
