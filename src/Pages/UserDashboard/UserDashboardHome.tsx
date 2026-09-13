import {
  Award,
  Briefcase,
  CheckCircle,
  Target,
  TrendingUp,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { StudentDashboardProfile } from "../../api/student/dashboard/student-dashboard";
import { getVacancyMatches } from "../../api/student/StudentsVacancy/get-vacancy-match";

interface VacancyMatch {
  vacancyId: number;
  title: string;
  organizationName: string;
  isEligible: boolean;
  eligibilityMessage: string | null;
  requirementFit: number;
  optionalFit: number;
  educationBonus: number;
  missingSkills: string[];
}

interface DashboardProfileResponse {
  totalScore: number;
  hasFullName: boolean;
  hasPhoto: boolean;
  hasPhoneNumber: boolean;
  hasEducation: boolean;
  skillPoints: number;
  hasResume: boolean;
  hasGitHub: boolean;
  hasPortfolio: boolean;
  hasLinkedIn: boolean;
  hasBio: boolean;
  hasNationality: boolean;
  totalApplicationApplied: number;
  totalTestsAttempted: number;
}

export default function UserDashboardHome() {
  const user = localStorage.getItem("userS");
  const parsedUserO = user ? JSON.parse(user) : null;
  const userName = parsedUserO?.fullName || "Student";

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardProfileResponse | null>(
    null,
  );

  const [jobRecommendations, setJobRecommendations] = useState<VacancyMatch[]>(
    [],
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      const [dashboardResponse, matchesResponse] = await Promise.all([
        StudentDashboardProfile(),
        getVacancyMatches(),
      ]);

      setDashboard(dashboardResponse);

      setJobRecommendations(matchesResponse.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" p-4 pt-0">
      {/* HEADER */}
      <div className="mb-7">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Welcome back, {userName}!
        </h1>

        <p className="text-gray-600">
          Here's what's happening with your job search today
        </p>
      </div>

      {/* STATS */}
      <div className="mb-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Profile Completion */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <div className="rounded-xl bg-blue-100 p-3">
              <Target className="h-6 w-6 text-blue-600" />
            </div>

            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>

          <h3 className="mb-2 text-sm font-medium text-gray-600">
            Profile Completion
          </h3>

          <p className="text-3xl font-bold text-gray-900">
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
            ) : (
              `${dashboard?.totalScore || 0}%`
            )}
          </p>
        </div>

        {/* Aptitude Tests */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <div className="rounded-xl bg-purple-100 p-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>

            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>

          <h3 className="mb-2 text-sm font-medium text-gray-600">
            Tests Attempted
          </h3>

          <p className="text-3xl font-bold text-gray-900">
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin text-purple-600" />
            ) : (
              dashboard?.totalTestsAttempted || 0
            )}
          </p>
        </div>

        {/* Recommended Jobs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <div className="rounded-xl bg-cyan-100 p-3">
              <Briefcase className="h-6 w-6 text-cyan-600" />
            </div>
          </div>

          <h3 className="mb-2 text-sm font-medium text-gray-600">
            Recommended Jobs
          </h3>

          <p className="text-3xl font-bold text-gray-900">
            {jobRecommendations.length}
          </p>
        </div>

        {/* Applications Sent */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <div className="rounded-xl bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <h3 className="mb-2 text-sm font-medium text-gray-600">
            Applications Sent
          </h3>

          <p className="text-3xl font-bold text-gray-900">
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin text-green-600" />
            ) : (
              dashboard?.totalApplicationApplied || 0
            )}
          </p>
        </div>
      </div>

      {/* TEST BANNER */}
      <div className="mb-7 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 p-6 text-white">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              Take Aptitude Test to Increase Your Ranking!
            </h3>

            <p className="text-blue-100">
              Complete our stack-based test to unlock more job recommendations
            </p>
          </div>

          <button
            onClick={() => navigate("/user/aptitude-test")}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:shadow-xl"
          >
            Start Test
          </button>
        </div>
      </div>

      {/* JOBS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Recommended Jobs
          </h2>

          <button
            onClick={() => navigate("/user/jobs")}
            className="flex items-center space-x-1 font-medium text-blue-600 hover:text-blue-700"
          >
            <span>View All</span>

            <ExternalLink className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {jobRecommendations.map((job) => {
            const matchPercentage =
              job.requirementFit + job.optionalFit + job.educationBonus;

            return (
              <div
                key={job.vacancyId}
                className="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>

                    <p className="text-gray-600">{job.organizationName}</p>

                    {!job.isEligible && job.eligibilityMessage && (
                      <p className="mt-3 text-sm font-medium text-red-500">
                        {job.eligibilityMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start md:items-end">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        matchPercentage >= 80
                          ? "bg-green-100 text-green-700"
                          : matchPercentage >= 60
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {matchPercentage}% Match
                    </span>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {job.missingSkills.length > 0 ? (
                    job.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                      All required skills matched
                    </span>
                  )}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full ${
                          matchPercentage >= 80
                            ? "bg-linear-to-r from-green-500 to-emerald-500"
                            : matchPercentage >= 60
                              ? "bg-linear-to-r from-blue-500 to-cyan-500"
                              : "bg-linear-to-r from-yellow-500 to-orange-500"
                        }`}
                        style={{
                          width: `${Math.min(matchPercentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/user/jobs/`)}
                    className="rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-2.5 font-medium text-white transition-all hover:shadow-lg"
                  >
                    View Job
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
