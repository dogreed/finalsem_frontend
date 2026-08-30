import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export type Organization = {
  organizationId: number;
  userId: number;
  name: string;
  email: string;
  websiteUrl: string;
  isVerified: boolean;
  createdAt: string;
};

export const getOrganizations = async (
  pendingOnly?: boolean,
): Promise<Organization[]> => {
  const response = await axiosInstance.get<Organization[]>(
    "Admin/organizations",
    {
      headers: getAdminToken(),
      params: pendingOnly === undefined ? {} : { pendingOnly },
    },
  );

  return response.data;
};
