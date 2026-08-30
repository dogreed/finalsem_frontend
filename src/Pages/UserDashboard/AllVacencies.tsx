import { useEffect, useMemo, useState } from "react";

import { Search, Building2, Clock, GraduationCap } from "lucide-react";

import { applyForApplication } from "../../api/student/StudentsVacancy/apply-for-application";

import { useToast } from "../../hooks/useToasts";

import {
  getAllVacancy,
  type VacancyAll,
} from "../../api/student/StudentsVacancy/get-all-vacency";

import VacenciesDetails from "../../Components/Students/VacenciesDetails";

export default function AllVacencies() {
  const { showSuccess, showError } = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  const [jobs, setJobs] = useState<VacancyAll[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState<VacancyAll | null>(null);

  const [showSidebar, setShowSidebar] = useState(false);

  const [applyingId, setApplyingId] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed">(
    "all",
  );

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      setLoading(true);

      const data = await getAllVacancy();

      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch vacancies", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.MouseEvent, job: VacancyAll) => {
    e.stopPropagation();

    try {
      setApplyingId(job.vacancyId);

      await applyForApplication({
        vacancyId: job.vacancyId,
      });

      showSuccess("Application submitted successfully!");
    } catch (error: any) {
      console.error(error);

      const errorMessage =
        error?.response?.data?.title ||
        error?.response?.data?.message ||
        "Failed to apply for vacancy";

      showError(errorMessage);
    } finally {
      setApplyingId(null);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organizationName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? !job.isDeadlinePassed
            : job.isDeadlinePassed;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          All Vacancies
        </h1>

        <p className="mt-1 text-gray-500">Browse all available job vacancies</p>
      </div>

      {/* Search */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-start ">
        <div className="relative w-full lg:w-100">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs or organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-13 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-700 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "active" | "closed")
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="all">All Vacancies</option>
            <option value="active">Active Vacancies</option>
            <option value="closed">Closed Vacancies</option>
          </select>
        </div>
      </div>
      {/* Loading */}
      {loading ? (
        <div className="rounded-3xl border border-gray-200 bg-white py-24 text-center text-gray-500 shadow-sm">
          Loading vacancies...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white py-24 text-center text-gray-500 shadow-sm">
          No vacancies found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="min-w-[1000px]">
            {" "}
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-8 py-5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <div className="col-span-4">Position</div>

              <div className="col-span-3">Organization</div>

              <div className="col-span-2">Education</div>

              <div className="col-span-2">Deadline</div>

              <div className="col-span-1 text-right">Action</div>
            </div>
            {/* Rows */}
            {filteredJobs.map((job, index) => (
              <div
                key={job.vacancyId}
                onClick={() => {
                  setSelectedJob(job);
                  setShowSidebar(true);
                }}
                className={`group grid cursor-pointer grid-cols-12 gap-4 px-8 py-5 transition-all hover:bg-blue-100 ${
                  index !== filteredJobs.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* Position */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500 text-base font-bold text-white shadow-sm">
                    {job.title.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {job.requiredFieldOfStudy}
                    </p>
                  </div>
                </div>

                {/* Organization */}
                <div className="col-span-3 flex items-center">
                  <div className="flex items-center gap-2 rounded-2xl bg-blue-100 px-4 py-2.5 text-blue-700 transition-all group-hover:bg-blue-200">
                    <Building2 className="h-4 w-4" />

                    <span className="text-sm font-semibold">
                      {job.organizationName}
                    </span>
                  </div>
                </div>

                {/* Education */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5">
                    <GraduationCap className="h-4 w-4 text-indigo-500" />

                    <span className="text-sm font-semibold text-gray-700">
                      {job.requiredEducationLevel}
                    </span>
                  </div>
                </div>

                {/* Deadline */}
                <div className="col-span-2 flex items-center">
                  {job.isDeadlinePassed ? (
                    <span className="rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-700">
                      Closed
                    </span>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <Clock className="h-4 w-4 text-gray-400" />

                        {formatDate(job.applicationDeadline)}
                      </div>

                      <p className="mt-1 text-sm text-green-700">
                        {job.daysRemaining} days left
                      </p>
                    </div>
                  )}
                </div>

                {/* Action */}
                <button
                  onClick={(e) => handleApply(e, job)}
                  disabled={
                    applyingId === job.vacancyId || job.isDeadlinePassed
                  }
                  className="h-10 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {job.isDeadlinePassed
                    ? "Closed"
                    : applyingId === job.vacancyId
                      ? "..."
                      : "Apply"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <VacenciesDetails
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        job={selectedJob}
      />
    </div>
  );
}
