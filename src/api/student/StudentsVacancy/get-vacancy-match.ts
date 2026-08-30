import { getStudentToken } from "../../../hooks/useStudentAccessToken";
import axiosInstance from "../../../lib/axios";

export interface VacancyMatch {
  vacancyId: number;
  title: string;
  organizationName: string;

  isEligible: boolean;
  eligibilityMessage: string;

  requirementFit: number;
  optionalFit: number;
  educationBonus: number;

  missingSkills: string[];
}

export const getVacancyMatches = async () => {
  const response = await axiosInstance.get<VacancyMatch[]>(
    "/Vacancies/matches",
    {
      headers: getStudentToken(),
    },
  );

  return response.data;
};
