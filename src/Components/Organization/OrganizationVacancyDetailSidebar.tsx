import {
  X,
  Briefcase,
  GraduationCap,
  CalendarDays,
  BookOpen,
  Sparkles,
} from "lucide-react";

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vacancy: MyVacancy | null;
}

export default function OrganizationVacancyDetailSidebar({
  isOpen,
  onClose,
  vacancy,
}: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 h-screen ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-2xl overflow-hidden bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 shrink-0 border-b border-gray-200 bg-white/95 px-6 py-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 shadow-sm">
                  <Briefcase className="h-7 w-7 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Vacancy Details
                  </p>

                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                    {vacancy?.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center  bg-white text-gray-500 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6 pb-10">
              {/* Description */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Description
                </h3>

                <p className="leading-7 text-gray-600">
                  {vacancy?.description}
                </p>
              </div>

              {/* Education */}
              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />

                  <h3 className="font-semibold text-gray-900">
                    Education Requirement
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Education Level</p>

                    <p className="font-medium text-gray-900">
                      {vacancy?.requiredEducationLevel}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Field of Study</p>

                    <p className="font-medium text-gray-900">
                      {vacancy?.requiredFieldOfStudy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />

                  <h3 className="font-semibold text-gray-900">
                    Required Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {vacancy?.requiredSkills?.length ? (
                    vacancy.requiredSkills.map((skill) => (
                      <span
                        key={skill.skillId}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                      >
                        {skill.skillName}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No required skills</p>
                  )}
                </div>
              </div>

              {/* Optional Skills */}
              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />

                  <h3 className="font-semibold text-gray-900">
                    Optional Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {vacancy?.optionalSkills?.length ? (
                    vacancy.optionalSkills.map((skill) => (
                      <span
                        key={skill.skillId}
                        className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                      >
                        {skill.skillName}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No optional skills</p>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-green-600" />

                  <h3 className="font-semibold text-gray-900">
                    Vacancy Timeline
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Published Date</p>

                    <p className="font-medium text-gray-900">
                      {vacancy?.publishedAt
                        ? new Date(vacancy.publishedAt).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Application Deadline
                    </p>

                    <p className="font-medium text-gray-900">
                      {vacancy?.applicationDeadline
                        ? new Date(
                            vacancy.applicationDeadline,
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                        vacancy?.isDeadlinePassed
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {vacancy?.isDeadlinePassed ? "Closed" : "Open"}
                    </span>
                  </div>

                  {!vacancy?.isDeadlinePassed && (
                    <div>
                      <p className="text-sm text-gray-500">Remaining</p>

                      <p className="font-medium text-green-600">
                        {vacancy?.daysRemaining} days remaining
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
