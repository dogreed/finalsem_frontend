import { useEffect, useMemo, useState } from "react";
import { Eye, Trophy, Search, Briefcase, ChevronDown } from "lucide-react";

import { getMyVacancies } from "../../api/organization/vacancy/get-organization-vacancies";

import ShowVacancyApplicants from "../../Components/Organization/ShowVacancyApplicants";

import { educationLevels } from "../../constants/educationLevels";

interface Skill {
  skillId: number;
  skillName: string;
}

interface Vacancy {
  vacancyId: number;
  organizationId: number;
  organizationName: string;

  title: string;
  description: string;

  isPublished: boolean;

  publishedAt: string;
  applicationDeadline: string;

  isDeadlinePassed: boolean;
  daysRemaining: number;

  requiredEducationLevel: string;
  requiredFieldOfStudy: string;

  requiredSkills: Skill[];
  optionalSkills: Skill[];
}

export default function Candidates() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [educationFilter, setEducationFilter] = useState("all");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null,
  );

  const [sidebarType, setSidebarType] = useState<"applications" | "ranked">(
    "applications",
  );

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      setLoading(true);

      const response = await getMyVacancies();

      setVacancies(response ?? []);
    } catch (error) {
      console.error("Failed to fetch vacancies", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSidebar = (
    vacancyId: number,
    type: "applications" | "ranked",
  ) => {
    setSelectedVacancyId(vacancyId);

    setSidebarType(type);

    setSidebarOpen(true);
  };

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((vacancy) => {
      const matchesSearch = vacancy.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesEducation =
        educationFilter === "all" ||
        vacancy.requiredEducationLevel === educationFilter;

      return matchesSearch && matchesEducation;
    });
  }, [vacancies, searchTerm, educationFilter]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <div className="space-y-6 p-2">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage candidates from your posted vacancies.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search vacancies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white md:w-80"
            />
          </div>

          {/* Education Filter */}
          <div className="relative w-full md:w-64">
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <select
              value={educationFilter}
              onChange={(e) => setEducationFilter(e.target.value)}
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="all">All Education Levels</option>

              {educationLevels.map((level) => (
                <option key={level.value} value={level.label}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Published At
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Deadline
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Education
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Field Of Study
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-sm text-gray-500"
                    >
                      Loading vacancies...
                    </td>
                  </tr>
                ) : filteredVacancies.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                          <Briefcase className="h-6 w-6 text-gray-400" />
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900">
                          No vacancies found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Try searching with another keyword or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredVacancies.map((vacancy) => (
                    <tr
                      key={vacancy.vacancyId}
                      className="cursor-pointer transition hover:bg-blue-50"
                    >
                      {/* Title */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500 text-lg font-bold text-white">
                            {vacancy.title?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {vacancy.title}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Published */}
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-700">
                        {formatDate(vacancy.publishedAt)}
                      </td>

                      {/* Deadline */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(vacancy.applicationDeadline)}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {vacancy.daysRemaining} days left
                          </p>
                        </div>
                      </td>

                      {/* Education */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {vacancy.requiredEducationLevel}
                        </span>
                      </td>

                      {/* Field */}
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-700">
                        {vacancy.requiredFieldOfStudy}
                      </td>

                      {/* Actions */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleOpenSidebar(
                                vacancy.vacancyId,
                                "applications",
                              )
                            }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-700 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                            View Applicants
                          </button>

                          <button
                            onClick={() =>
                              handleOpenSidebar(vacancy.vacancyId, "ranked")
                            }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                          >
                            <Trophy className="h-4 w-4" />
                            View Top
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ShowVacancyApplicants
        open={sidebarOpen}
        vacancyId={selectedVacancyId}
        type={sidebarType}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
