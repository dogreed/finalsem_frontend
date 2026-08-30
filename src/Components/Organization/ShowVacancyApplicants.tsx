import { useEffect, useState } from "react";

import {
  X,
  Users,
  Trophy,
  CalendarDays,
  Loader2,
  FileText,
  ClipboardList,
} from "lucide-react";

import {
  getVacancyApplications,
  type VacancyApplication,
} from "../../api/organization/applications/get-vacancy-applications";

import {
  getRankedApplications,
  type RankedApplicationsResponse,
} from "../../api/organization/applications/get-ranked-applications";

import { updateApplicationStatus } from "../../api/organization/applications/update-application-status";
import { useToast } from "../../hooks/useToasts";

interface Props {
  open: boolean;
  vacancyId: number | null;
  type: "applications" | "ranked";
  onClose: () => void;
}

const applicationStatuses = [
  {
    label: "Applied",
    value: 0,
  },
  {
    label: "Under Review",
    value: 1,
  },
  {
    label: "Shortlisted",
    value: 2,
  },
  {
    label: "Rejected",
    value: 3,
  },
  {
    label: "Offered",
    value: 4,
  },
];

export default function ShowVacancyApplicants({
  open,
  vacancyId,
  type,
  onClose,
}: Props) {
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(false);

  const [applications, setApplications] = useState<VacancyApplication[]>([]);

  const [rankedData, setRankedData] =
    useState<RankedApplicationsResponse | null>(null);

  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);

  useEffect(() => {
    if (!open || !vacancyId) return;

    fetchData();
  }, [open, vacancyId, type]);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (type === "applications") {
        const response = await getVacancyApplications(vacancyId!);

        setApplications(response);
      } else {
        const response = await getRankedApplications(vacancyId!);

        setRankedData(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusValue = (status: string) => {
    switch (status) {
      case "Applied":
        return 0;

      case "UnderReview":
      case "Under Review":
        return 1;

      case "Shortlisted":
        return 2;

      case "Rejected":
        return 3;

      case "Offered":
        return 4;

      default:
        return 0;
    }
  };

  const handleStatusChange = async (
    applicationId: number,
    newStatus: number,
  ) => {
    try {
      setUpdatingStatusId(applicationId);

      await updateApplicationStatus(applicationId, {
        newStatus,
      });

      const statusLabel =
        applicationStatuses.find((status) => status.value === newStatus)
          ?.label || "Applied";

      setApplications((prev) =>
        prev.map((item) => {
          if (item.applicationId !== applicationId) return item;

          return {
            ...item,
            status: statusLabel,
          };
        }),
      );

      showSuccess(`Application status updated to ${statusLabel}`);
    } catch (error) {
      console.error(error);

      showError("Failed to update application status");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {type === "applications"
                  ? "Vacancy Applicants"
                  : "Top Ranked Candidates"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {type === "applications"
                  ? "All students who applied for this vacancy."
                  : "Top ranked students based on matching."}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 transition hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : type === "applications" ? (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-20">
                    <Users className="mb-3 h-10 w-10 text-gray-300" />

                    <h3 className="text-sm font-semibold text-gray-900">
                      No applicants yet
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      No students have applied yet.
                    </p>
                  </div>
                ) : (
                  applications.map((application) => (
                    <div
                      key={application.applicationId}
                      className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                              {application.studentName
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>
                              <h3 className="text-base font-semibold text-gray-900">
                                {application.studentName}
                              </h3>

                              <p className="mt-0.5 text-sm text-gray-500">
                                {application.vacancyTitle}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-700">
                              <ClipboardList className="h-4 w-4 text-blue-600" />

                              <span className="font-medium">
                                Tests: {application.testCount}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-700">
                              <CalendarDays className="h-4 w-4 text-blue-600" />
                              Applied on{" "}
                              {new Date(
                                application.appliedAt,
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex min-w-[180px] flex-col items-end gap-3">
                          <select
                            value={getStatusValue(application.status)}
                            disabled={
                              updatingStatusId === application.applicationId
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                application.applicationId,
                                Number(e.target.value),
                              )
                            }
                            className="w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 outline-none transition-all focus:border-blue-400"
                          >
                            {applicationStatuses.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>

                          {updatingStatusId === application.applicationId && (
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          )}

                          {application.resumeUrl && (
                            <button
                              onClick={() =>
                                setSelectedResume(
                                  `${import.meta.env.VITE_BACKEND_URL}${application.resumeUrl}`,
                                )
                              }
                              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100 hover:shadow-sm"
                            >
                              <FileText className="h-4 w-4" />
                              View Resume
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {rankedData?.candidates?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-20">
                    <Trophy className="mb-3 h-10 w-10 text-gray-300" />

                    <h3 className="text-sm font-semibold text-gray-900">
                      No ranked candidates
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      No ranked data available yet.
                    </p>
                  </div>
                ) : (
                  rankedData?.candidates?.map((candidate) => (
                    <div
                      key={candidate.studentId}
                      className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {candidate.studentName}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Student ID: {candidate.studentId}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-bold text-amber-700">
                              #{candidate.rank}
                            </p>

                            <p className="text-sm text-gray-500">
                              Score: {candidate.rankingScore}
                            </p>
                          </div>

                          {candidate.gitHubUrl && (
                            <a
                              href={candidate.gitHubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {selectedResume && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="relative h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Resume Preview
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Candidate resume preview
                </p>
              </div>

              <button
                onClick={() => setSelectedResume(null)}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="h-[calc(90vh-73px)] w-full bg-gray-100">
              <iframe
                src={selectedResume}
                title="Resume Preview"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
