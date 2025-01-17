import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { FindAreaByIdRepository } from '../../area/repository/find-area-by-id.repository';
import { UpdateUserAreaRepository } from '../repository/update-user-area.repository';

@Injectable()
export class UpdateUserAreaUseCase {
  constructor(
    private readonly updateUserAreaRepository: UpdateUserAreaRepository,
    private readonly findAreaByIdRepository: FindAreaByIdRepository,
  ) {}

  async execute(userId: string, role: string, areaId: string) {
    if (role !== 'PROFESSOR') {
      throw new ForbiddenException('Only PROFESSOR can update area_id');
    }

    const areaExists = await this.findAreaByIdRepository.findAreaById(areaId);

    if (!areaExists) {
      throw new NotFoundException('Area not found');
    }

    try {
      return await this.updateUserAreaRepository.updateUserArea(userId, areaId);
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }
}
