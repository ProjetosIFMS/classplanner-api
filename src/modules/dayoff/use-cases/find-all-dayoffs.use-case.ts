import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class FindAllDayoffsUseCase {
  constructor(private readonly logger: Logger = new Logger()) {}

  async execute() {
    try {
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding all dayoffs',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
