export type CreatePedagogicalProjectInput = {
  id: string;
  course_id: string;
  year: number;
  status: boolean;
  hasTCC: boolean;
  description: string;
  stageHours: number;
  complementaryHours: number;
};
