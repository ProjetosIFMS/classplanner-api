import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateClassGradeInput } from '../inputs/update-classgrade.input';

@Injectable()
export class UpdateClassGradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateClassGrade(id: string, data: UpdateClassGradeInput) {
    const { disciplines, period_id, ...updateData } = data; // Exclude disciplines from the update data

    const classGrade = await this.prisma.classGrade.update({
      where: { id },
      data: updateData,
    });

    if (disciplines?.length > 0) {
      for (const discipline of disciplines) {
        const discipline_to_be_updated =
          await this.prisma.classGradeDiscipline.findFirst({
            where: {
              classGrade_id: classGrade.id,
              discipline_id: discipline.discipline_id,
            },
          });

        await this.prisma.classGradeDiscipline.update({
          where: {
            id: discipline_to_be_updated.id,
          },
          data: {
            period_id: period_id,
            Modality: {
              set: [],
              connect: discipline.modalities_ids.map((id) => ({ id })),
            },
          },
        });
      }
    }

    return classGrade;
  }
}
