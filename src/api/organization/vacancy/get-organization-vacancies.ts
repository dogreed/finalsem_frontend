import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export interface VacancySkill {
  skillId: number;
  skillName: string;
}

export interface MyVacancy {
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

  requiredSkills: VacancySkill[];
  optionalSkills: VacancySkill[];
}

export const getMyVacancies = async (): Promise<MyVacancy[]> => {
  const response = await axiosInstance.get("/Vacancies/mine", {
    headers: getOrganizationToken(),
  });

  return response.data;
};
