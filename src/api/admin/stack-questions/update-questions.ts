import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface UpdateQuestionPayload {
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

export interface QuestionResponse {
  questionId: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

export const updateQuestion = async (
  questionId: number,
  payload: UpdateQuestionPayload,
): Promise<QuestionResponse> => {
  const response = await axiosInstance.patch<QuestionResponse>(
    `/Admin/questions/${questionId}`,
    payload,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
