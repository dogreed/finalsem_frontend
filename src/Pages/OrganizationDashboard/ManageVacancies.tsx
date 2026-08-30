import { useEffect, useState } from "react";
import { Pencil, Trash2, Briefcase, CalendarDays } from "lucide-react";

import { useToast } from "../../hooks/useToasts";

import { getMyVacancies } from "../../api/organization/vacancy/get-organization-vacancies";

import { deleteVacancy } from "../../api/organization/vacancy/delete-vacancy";

import EditVacancyModal from "../../Components/Organization/EditVacancyModal";
import ConformationModel from "../../Components/models/ConformationModel";
import { useNavigate } from "react-router-dom";
import OrganizationVacancyDetailSidebar from "../../Components/Organization/OrganizationVacancyDetailSidebar";

interface VacancySkill {
  skillId: number;
  skillName: string;
}

interface MyVacancy {
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

  requiredSkills: VacancySkill[];
  optionalSkills: VacancySkill[];
}

export default function ManageVacancies() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const [vacancies, setVacancies] = useState<MyVacancy[]>([]);

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [selectedVacancy, setSelectedVacancy] = useState<MyVacancy | null>(
    null,
  );

  const [openEditModal, setOpenEditModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openDetailSidebar, setOpenDetailSidebar] = useState(false);

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      setLoading(true);

      const response = await getMyVacancies();

      setVacancies(response);
    } catch (error: any) {
      showError(error?.message || "Failed to fetch vacancies");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vacancy: MyVacancy) => {
    setSelectedVacancy(vacancy);

    setOpenEditModal(true);
  };

  const handleDeleteClick = (vacancy: MyVacancy) => {
    setSelectedVacancy(vacancy);

    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedVacancy) return;

    try {
      setDeleteLoading(true);

      await deleteVacancy(selectedVacancy.vacancyId);

      setVacancies((prev) =>
        prev.filter(
          (vacancy) => vacancy.vacancyId !== selectedVacancy.vacancyId,
        ),
      );

      showSuccess("Vacancy deleted successfully");

      setOpenDeleteModal(false);

      setSelectedVacancy(null);
    } catch (error: any) {
      showError(error?.message || "Failed to delete vacancy");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleOpenDetails = (vacancy: MyVacancy) => {
    setSelectedVacancy(vacancy);

    setOpenDetailSidebar(true);
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Vacancies</h1>

          <p className="mt-1 text-gray-600">
            View and manage all your posted vacancies
          </p>
        </div>

        <button
          onClick={() => navigate("/organization/post-job")}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
        >
          Post New Vacancy
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

            <p className="text-gray-500">Loading vacancies...</p>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && vacancies.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            No Vacancies Found
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't posted any vacancies yet.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && vacancies.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Vacancy
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Education
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Field
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Skills
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Deadline
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {vacancies.map((vacancy) => (
                  <tr
                    key={vacancy.vacancyId}
                    onClick={() => handleOpenDetails(vacancy)}
                    className="transition hover:bg-blue-100 cursor-pointer"
                  >
                    {/* Vacancy */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                          {vacancy.title?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {vacancy.title}
                          </h3>

                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                            <CalendarDays className="h-3.5 w-3.5" />
                            Published on{" "}
                            {new Date(vacancy.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Education */}
                    <td className="whitespace-nowrap px-6 py-5">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                        {vacancy.requiredEducationLevel}
                      </span>
                    </td>

                    {/* Field */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-gray-700">
                      {vacancy.requiredFieldOfStudy}
                    </td>

                    {/* Skills */}
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {vacancy.requiredSkills.length > 0 ? (
                          <>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                              {vacancy.requiredSkills[0].skillName}
                            </span>

                            {vacancy.requiredSkills.length > 1 && (
                              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                ...
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No skills
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="whitespace-nowrap px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(
                          vacancy.applicationDeadline,
                        ).toLocaleDateString()}
                      </div>

                      {!vacancy.isDeadlinePassed ? (
                        <div className="mt-1 text-xs text-green-600">
                          {vacancy.daysRemaining} days remaining
                        </div>
                      ) : (
                        <div className="mt-1 text-xs text-red-500">
                          Deadline Passed
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          vacancy.isDeadlinePassed
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {vacancy.isDeadlinePassed ? "Closed" : "Open"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap px-6 py-5 flex justify-center">
                      <div className="flex items-center gap-2 ">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(vacancy);
                          }}
                          className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100 cursor-pointer"
                        >
                          <Pencil className="h-4 w-4" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(vacancy);
                          }}
                          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-100 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <EditVacancyModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);

          setSelectedVacancy(null);
        }}
        vacancy={selectedVacancy}
        onSuccess={fetchVacancies}
      />

      {/* Delete Modal */}
      <ConformationModel
        isOpen={openDeleteModal}
        title="Delete Vacancy"
        description={`Are you sure you want to delete "${selectedVacancy?.title}"? This action cannot be undone.`}
        loading={deleteLoading}
        onClose={() => {
          setOpenDeleteModal(false);

          setSelectedVacancy(null);
        }}
        onConfirm={handleDelete}
      />

      <OrganizationVacancyDetailSidebar
        isOpen={openDetailSidebar}
        onClose={() => {
          setOpenDetailSidebar(false);

          setSelectedVacancy(null);
        }}
        vacancy={selectedVacancy}
      />
    </div>
  );
}
