import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export const uploadStudentPhoto = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axiosInstance.post("/Student/me/photo", formData, {
    headers: {
      ...getStudentToken(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
