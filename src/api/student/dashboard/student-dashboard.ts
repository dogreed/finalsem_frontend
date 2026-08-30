import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export type StudentDashboardProfileResponse = {
  totalScore: number;

  hasFullName: boolean;
  hasPhoto: boolean;
  hasPhoneNumber: boolean;
  hasEducation: boolean;

  skillPoints: number;

  hasResume: boolean;
  hasGitHub: boolean;
  hasPortfolio: boolean;
  hasLinkedIn: boolean;
  totalApplicationApplied: number;
  totalTestsAttempted: number;
  hasBio: boolean;
  hasNationality: boolean;
};

export const StudentDashboardProfile = async () => {
  const response = await axiosInstance.get<StudentDashboardProfileResponse>(
    "/Student/me/dashboard",
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
