import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllProfessorsFromAreaByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProfessorsFromAreaById(area_id: string) {
    const professors = (
      await this.prisma.area.findUnique({
        where: {
          id: area_id,
        },
        include: {
          User: true,
        },
      })
    ).User;

    return professors.map((professor) => {
      return {
        id: professor.id,
        email: professor.email,
        firstName: professor.firstName,
        lastName: professor.lastName,
        area_id: professor.area_id,
      };
    });
  }
}
