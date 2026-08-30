import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export interface MatchSnapshot {
  requirementFit: number;
  optionalFit: number;
  educationBonus: number;
  missingSkills: string[];
  computedAt: string;
}

export interface applyForApplicationRequest {
  vacancyId: number;
}

export interface applyForApplicationResponse {
  applicationId: number;
  vacancyId: number;
  vacancyTitle: string;
  studentId: number;
  studentName: string;
  status: string;
  appliedAt: string;
  statusUpdatedAt: string | null;
  matchSnapshot: MatchSnapshot;
}

export const applyForApplication = async (
  data: applyForApplicationRequest,
): Promise<applyForApplicationResponse> => {
  const response = await axiosInstance.post<applyForApplicationResponse>(
    "/Applications",
    data,
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
