import { useEffect, useState } from "react";

import {
  Users,
  Building2,
  Briefcase,
  FileText,
  Brain,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

import {
  getDashboard,
  type DashboardResponse,
} from "../../api/admin/dashboard/get-dashboard-stats";

const statStyles = {
  students: {
    border: "from-blue-700 via-blue-500 to-cyan-400",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    badge: "text-blue-600",
    glow: "bg-blue-100/40",
  },

  organizations: {
    border: "from-indigo-700 via-indigo-500 to-blue-400",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
    badge: "text-indigo-600",
    glow: "bg-indigo-100/40",
  },

  vacancies: {
    border: "from-sky-700 via-sky-500 to-cyan-400",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
    badge: "text-sky-600",
    glow: "bg-sky-100/40",
  },

  applications: {
    border: "from-cyan-700 via-cyan-500 to-blue-400",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-700",
    badge: "text-cyan-600",
    glow: "bg-cyan-100/40",
  },

  tests: {
    border: "from-blue-900 via-blue-700 to-indigo-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-900",
    badge: "text-blue-700",
    glow: "bg-blue-200/40",
  },
};

function StatCard({
  icon: Icon,
  title,
  value,
  styles,
}: {
  icon: any;
  title: string;
  value: number;
  styles: any;
}) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-blue-100
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(37,99,235,0.06)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_35px_rgba(37,99,235,0.12)]
      "
    >
      {/* LEFT BORDER */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1.5
          bg-linear-to-b ${styles.border}
        `}
      />

      {/* GLOW */}
      <div
        className={`
          absolute -right-10 -top-10 h-32 w-32
          rounded-full blur-3xl
          ${styles.glow}
        `}
      />

      <div className="relative flex items-start justify-between p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            {value.toLocaleString()}
          </h2>
        </div>

        <div
          className={`
            flex h-14 w-14 items-center justify-center
            rounded-2xl ${styles.iconBg}
          `}
        >
          <Icon className={`h-6 w-6 ${styles.iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();

        setDashboard(response);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const chartData = [
    {
      name: "Students",
      value: dashboard?.totalStudents || 0,
    },
    {
      name: "Organizations",
      value: dashboard?.verifiedOrganizations || 0,
    },
    {
      name: "Vacancies",
      value: dashboard?.totalVacancies || 0,
    },
    {
      name: "Applications",
      value: dashboard?.totalApplications || 0,
    },
    {
      name: "Tests",
      value: dashboard?.studentsAttemptedTest || 0,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600" />

          <p className="text-sm font-medium text-blue-700">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff] ">
      <div className="mx-auto max-w-[1700px] space-y-6">
        {/* HERO */}
        <div
          className="
          relative overflow-hidden rounded-2xl
          bg-linear-to-br from-blue-700 via-blue-600 to-cyan-500
          px-4 py-2
          md:px-4 md:py-4
          shadow-[0_20px_60px_rgba(37,99,235,0.25)]
        "
        >
          <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                <div className="h-2 w-2 rounded-full bg-cyan-300" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                  Admin Analytics
                </span>
              </div>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-white md:text-4xl">
                Platform Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-100">
                Monitor organizations, students, vacancies, applications, and
                assessments with a modern admin analytics experience.
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={Users}
            title="Students"
            value={dashboard?.totalStudents || 0}
            styles={statStyles.students}
          />

          <StatCard
            icon={Building2}
            title="Organizations"
            value={dashboard?.verifiedOrganizations || 0}
            styles={statStyles.organizations}
          />

          <StatCard
            icon={Briefcase}
            title="Vacancies"
            value={dashboard?.totalVacancies || 0}
            styles={statStyles.vacancies}
          />

          <StatCard
            icon={FileText}
            title="Applications"
            value={dashboard?.totalApplications || 0}
            styles={statStyles.applications}
          />

          <StatCard
            icon={Brain}
            title="Tests"
            value={dashboard?.studentsAttemptedTest || 0}
            styles={statStyles.tests}
          />
        </div>

        {/* CHART */}
        <div
          className="
          overflow-hidden rounded-[32px]
          border border-blue-100
          bg-white
          shadow-[0_4px_30px_rgba(37,99,235,0.06)]
        "
        >
          {/* HEADER */}
          <div
            className="
            flex flex-col gap-4 border-b border-blue-100
            bg-linear-to-r from-blue-50 to-cyan-50
            px-6 py-5
            md:flex-row md:items-center md:justify-between
          "
          >
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                Platform Statistics
              </h2>

              <p className="mt-1 text-sm text-blue-600">
                Overall analytics and system activity overview
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl border border-green-200 bg-white px-4 py-2 text-xs font-semibold text-green-700 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Live Analytics
            </div>
          </div>

          {/* CHART */}
          <div className="h-[400px] w-full px-4 py-5 md:px-6 md:py-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap={30}>
                <CartesianGrid
                  vertical={false}
                  stroke="#dbeafe"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#64748b",
                    fontWeight: 600,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(37,99,235,0.05)",
                  }}
                  contentStyle={{
                    borderRadius: "18px",
                    border: "1px solid #dbeafe",
                    boxShadow: "0 12px 40px rgba(37,99,235,0.08)",
                    fontSize: "12px",
                  }}
                />

                <Bar dataKey="value" radius={[14, 14, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
