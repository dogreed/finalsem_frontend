import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export type ConfirmedSkill = {
  skillId: number;
  name: string;
};

export type StudentProfileResponse = {
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

export const getStudentProfile = async () => {
  const response = await axiosInstance.get<StudentProfileResponse>(
    "/Student/me",
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
