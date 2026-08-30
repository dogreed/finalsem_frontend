// /api/Admin/organizations/{organizationId}/status

import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export type UpdateOrganizationStatusPayload = {
  status: number;
  reason?: string;
};

export const updateOrganizationStatus = async (
  organizationId: number | string,
  payload: UpdateOrganizationStatusPayload,
) => {
  const response = await axiosInstance.put(
    `/Admin/organizations/${organizationId}/status`,
    payload,
    {
      headers: getAdminToken(), 
    },
  );

  return response.data;
};
