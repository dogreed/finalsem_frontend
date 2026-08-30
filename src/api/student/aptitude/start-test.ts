import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export interface StartTestPayload {
  stackId: number;
}

export interface TestQuestion {
  questionId: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  chapterName: string;
  stackName: string;
}

export interface StartTestResponse {
  testId: number;
  startedAt: string;
  expiresAt: string;
  questions: TestQuestion[];
}

export const startTest = async (payload: StartTestPayload) => {
  const response = await axiosInstance.post<StartTestResponse>(
    "Tests/start",
    payload,
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
