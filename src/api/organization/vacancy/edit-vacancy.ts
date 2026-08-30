import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export interface EditVacancyPayload {
  title: string;
  description: string;
  applicationDeadline: string;
  requiredEducationLevel: number;
  requiredFieldOfStudy: string;
  requiredSkillIds: number[];
  optionalSkillIds: number[];
}

export const editVacancy = async (id: number, data: EditVacancyPayload) => {
  const response = await axiosInstance.put(`/Vacancies/${id}`, data, {
    headers: getOrganizationToken(),
  });

  return response.data;
};
