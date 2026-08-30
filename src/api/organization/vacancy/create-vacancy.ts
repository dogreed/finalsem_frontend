import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export interface CreateVacancyPayload {
  title: string;
  description: string;
  applicationDeadline: string;
  requiredEducationLevel: number;
  requiredFieldOfStudy: string;
  requiredSkillIds: number[];
  optionalSkillIds: number[];
}

export const createVacancy = async (data: CreateVacancyPayload) => {
  const response = await axiosInstance.post("/Vacancies", data, {
    headers: getOrganizationToken(),
  });

  return response.data;
};
