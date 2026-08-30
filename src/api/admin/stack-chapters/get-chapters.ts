import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface Chapter {
  chapterId: number;
  stackId: number;
  stackName: string;
  name: string;
  questionCount: number;
}

export type GetChaptersResponse = Chapter[];

export const getChapters = async (
  stackId: number,
): Promise<Chapter[]> => {
  const response =
    await axiosInstance.get<GetChaptersResponse>(
      `/Admin/stacks/${stackId}/chapters`,
      {
        headers: getAdminToken(),
      },
    );

  return response.data;
};