import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export interface MatchSnapshot {
  requirementFit: number;
  optionalFit: number;
  educationBonus: number;
  missingSkills: string[];
  computedAt: string;
}

export interface MyApplication {
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

export const getMyApplications = async (): Promise<MyApplication[]> => {
  const response = await axiosInstance.get<MyApplication[]>(
    "/Applications/mine",
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
