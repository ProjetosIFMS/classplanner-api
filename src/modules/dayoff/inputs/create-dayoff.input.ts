import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';

export type CreateDayoffInput = {
  id: string;
  reason: string;
  schedule: string;
  frequency: string;
  weekday: WEEKDAY;
  user_id: string;
};
