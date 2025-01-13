import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdatePedagogicalProjectInput } from '../inputs/update-pedagogical-project';

@Injectable()
export class UpdatePedagogicalProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updatePedagogicalProject(
    id: string,
    data: UpdatePedagogicalProjectInput,
  ) {
    const pedagogicalProject = await this.prisma.pedagogicalProject.update({
      where: { id },
      data,
    });
    return pedagogicalProject;
  }
}
