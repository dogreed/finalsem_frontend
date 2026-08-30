import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export interface Skill {
  skillId: number;
  skillName: string;
}

export interface VacancyAll {
  vacancyId: number;

  organizationId: number;
  organizationName: string;

  title: string;
  description: string;

  isPublished: boolean;

  publishedAt: string;
  applicationDeadline: string;

  isDeadlinePassed: boolean;
  daysRemaining: number;

  requiredEducationLevel: string;
  requiredFieldOfStudy: string;

  requiredSkills: Skill[];
  optionalSkills: Skill[];
}

export const getAllVacancy = async () => {
  const response = await axiosInstance.get<VacancyAll[]>("Vacancies", {
    headers: getStudentToken(),
  });

  return response.data;
};
