import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllPedagogicalProjectsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAllPedagogicalProjects() {
    const pedagogicalProjects = await this.prisma.pedagogicalProject.findMany();

    return pedagogicalProjects;
  }
}
