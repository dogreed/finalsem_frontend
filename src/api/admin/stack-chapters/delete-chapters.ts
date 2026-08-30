import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";


export const deleteChapter = async (
  chapterId: number,
) => {
  const response = await axiosInstance.delete(
    `Admin/chapters/${chapterId}`,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};