import {
  X,
  Briefcase,
  User,
  CalendarDays,
  Sparkles,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import type { MyApplication } from "../../api/student/StudentsVacancy/get-vacancy-applied-applications";

interface AppliedJobsDetailSidebarProps {
  application: MyApplication | null;
  onClose: () => void;
}

export default function AppliedJobsDetailSidebar({
  application,
  onClose,
}: AppliedJobsDetailSidebarProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "under_review":
        return (
          <span className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit">
            <Eye className="w-4 h-4" />
            <span>Under Review</span>
          </span>
        );

      case "interview":
        return (
          <span className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium w-fit">
            <CheckCircle className="w-4 h-4" />
            <span>Interview Scheduled</span>
          </span>
        );

      case "rejected":
        return (
          <span className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium w-fit">
            <XCircle className="w-4 h-4" />
            <span>Not Selected</span>
          </span>
        );

      case "pending":
      case "applied":
        return (
          <span className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium w-fit">
            <Clock className="w-4 h-4" />
            <span>Pending</span>
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          application
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-screen w-full max-w-xl flex-col border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 ${
          application ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {application && (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-200 bg-white/90 px-6 py-5 backdrop-blur-md">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View complete application information
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <Briefcase className="h-7 w-7" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {application.vacancyTitle}
                      </h3>

                      <div className="mt-3">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-600" />

                      <h4 className="font-semibold text-gray-900">
                        Student Information
                      </h4>
                    </div>

                    <p className="text-gray-700">{application.studentName}</p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-green-600" />

                      <h4 className="font-semibold text-gray-900">
                        Application Date
                      </h4>
                    </div>

                    <p className="text-gray-700">
                      {new Date(application.appliedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-purple-600" />

                      <h4 className="font-semibold text-gray-900">
                        Match Analysis
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-gray-600">Requirement Fit</span>

                          <span className="font-semibold text-gray-900">
                            {application.matchSnapshot.requirementFit}%
                          </span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${application.matchSnapshot.requirementFit}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-gray-600">Optional Fit</span>

                          <span className="font-semibold text-gray-900">
                            {application.matchSnapshot.optionalFit}%
                          </span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${application.matchSnapshot.optionalFit}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-gray-600">Education Bonus</span>

                          <span className="font-semibold text-gray-900">
                            {application.matchSnapshot.educationBonus}%
                          </span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-purple-500"
                            style={{
                              width: `${application.matchSnapshot.educationBonus}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <h4 className="mb-4 font-semibold text-gray-900">
                      Missing Skills
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {application.matchSnapshot.missingSkills.length > 0 ? (
                        application.matchSnapshot.missingSkills.map(
                          (skill, index) => (
                            <span
                              key={index}
                              className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600"
                            >
                              {skill}
                            </span>
                          ),
                        )
                      ) : (
                        <span className="font-medium text-green-600">
                          No Missing Skills
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
