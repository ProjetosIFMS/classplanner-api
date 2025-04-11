import { INTEREST_STATUS } from '../types/interest_status';

export type UpdateInterestSelectionInput = {
  status: (typeof INTEREST_STATUS)[keyof typeof INTEREST_STATUS];
};
