import {
  Users,
  FileText,
  UserCheck,
  XCircle,
  Loader2,
  Building2,
  Globe,
  TrendingUp,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import {
  getOrganizationDashboard,
  type OrganizationDashboardResponse,
} from "../../api/organization/dashboard/get-organization-dashboard";

export default function OrganizationDashboardHome() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] =
    useState<OrganizationDashboardResponse | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getOrganizationDashboard();

      setDashboard(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(
    () => [
      {
        label: "Total Vacancies Posted",
        value: dashboard?.totalVacanciesPosted || 0,
        icon: FileText,
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        textColor: "text-blue-700",
        border: "border-blue-200",
      },
      {
        label: "Applications Received",
        value: dashboard?.totalApplicationsReceived || 0,
        icon: Users,
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        textColor: "text-green-700",
        border: "border-green-200",
      },
      {
        label: "Applications Offered",
        value: dashboard?.applicationsOffered || 0,
        icon: UserCheck,
        bg: "bg-purple-50",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        textColor: "text-purple-700",
        border: "border-purple-200",
      },
      {
        label: "Applications Rejected",
        value: dashboard?.applicationsRejected || 0,
        icon: XCircle,
        bg: "bg-red-50",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        textColor: "text-red-700",
        border: "border-red-200",
      },
    ],
    [dashboard],
  );

  const chartData = useMemo(() => {
    return [
      {
        label: "Vacancies",
        value: dashboard?.totalVacanciesPosted || 0,
        color: "bg-blue-500",
      },
      {
        label: "Applications",
        value: dashboard?.totalApplicationsReceived || 0,
        color: "bg-green-500",
      },
      {
        label: "Offered",
        value: dashboard?.applicationsOffered || 0,
        color: "bg-purple-500",
      },
      {
        label: "Rejected",
        value: dashboard?.applicationsRejected || 0,
        color: "bg-red-500",
      },
    ];
  }, [dashboard]);

  const maxValue = Math.max(...chartData.map((item) => item.value), 1);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-linear-to-r from-blue-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
              {dashboard?.logoUrl ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${dashboard.logoUrl}`}
                  alt={dashboard.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 className="h-8 w-8 text-white" />
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">
                Organization Dashboard
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight">
                Welcome back, {dashboard?.name}
              </h1>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Monitor recruitment performance and manage hiring activity with
                real-time organization insights.
              </p>
            </div>
          </div>

          {dashboard?.websiteUrl && (
            <a
              href={dashboard.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-fit items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/20"
            >
              <Globe className="h-5 w-5" />
              View Website
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-3xl border ${stat.border} ${stat.bg} p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>

                <h3 className="mt-3 text-4xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg}`}
              >
                <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Graph */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recruitment Analytics
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Overview of organization recruitment performance
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 text-green-700">
              <TrendingUp className="h-4 w-4" />

              <span className="text-sm font-medium">Live Insights</span>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-3xl border border-gray-100 bg-linear-to-b from-gray-50 to-white p-6">
            <div className="flex h-[340px] items-end justify-between gap-5">
              {chartData.map((item) => {
                const height = `${(item.value / maxValue) * 100}%`;

                return (
                  <div
                    key={item.label}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    {/* Value */}
                    <div className="mb-3 text-center">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700">
                        {item.value}
                      </span>
                    </div>

                    {/* Bar Area */}
                    <div className="relative flex h-[250px] items-end rounded-[24px] bg-white p-2 shadow-inner">
                      {/* Background Grid */}
                      <div className="absolute inset-0 flex flex-col justify-between p-2">
                        <div className="border-t border-dashed border-gray-200" />
                        <div className="border-t border-dashed border-gray-200" />
                        <div className="border-t border-dashed border-gray-200" />
                        <div className="border-t border-dashed border-gray-200" />
                      </div>

                      {/* Bar */}
                      <div
                        style={{ height }}
                        className={`relative z-10 w-full rounded-[20px] shadow-lg transition-all duration-500 hover:scale-[1.02] hover:opacity-90 ${item.color}`}
                      >
                        {/* Glow */}
                        <div className="absolute inset-x-2 top-2 h-8 rounded-full bg-white/20 blur-md" />
                      </div>
                    </div>

                    {/* Label */}
                    <p className="mt-4 text-center text-sm font-semibold text-gray-700">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Recruitment Summary
          </h2>

          <div className="mt-8 space-y-5">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm text-blue-700">Success Rate</p>

              <h3 className="mt-2 text-3xl font-bold text-blue-900">
                {dashboard?.totalApplicationsReceived
                  ? Math.round(
                      ((dashboard.applicationsOffered || 0) /
                        dashboard.totalApplicationsReceived) *
                        100,
                    )
                  : 0}
                %
              </h3>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
              <p className="text-sm text-red-700">Rejection Rate</p>

              <h3 className="mt-2 text-3xl font-bold text-red-900">
                {dashboard?.totalApplicationsReceived
                  ? Math.round(
                      ((dashboard.applicationsRejected || 0) /
                        dashboard.totalApplicationsReceived) *
                        100,
                    )
                  : 0}
                %
              </h3>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
              <p className="text-sm text-green-700">
                Average Applications Per Vacancy
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-900">
                {dashboard?.totalVacanciesPosted
                  ? (
                      (dashboard.totalApplicationsReceived || 0) /
                      dashboard.totalVacanciesPosted
                    ).toFixed(1)
                  : 0}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
