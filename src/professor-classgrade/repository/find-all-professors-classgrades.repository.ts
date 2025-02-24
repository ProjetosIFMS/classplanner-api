import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllProfessorsClassgradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProfessorsClassgrades() {
    const professorsClassgrades = this.prisma.professorClassGrade.findMany();
    return professorsClassgrades;
  }
}
