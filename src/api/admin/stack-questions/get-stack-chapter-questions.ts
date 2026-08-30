// api/admin/questions/get-questions.ts
import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface QuestionItem {
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

export type GetQuestionsResponse = QuestionItem[];

export const getQuestions = async (
  stackId: number,
  chapterId: number,
): Promise<QuestionItem[]> => {
  const response = await axiosInstance.get<GetQuestionsResponse>(
    `/Admin/stacks/${stackId}/chapters/${chapterId}/questions`,
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
