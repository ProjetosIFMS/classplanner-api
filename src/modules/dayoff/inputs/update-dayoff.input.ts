import { DAYOFF_STATUS } from 'src/modules/dayoff/dto/dayoff-status';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';

export type UpdateDayoffInput = {
  reason?: string;
  schedule?: string;
  frequency?: string;
  weekday?: WEEKDAY;
  status?: DAYOFF_STATUS;
};
