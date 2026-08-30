import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface CreateStackPayload {
  name: string;
}

export interface Stack {
  stackId: number;
  name: string;
  chapterCount: number;
  totalQuestions: number;
}

export const createStack = async (
  payload: CreateStackPayload,
): Promise<Stack> => {
  const response = await axiosInstance.post<Stack>(
    "/Admin/stacks",
    payload,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};