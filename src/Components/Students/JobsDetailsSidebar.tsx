import {
  X,
  Building2,
  AlertCircle,
  GraduationCap,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

import { applyForApplication } from "../../api/student/StudentsVacancy/apply-for-application";
import { useToast } from "../../hooks/useToasts";
import { type VacancyMatch } from "../../api/student/StudentsVacancy/get-vacancy-match";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  job: VacancyMatch | null;
}

export default function JobsDetailsSidebar({ isOpen, onClose, job }: Props) {
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(false);

  if (!job) return null;

  const handleApply = async () => {
    try {
      setLoading(true);

      await applyForApplication({
        vacancyId: job.vacancyId,
      });

      showSuccess("Application submitted successfully!");
    } catch (error: any) {
      console.error(error);

      showError(
        error?.response?.data?.message || "Failed to apply for vacancy",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[520px] bg-white shadow-2xl z-50 transition-all duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white shrink-0 h-16">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Title */}
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h3>

          {/* Organization */}
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Building2 className="w-5 h-5" />

            <p className="text-lg font-medium">{job.organizationName}</p>
          </div>

          {/* Eligibility */}
          <div
            className={`mb-6 p-4 rounded-xl border ${
              job.isEligible
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              {job.isEligible ? (
                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              ) : (
                <ShieldX className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              )}

              <div>
                <p
                  className={`font-semibold ${
                    job.isEligible ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {job.isEligible
                    ? "Eligible for this position"
                    : "Not Eligible"}
                </p>

                {!job.isEligible && (
                  <p className="text-sm text-red-600 mt-1">
                    {job.eligibilityMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Requirement Fit</span>

              <span className="font-semibold text-gray-900">
                {job.requirementFit}%
              </span>
            </div>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  job.requirementFit >= 75
                    ? "bg-linear-to-r from-green-500 to-emerald-500"
                    : job.requirementFit >= 50
                      ? "bg-linear-to-r from-blue-500 to-cyan-500"
                      : "bg-linear-to-r from-yellow-500 to-orange-500"
                }`}
                style={{
                  width: `${job.requirementFit}%`,
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-blue-600" />

                <p className="text-sm font-medium text-blue-700">
                  Optional Fit
                </p>
              </div>

              <p className="text-2xl font-bold text-blue-900">
                {job.optionalFit}%
              </p>
            </div> */}

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-purple-600" />

                <p className="text-sm font-medium text-purple-700">
                  Education Bonus
                </p>
              </div>

              <p className="text-2xl font-bold text-purple-900">
                {job.educationBonus}%
              </p>
            </div>
          </div>

          {/* Missing Skills */}
          {job.missingSkills.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />

                <p className="font-semibold text-red-800">Missing Skills</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={loading}
            className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>
    </>
  );
}
