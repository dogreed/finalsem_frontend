import { Clock, CheckCircle, XCircle, Eye, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getMyApplications,
  type MyApplication,
} from "../../api/student/StudentsVacancy/get-vacancy-applied-applications";
import AppliedJobsDetailSidebar from "../../Components/Students/AppliedJobsDetailSidebar";

export default function AppliedJobs() {
  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedApplication, setSelectedApplication] =
    useState<MyApplication | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const data = await getMyApplications();

      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "applied":
        return (
          <span className="flex w-fit items-center space-x-2 rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            <Clock className="h-4 w-4" />

            <span>Pending</span>
          </span>
        );

      case "underreview":
      case "under_review":
      case "under review":
        return (
          <span className="flex w-fit items-center space-x-2 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            <Eye className="h-4 w-4" />

            <span>Under Review</span>
          </span>
        );

      case "shortlisted":
        return (
          <span className="flex w-fit items-center space-x-2 rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
            <CheckCircle className="h-4 w-4" />

            <span>Shortlisted</span>
          </span>
        );

      case "offered":
        return (
          <span className="flex w-fit items-center space-x-2 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            <CheckCircle className="h-4 w-4" />

            <span>Offered</span>
          </span>
        );

      case "rejected":
        return (
          <span className="flex w-fit items-center space-x-2 rounded-full border border-red-200 bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            <XCircle className="h-4 w-4" />

            <span>Rejected</span>
          </span>
        );

      default:
        return (
          <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {status}
          </span>
        );
    }
  };

  const stats = {
    total: applications.length,

    pending: applications.filter(
      (j) =>
        j.status.toLowerCase() === "pending" ||
        j.status.toLowerCase() === "applied",
    ).length,

    underReview: applications.filter(
      (j) =>
        j.status.toLowerCase() === "underreview" ||
        j.status.toLowerCase() === "under_review",
    ).length,

    shortlisted: applications.filter(
      (j) => j.status.toLowerCase() === "shortlisted",
    ).length,

    offered: applications.filter((j) => j.status.toLowerCase() === "offered")
      .length,
  };

  return (
    <div className="p-2">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Applied Jobs</h1>

        <p className="text-gray-600">
          Track the status of your job applications
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-1 text-sm text-gray-600">Total Applications</h3>

          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="mb-1 text-sm text-yellow-700">Pending</h3>

          <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-1 text-sm text-blue-700">Under Review</h3>

          <p className="text-3xl font-bold text-blue-700">
            {stats.underReview}
          </p>
        </div>

        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h3 className="mb-1 text-sm text-purple-700">Shortlisted</h3>

          <p className="text-3xl font-bold text-purple-700">
            {stats.shortlisted}
          </p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h3 className="mb-1 text-sm text-green-700">Offered</h3>

          <p className="text-3xl font-bold text-green-700">{stats.offered}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Position
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Applied Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Match
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Missing Skills
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>

                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading applications...
                    </div>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((job) => (
                  <tr
                    key={job.applicationId}
                    onClick={() => setSelectedApplication(job)}
                    className="hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                          {job.vacancyTitle?.charAt(0).toUpperCase()}
                        </div>

                        <div className="font-semibold text-gray-900">
                          {job.vacancyTitle}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-gray-600">
                        {new Date(job.appliedAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          job.matchSnapshot.optionalFit >= 80
                            ? "bg-green-100 text-green-700"
                            : job.matchSnapshot.optionalFit >= 70
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {job.matchSnapshot.optionalFit}%
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2 max-w-xs">
                        {job.matchSnapshot.missingSkills.length > 0 ? (
                          job.matchSnapshot.missingSkills.map(
                            (skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100"
                              >
                                {skill}
                              </span>
                            ),
                          )
                        ) : (
                          <span className="text-green-600 text-sm font-medium">
                            No Missing Skills
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">{getStatusBadge(job.status)}</td>

                    {/* <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          View Details
                        </button>
                      </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AppliedJobsDetailSidebar
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </div>
  );
}
