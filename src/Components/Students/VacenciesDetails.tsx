import {
  X,
  Building2,
  CalendarDays,
  GraduationCap,
  BookOpen,
  Sparkles,
  Briefcase,
  Clock,
} from "lucide-react";

import type { VacancyAll } from "../../api/student/StudentsVacancy/get-all-vacency";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  job: VacancyAll | null;
}

export default function VacenciesDetails({ isOpen, onClose, job }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {job && (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur-md">
              <div className="flex items-start justify-between px-6 py-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
                    <Briefcase className="h-7 w-7" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {job.title}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building2 className="h-4 w-4" />

                        <span>{job.organizationName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Description */}
                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Description
                  </h3>

                  <p className="leading-7 text-gray-600">{job.description}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-blue-600" />

                      <h4 className="font-semibold text-gray-900">
                        Published Date
                      </h4>
                    </div>

                    <p className="text-gray-700">
                      {new Date(job.publishedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-amber-600" />

                      <h4 className="font-semibold text-gray-900">Deadline</h4>
                    </div>

                    <p className="text-gray-700">
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {job.daysRemaining} days remaining
                    </p>
                  </div>

                  <div className="rounded-3xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-emerald-600" />

                      <h4 className="font-semibold text-gray-900">
                        Education Level
                      </h4>
                    </div>

                    <p className="text-gray-700">
                      {job.requiredEducationLevel}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-purple-600" />

                      <h4 className="font-semibold text-gray-900">
                        Field Of Study
                      </h4>
                    </div>

                    <p className="text-gray-700">{job.requiredFieldOfStudy}</p>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="rounded-3xl border border-gray-200 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600" />

                    <h3 className="text-lg font-semibold text-gray-900">
                      Required Skills
                    </h3>
                  </div>

                  {job.requiredSkills.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No required skills listed.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {job.requiredSkills.map((skill) => (
                        <span
                          key={skill.skillId}
                          className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                        >
                          {skill.skillName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Optional Skills */}
                <div className="rounded-3xl border border-gray-200 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-amber-600" />

                    <h3 className="text-lg font-semibold text-gray-900">
                      Optional Skills
                    </h3>
                  </div>

                  {job.optionalSkills.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No optional skills listed.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {job.optionalSkills.map((skill) => (
                        <span
                          key={skill.skillId}
                          className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700"
                        >
                          {skill.skillName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
