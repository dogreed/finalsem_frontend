import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface CreateQuestionPayload {
  stackId: number;
  chapterId: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

export interface CreateQuestionResponse {
  questionId: number;
  chapterId: number;
  chapterName: string;
  stackName: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

export const createQuestion = async (
  payload: CreateQuestionPayload,
): Promise<CreateQuestionResponse> => {
  const response = await axiosInstance.post<CreateQuestionResponse>(
    "/Admin/questions",
    payload,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
