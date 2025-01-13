import { Injectable } from '@nestjs/common';
import { CreatePedagogicalProjectInput } from '../inputs/create-pedagogical-project.input';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class CreatePedagogicalProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPedagogicalProject(data: CreatePedagogicalProjectInput) {
    const pedagogicalProject = await this.prisma.pedagogicalProject.create({
      data,
    });

    return pedagogicalProject;
  }
}
