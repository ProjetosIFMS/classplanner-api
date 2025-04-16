import { INTEREST_STATUS } from '../types/interest_status';

export type CreateInterestSelectionInput = {
  disciplines_ids: string[];
  status: (typeof INTEREST_STATUS)[keyof typeof INTEREST_STATUS];
};
