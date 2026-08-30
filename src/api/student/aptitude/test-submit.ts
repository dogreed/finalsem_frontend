import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export interface ChapterScore {
  chapterId: number;
  chapterName: string;
  stackName: string;
  scorePercent: number;
  isWeak: boolean;
}

export interface RecommendedResource {
  resourceId: number;
  title: string;
  url: string;
  resourceType: string;
  recommendedBecause: string;
}

export interface SubmitTestResponse {
  testId: number;
  score: number;
  totalAnswered: number;
  correctAnswers: number;
  chapterScores: ChapterScore[];
  weakChapters: string[];
  recommendedResources: RecommendedResource[];
}

export const submitTest = async (testId: number) => {
  const response = await axiosInstance.post<SubmitTestResponse>(
    `/Tests/${testId}/submit`,
     {},
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
