import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export const deleteQuestion = async (questionId: number): Promise<void> => {
  await axiosInstance.delete(`/Admin/questions/${questionId}`, {
    headers: getAdminToken(),
  });
};
