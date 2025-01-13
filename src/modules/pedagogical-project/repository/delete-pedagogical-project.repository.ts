import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class DeletePedagogicalProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deletePedagogicalProject(id: string) {
    const pedagogicalProject = await this.prisma.area.delete({
      where: { id },
    });
    return pedagogicalProject;
  }
}
