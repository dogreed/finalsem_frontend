import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export type ConfirmedSkill = {
  skillId: number;
  name: string;
};

export type UpdateStudentProfilePayload = Partial<{
  fullName: string;
  phoneNumber: string;
  bio: string;
  nationality: string;
  location: string;
  educationLevel: number;
  fieldOfStudy: string;
  gitHubUrl: string;
  portfolioUrl: string;
  linkedInUrl: string;
}>;

export type UpdateStudentProfileResponse = {
  studentId: number;
  userId: number;

  fullName: string;
  email: string;

  photoUrl: string | null;

  phoneNumber: string | null;
  bio: string | null;

  nationality: string | null;
  location: string | null;

  educationLevel: string | null;
  fieldOfStudy: string | null;

  gitHubUrl: string | null;
  portfolioUrl: string | null;
  linkedInUrl: string | null;

  resumeUrl: string | null;

  confirmedSkills: ConfirmedSkill[];
};

export const updateStudentProfile = async (
  payload: UpdateStudentProfilePayload,
) => {
  const response = await axiosInstance.put<UpdateStudentProfileResponse>(
    "/Student/me",
    payload,
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
