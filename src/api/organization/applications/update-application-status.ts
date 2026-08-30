import { getOrganizationToken } from "../../../hooks/useOrganizationAccesstoken";
import axiosInstance from "../../../lib/axios";

export interface UpdateApplicationStatusPayload {
  newStatus: number;
}

export interface UpdateApplicationStatusResponse {
  success?: boolean;
  message?: string;
}

export const updateApplicationStatus = async (
  applicationId: number,
  payload: UpdateApplicationStatusPayload,
): Promise<UpdateApplicationStatusResponse> => {
  const response = await axiosInstance.patch(
    `/Applications/${applicationId}/status`,
    payload,
    {
      headers: getOrganizationToken(),
    },
  );

  return response.data;
};
