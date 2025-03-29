import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';

export type CreateDayoffInput = {
  reason: string;
  schedule: string;
  frequency: string;
  weekday: WEEKDAY;
};
