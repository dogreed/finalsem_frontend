import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export type StudentStack = {
  stackId: number;
  name: string;
  chapterCount: number;
  totalQuestions: number;
};

export const getStudentStacks = async () => {
  const response = await axiosInstance.get<StudentStack[]>("/Student/stacks", {
    headers: getStudentToken(),
  });

  return response.data;
};
