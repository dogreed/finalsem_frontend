// src/api/company/get-ranked-applications.ts

import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export interface RankedCandidate {
  studentId: number;
  studentName: string;
  resumeUrl: string;
  testCount: number;
  score: number;
  rank: number;
  gitHubUrl: string;
  rankingScore: number;
}

export interface RankedApplicationsResponse {
  vacancyId: number;
  vacancyTitle: string;

  candidates: RankedCandidate[];
}

export const getRankedApplications = async (
  vacancyId: number,
): Promise<RankedApplicationsResponse> => {
  const response = await axiosInstance.get(
    `/Applications/vacancies/${vacancyId}/ranked`,
    {
      headers: getOrganizationToken(),
    },
  );

  return response.data;
};
