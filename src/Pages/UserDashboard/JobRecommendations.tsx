import { Search, Building2, AlertCircle } from "lucide-react";

import { useEffect, useState } from "react";

import {
  getVacancyMatches,
  type VacancyMatch,
} from "../../api/student/StudentsVacancy/get-vacancy-match";

import JobsDetailsSidebar from "../../Components/Students/JobsDetailsSidebar";

import { applyForApplication } from "../../api/student/StudentsVacancy/apply-for-application";

import { useToast } from "../../hooks/useToasts";

export default function JobRecommendations() {
  const { showSuccess, showError } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [matchFilter, setMatchFilter] = useState("all");

  const [jobs, setJobs] = useState<VacancyMatch[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState<VacancyMatch | null>(null);

  const [showSidebar, setShowSidebar] = useState(false);

  const [applyingId, setApplyingId] = useState<number | null>(null);

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      setLoading(true);

      const data = await getVacancyMatches();

      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch vacancy matches", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.MouseEvent, job: VacancyMatch) => {
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

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organizationName.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;

      if (matchFilter === "25") {
        matchesFilter = job.requirementFit >= 25;
      }

      if (matchFilter === "50") {
        matchesFilter = job.requirementFit >= 50;
      }

      if (matchFilter === "75") {
        matchesFilter = job.requirementFit >= 75;
      }

      if (matchFilter === "100") {
        matchesFilter = job.requirementFit === 100;
      }

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => b.requirementFit - a.requirementFit);

  return (
    <div className="p-2 min-h-screen ">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Job Recommendations
            </h1>

            <p className="text-gray-500 mt-1">
              Personalized matches based on your profile & skills
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white  mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search jobs or organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
          </div>

          {/* Filter */}
          <select
            value={matchFilter}
            onChange={(e) => setMatchFilter(e.target.value)}
            className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
          >
            <option value="all">All Matches</option>
            <option value="25">25% and above</option>
            <option value="50">50% and above</option>
            <option value="75">75% and above</option>
            <option value="100">100% Match Only</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-gray-200 py-20 text-center text-gray-500 ">
          Loading recommendations...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 py-20 text-center text-gray-500 ">
          No matching vacancies found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden ">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider font-semibold text-gray-500">
            <div className="col-span-5">Position</div>

            <div className="col-span-3">Organization</div>

            <div className="col-span-2 text-center">Match</div>

            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Rows */}
          {filteredJobs.map((job, index) => (
            <div
              key={job.vacancyId}
              onClick={() => {
                setSelectedJob(job);
                setShowSidebar(true);
              }}
              className={`group grid grid-cols-12 gap-4 px-8 py-6 cursor-pointer transition-all hover:bg-blue-100 border-b border-gray-200 ${
                index === filteredJobs.length - 1 ? "border-b-0" : ""
              }`}
            >
              {/* Job */}
              <div className="col-span-5 flex items-start gap-4">
                {/* Symbol */}
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-lg shrink-0 ">
                  {job.title.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-[15px] leading-tight group-hover:text-blue-700 transition-colors">
                    {job.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-3 flex-wrap">
                    {job.missingSkills.length > 0 ? (
                      <div className="flex items-center gap-1.5 text-red-500 text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />

                        <span>{job.missingSkills.length} missing skills</span>
                      </div>
                    ) : (
                      <div className="text-emerald-600 text-sm font-medium">
                        Perfect skill alignment
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div className="col-span-3 flex items-center">
                <div className="flex items-center gap-2 text-gray-700">
                  <Building2 className="w-4 h-4 text-gray-400" />

                  <span className="font-medium">{job.organizationName}</span>
                </div>
              </div>

              {/* Match */}
              <div className="col-span-2 flex items-center justify-center">
                <div
                  className={`min-w-[110px] px-4 py-2 rounded-2xl text-sm font-semibold text-center border ${
                    job.requirementFit >= 75
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : job.requirementFit >= 50
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {job.requirementFit}% Match
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-3">
                <button
                  onClick={(e) => handleApply(e, job)}
                  disabled={applyingId === job.vacancyId}
                  className="h-11 px-5 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50"
                >
                  {applyingId === job.vacancyId ? "Applying..." : "Apply"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <JobsDetailsSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        job={selectedJob}
      />
    </div>
  );
}
