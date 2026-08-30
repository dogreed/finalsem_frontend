import { getAdminToken } from "../../../hooks/useAdminAccessToken";
import axiosInstance from "../../../lib/axios";

export interface StudentResponse {
  studentId: number;
  userId: number;
  fullName: string;
  email: string;
  educationLevel: number | null;
  fieldOfStudy: string | null;
  skills: string[];
  totalApplications: number;
  totalTests: number;
}

export const getStudents = async (): Promise<StudentResponse[]> => {
  const response = await axiosInstance.get<StudentResponse[]>(
    "/Admin/students",
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};
