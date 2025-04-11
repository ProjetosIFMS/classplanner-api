import { INTEREST_STATUS } from '../types/interest_status';

export type CreateInterestSelectionInput = {
  user_id: string;
  discipline_id: string;
  status: (typeof INTEREST_STATUS)[keyof typeof INTEREST_STATUS];
};
