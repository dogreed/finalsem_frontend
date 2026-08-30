import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export interface OrganizationDashboardResponse {
  name: string;
  websiteUrl: string;
  logoUrl: string | null;

  totalVacanciesPosted: number;
  totalApplicationsReceived: number;

  applicationsOffered: number;
  applicationsRejected: number;
}

export const getOrganizationDashboard =
  async (): Promise<OrganizationDashboardResponse> => {
    const response = await axiosInstance.get("/Organization/dashboard", {
      headers: getOrganizationToken(),
    });

    return response.data;
  };
