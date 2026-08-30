import { getAdminToken } from "../../hooks/useAdminAccessToken";
import axiosInstance from "../../lib/axios";

// to get the organizations list

// export const getOrganizations = async ({
//   status,
//   pageNumber = 1,
//   pageSize = 10,
// }: {
//   status?: "Pending" | "Rejected" | "Verified";
//   pageNumber?: number;
//   pageSize?: number;
// } = {}) => {
//   const response = await axiosInstance.get("/Admin/organizations", {
//     headers: getAdminToken(),
//     params: {
//       status,
//       pageNumber,
//       pageSize,
//     },
//   });

//   return response.data;
// };

//for the approve and reject of the organizations
// export type VerifyOrganizationPayload = {
//   isApproved: boolean;
//   rejectionReason?: string;
// };

// export const verifyOrganization = async (
//   organizationId: string,
//   payload: VerifyOrganizationPayload,
// ) => {
//   const response = await axiosInstance.patch(
//     `/Admin/organizations/${organizationId}/verify`,
//     payload,
//     {
//       headers: getAdminToken(),
//     },
//   );

//   return response.data;
// };

// for the suspend the organization
export const suspendOrganization = async (organizationId: string) => {
  const response = await axiosInstance.patch(
    `/Admin/organizations/${organizationId}/suspend`,
    {},
    {
      headers: getAdminToken(),
    },
  );

  return response.data;
};

// To ge the stacks
export type Stack = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  isActive: boolean;
  chapterCount: number;
  totalQuestions: number;
  badgeCount: number;
  createdAt: string;
};

export type PaginatedStacks = {
  items: Stack[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type GetStacksResponse = {
  isSuccess: boolean;
  data: PaginatedStacks;
  message: string | null;
  errors: string[];
};

// export const getStacks = async (): Promise<PaginatedStacks> => {
//   const response = await axiosInstance.get<GetStacksResponse>("/Admin/stacks", {
//     headers: getAdminToken(),
//   });

//   return response.data.data;
// };

// to post the stack
export type CreateStackPayload = {
  name: string;
  description: string;
  iconUrl: string;
};

// export const createStack = async (payload: CreateStackPayload) => {
//   const response = await axiosInstance.post("/Admin/stacks", payload, {
//     headers: getAdminToken(),
//   });

//   return response.data;
// };

// to update the stack
export type UpdateStackPayload = {
  name: string;
  description: string;
  iconUrl: string;
};

// export const updateStack = async (
//   stackId: string,
//   payload: UpdateStackPayload,
// ) => {
//   const response = await axiosInstance.put(
//     `/Admin/stacks/${stackId}`,
//     payload,
//     {
//       headers: getAdminToken(),
//     },
//   );

//   return response.data;
// };

