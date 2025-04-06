export type CreateDisciplineInput = {
  name: string;
  area_id: string;
  pedagogical_project_id: string;
  course_id: string;
  semester: number;
  modalities_ids: string[];
  code: string;
  practicalHours: number;
  theoreticalHours: number;
  extensionHours: number;
};
