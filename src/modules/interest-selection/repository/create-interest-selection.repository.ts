import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateInterestSelectionInput } from '../inputs/create-interest-selection.input';

@Injectable()
export class CreateInterestSelectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInterestSelection(
    user_id: string,
    data: CreateInterestSelectionInput,
  ) {
    return await Promise.all(
      data.disciplines_ids.map((disciplineId) =>
        this.prisma.professorInterest.create({
          data: {
            discipline_id: disciplineId,
            status: data.status,
            user_id: user_id,
          },
        }),
      ),
    );
  }
}
