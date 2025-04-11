import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateInterestSelectionInput } from '../inputs/update-interest-selection.input';

@Injectable()
export class UpdateInterestSelectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateInterestSelection(
    interest_id: string,
    data: UpdateInterestSelectionInput,
  ) {
    return await this.prisma.professorInterest.update({
      where: {
        id: interest_id,
      },
      data,
    });
  }
}
