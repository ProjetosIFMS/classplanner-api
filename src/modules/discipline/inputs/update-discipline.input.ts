export type UpdateDisciplineInput = {
  name?: string;
  area_id?: string;
  semester?: number;
  pedagogical_project_id?: string;
  modalities_ids?: string[];
  course_id?: string;
  code?: string;
  practicalHours?: number;
  theoreticalHours?: number;
  extensionHours?: number;
};
