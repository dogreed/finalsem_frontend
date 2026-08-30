import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export interface SubmitTestAnswerPayload {
  testId: number;
  questionId: number;
  selectedOption: string;
}

export interface SubmitTestAnswerResponse {
  success: boolean;
  message: string;
}

export const submitTestAnswer = async (
  testId: number,
  payload: SubmitTestAnswerPayload,
) => {
  const response = await axiosInstance.post<SubmitTestAnswerResponse>(
    `/Tests/${testId}/answers`,
    payload,
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
