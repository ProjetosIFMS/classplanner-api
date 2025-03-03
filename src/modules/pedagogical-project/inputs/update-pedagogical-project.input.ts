export type UpdatePedagogicalProjectInput = {
  course_id: string;
  year: number;
  status: boolean;
  hasTCC: boolean;
  description: string;
  stageHours: number;
  complementaryHours: number;
  extensionCourses: number;
  workload: number;
};
