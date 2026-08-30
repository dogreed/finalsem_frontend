import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

// export type VerifyOrganizationPayload = {
//   isApproved: boolean;
// //   rejectionReason?: string;
// };

export const verifyOrganization = async (organizationId: number | string) => {
  const response = await axiosInstance.post(
    `/Admin/organizations/${organizationId}/verify`,
    null,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
