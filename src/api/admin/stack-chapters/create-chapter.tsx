import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export type CreateChapterPayload = {
  stackId: number;
  name: string;
};

export type CreateChapterResponse = {
  stackId: number;
  name: string;
  chapterCount: number;
  totalQuestions: number;
};

export const createChapter = async (payload: CreateChapterPayload) => {
  const response = await axiosInstance.post<CreateChapterResponse>(
    "/Admin/chapters",
    payload,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
