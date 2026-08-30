import axiosInstance from "../../lib/axios";

type LoginPayload = {
  email: string;
  password: string;
};

// export type StudentRegisterPayload = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phoneNumber: string;
// };
export type StudentRegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

// export type OrganizationRegisterPayload = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;

//   companyName: string;
//   contactNumber: string;
//   address: string;
//   city: string;
//   country: string;
//   websiteUrl: string;
//   description: string;
//   industry: string;

//   socialLinks: {
//     platform: string;
//     url: string;
//   }[];
// };
export type OrganizationRegisterPayload = {
  organizationName: string;
  email: string;
  password: string;
  websiteUrl: string;
};

export const login = async (data: LoginPayload) => {
  const response = await axiosInstance.post("/Auth/login", data);
  return response.data;
};

export const registerUser = async (data: StudentRegisterPayload) => {
  const response = await axiosInstance.post("/Auth/register/student", data);
  return response.data;
};

export const registerOrganization = async (
  data: OrganizationRegisterPayload,
) => {
  const response = await axiosInstance.post(
    "/Auth/register/organization",
    data,
  );
  return response.data;
};
