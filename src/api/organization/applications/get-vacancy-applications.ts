// src/api/company/get-vacancy-applications.ts

import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export interface VacancyApplication {
  applicationId: number;
  resumeUrl: string;
  testCount: number;
  vacancyId: number;
  vacancyTitle: string;

  studentId: number;
  studentName: string;

  status: string;

  appliedAt: string;
}

export const getVacancyApplications = async (
  vacancyId: number,
): Promise<VacancyApplication[]> => {
  const response = await axiosInstance.get(
    `/Applications/vacancies/${vacancyId}/applications`,
    {
      headers: getOrganizationToken(),
    },
  );

  return response.data;
};
