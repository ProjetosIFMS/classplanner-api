import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateDisciplineInput } from '../inputs/update-discipline.input';

@Injectable()
export class UpdateDisciplineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateDiscipline(id: string, data: UpdateDisciplineInput) {
    const { modalities_ids, ...disciplineData } = data;
    return await this.prisma.discipline.update({
      where: { id },
      data: {
        ...disciplineData,
        ...(modalities_ids && {
          Modality: {
            set: [],
            connect: modalities_ids.map((id) => ({ id })),
          },
        }),
      },
    });
  }
}
