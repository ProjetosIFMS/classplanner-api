import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class DeletePedagogicalProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deletePedagogicalProject(id: string) {
    const pedagogicalProject = await this.prisma.pedagogicalProject.delete({
      where: { id },
    });
    return pedagogicalProject;
  }
}
