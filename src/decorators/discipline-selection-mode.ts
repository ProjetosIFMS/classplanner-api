import { SetMetadata } from '@nestjs/common';
import { DISCIPLINE_SELECTION_MODE } from '@prisma/client';

export const DISCIPLINE_SELECTION_MODE_KEY = 'DISCIPLINE_SELECTION_MODE';
export const RequiresDisciplineMode = (mode: DISCIPLINE_SELECTION_MODE) =>
  SetMetadata(DISCIPLINE_SELECTION_MODE_KEY, mode);
