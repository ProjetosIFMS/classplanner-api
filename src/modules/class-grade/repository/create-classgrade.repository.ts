import { Injectable } from '@nestjs/common';
import { CreateClassGradeInput } from '../inputs/create-classgrade.input';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class CreateClassGradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClassGrade(data: CreateClassGradeInput) {
    const classGrade = await this.prisma.classGrade.create({
      data: {
        year: data.year,
        semester: data.semester,
        course_id: data.course_id,
        pedagogical_project_id: data.pedagogical_project_id,
      },
    });

    for (const discipline of data.disciplines) {
      await this.prisma.classGradeDiscipline.create({
        data: {
          classGrade_id: classGrade.id,
          discipline_id: discipline.discipline_id,
          modality: {
            connect: discipline.modalities_id.map((id) => ({ id })),
          },
        },
      });
    }
    return classGrade;
  }
}
