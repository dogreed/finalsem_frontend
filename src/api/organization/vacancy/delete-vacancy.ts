import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export const deleteVacancy = async (id: number) => {
  const response = await axiosInstance.delete(`/Vacancies/${id}`, {
    headers: getOrganizationToken(),
  });

  return response.data;
};
