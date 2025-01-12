import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdatePivotRepository } from '../repository/update-pivot.repository';
import { FindPivotByIdRepository } from '../repository/find-pivot-by-id.repository';
import { UpdatePivotDto } from '../dto/update-pivot.dto';

@Injectable()
export class UpdatePivotUseCase {
  constructor(
    private readonly updatePivotRepository: UpdatePivotRepository,
    private readonly findPivotByIdRepository: FindPivotByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdatePivotDto) {
    try {
      const userExists = await this.findPivotByIdRepository.findPivotById(id);
      if (!userExists) {
        const error = new NotFoundException('User not found');
        this.logger.error(error.message);
        throw error;
      }
      const user = await this.updatePivotRepository.updateUser(id, data);
      this.logger.log('User updated', UpdatePivotUseCase.name);
      return user;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error updating user',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
