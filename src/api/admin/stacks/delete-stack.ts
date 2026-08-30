import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export const deleteStack = async (stackId: number): Promise<void> => {
  await axiosInstance.delete(`/Admin/stacks/${stackId}`, {
    headers: getAdminToken(),
  });
};
