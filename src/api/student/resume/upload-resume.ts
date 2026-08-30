import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export type ResumeSkillSuggestion = {
  skillId: number;
  skillName: string;
  confidence: number;
  matchType: string;
};

export type UploadResumeResponse = {
  suggestions: ResumeSkillSuggestion[];
  totalExtracted: number;
};

export const uploadResume = async (payload: FormData) => {
  const response = await axiosInstance.post<UploadResumeResponse>(
    "/Resume/upload",
    payload,
    {
      headers: {
        ...getStudentToken(),
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
