import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface UpdateStackPayload {
  name: string;
}

export interface Stack {
  stackId: number;
  name: string;
  chapterCount: number;
  totalQuestions: number;
}

export const updateStack = async (
  stackId: number,
  payload: UpdateStackPayload,
): Promise<Stack> => {
  const response = await axiosInstance.put<Stack>(
    `/Admin/stacks/${stackId}`,
    payload,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};