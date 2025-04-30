import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SystemConfigService } from 'src/modules/system-config/system-config.service';
import { DISCIPLINE_SELECTION_MODE } from '@prisma/client';
import { DISCIPLINE_SELECTION_MODE_KEY } from 'src/decorators/discipline-selection-mode';

@Injectable()
export class DisciplineSelectionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly systemConfigService: SystemConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAlwaysAvailable = this.reflector.getAllAndOverride<boolean>(
      DISCIPLINE_SELECTION_MODE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAlwaysAvailable) {
      return true;
    }

    const requiredMode =
      this.reflector.getAllAndOverride<DISCIPLINE_SELECTION_MODE>(
        DISCIPLINE_SELECTION_MODE_KEY,
        [context.getHandler(), context.getClass()],
      );

    if (!requiredMode) {
      return true;
    }

    const config = await this.systemConfigService.findSystemConfig();
    return config.discipline_selection_mode === requiredMode;
  }
}
