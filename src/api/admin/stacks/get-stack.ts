import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface Stack {
  stackId: number;
  name: string;
  chapterCount: number;
  totalQuestions: number;
}

export type GetStacksResponse = Stack[];

export const getStacks = async (): Promise<Stack[]> => {
  const response = await axiosInstance.get<GetStacksResponse>(
    "/Admin/stacks",
    {
      headers: getAdminToken(),
    }
  );

  return response.data;
};