import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const userGrowth = [
  { month: "Sep", users: 8200 },
  { month: "Oct", users: 9100 },
  { month: "Nov", users: 9800 },
  { month: "Dec", users: 10400 },
  { month: "Jan", users: 11200 },
  { month: "Feb", users: 11900 },
  { month: "Mar", users: 12450 },
];

const jobsPerMonth = [
  { month: "Sep", jobs: 180 },
  { month: "Oct", jobs: 220 },
  { month: "Nov", jobs: 260 },
  { month: "Dec", jobs: 195 },
  { month: "Jan", jobs: 310 },
  { month: "Feb", jobs: 340 },
  { month: "Mar", jobs: 380 },
];

const stackDist = [
  { name: "React", value: 35 },
  { name: "Python", value: 25 },
  { name: "Node.js", value: 18 },
  { name: "Java", value: 12 },
  { name: "DevOps", value: 10 },
];

const aptitudeByStack = [
  { stack: "React", score: 78 },
  { stack: "Python", score: 72 },
  { stack: "Node.js", score: 75 },
  { stack: "Java", score: 80 },
  { stack: "DevOps", score: 68 },
];

const appsTrend = [
  { month: "Sep", apps: 1200 },
  { month: "Oct", apps: 1500 },
  { month: "Nov", apps: 1800 },
  { month: "Dec", apps: 1400 },
  { month: "Jan", apps: 2200 },
  { month: "Feb", apps: 2600 },
  { month: "Mar", apps: 2900 },
];

const COLORS = [
  "hsl(220,70%,50%)",
  "hsl(172,66%,50%)",
  "hsl(38,92%,50%)",
  "hsl(0,72%,51%)",
  "hsl(280,60%,50%)",
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Platform Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Key metrics and trends
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">
            User Growth Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(220,70%,50%)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Jobs Posted Per Month
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={jobsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar
                dataKey="jobs"
                fill="hsl(172,66%,50%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Stack Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stackDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                // label={({ name, percent }) =>
                //   `${name} ${(percent * 100).toFixed(0)}%`
                // }
                fontSize={11}
              >
                {stackDist.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Average Aptitude Scores by Stack
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={aptitudeByStack}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="stack" fontSize={12} />
              <YAxis fontSize={12} domain={[0, 100]} />
              <Tooltip />
              <Bar
                dataKey="score"
                fill="hsl(220,70%,50%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 lg:col-span-2">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Applications Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={appsTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="apps"
                stroke="hsl(172,66%,50%)"
                fill="hsl(172,66%,50%)"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
