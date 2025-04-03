import { type ClassgradeDisciplines } from 'src/modules/class-grade/types/classgrade-disciplines';

export type CreateClassGradeInput = {
  year: number;
  semester: number;
  course_id: string;
  pedagogical_project_id: string;
  period_id: string;
  disciplines: ClassgradeDisciplines[];
};
