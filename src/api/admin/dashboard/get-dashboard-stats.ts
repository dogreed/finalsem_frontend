import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface DashboardResponse {
  totalStudents: number;
  verifiedOrganizations: number;
  totalVacancies: number;
  totalApplications: number;
  studentsAttemptedTest:number;
}

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await axiosInstance.get<DashboardResponse>(
    "/Admin/dashboard",
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
