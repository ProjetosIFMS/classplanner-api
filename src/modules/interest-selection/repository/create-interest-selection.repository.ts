import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateInterestSelectionInput } from '../inputs/create-interest-selection.input';

@Injectable()
export class CreateInterestSelectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInterestSelection(data: CreateInterestSelectionInput) {
    return await this.prisma.professorInterest.create({
      data,
    });
  }
}
