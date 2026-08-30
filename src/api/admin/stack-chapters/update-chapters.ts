import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export type UpdateChapterPayload = {
  name: string;
};

export type ChapterItem = {
  chapterId: number;
  stackId: number;
  stackName: string;
  name: string;
  questionCount: number;
};

export const updateChapter = async (
  chapterId: number,
  payload: UpdateChapterPayload,
) => {
  const response = await axiosInstance.put<ChapterItem>(
    `/Admin/chapters/${chapterId}`,
    payload,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
