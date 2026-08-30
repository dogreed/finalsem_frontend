import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function Analytics() {
  const applicationsPerJob = [
    { job: 'React Dev', applications: 45 },
    { job: 'Full Stack', applications: 67 },
    { job: 'DevOps', applications: 32 },
    { job: 'Backend', applications: 28 },
    { job: 'UI/UX', applications: 51 },
  ];

  const stackDistribution = [
    { name: 'Full Stack', value: 35 },
    { name: 'Frontend', value: 28 },
    { name: 'Backend', value: 22 },
    { name: 'DevOps', value: 10 },
    { name: 'Mobile', value: 5 },
  ];

  const applicationsOverTime = [
    { date: 'Feb 1', applications: 12 },
    { date: 'Feb 8', applications: 19 },
    { date: 'Feb 15', applications: 28 },
    { date: 'Feb 22', applications: 35 },
    { date: 'Mar 1', applications: 42 },
  ];

  const aptitudeScores = [
    { range: '0-20', count: 5 },
    { range: '20-40', count: 12 },
    { range: '40-60', count: 35 },
    { range: '60-80', count: 87 },
    { range: '80-100', count: 48 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Insights and metrics about your recruitment process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Applications per Job</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsPerJob}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="job" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Stack Distribution of Applicants</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stackDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stackDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Applications Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Average Aptitude Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aptitudeScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Average Match Rate</h3>
          <p className="text-4xl font-bold text-blue-600">78%</p>
          <p className="text-sm text-gray-500 mt-1">Across all applications</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Average Aptitude Score</h3>
          <p className="text-4xl font-bold text-green-600">82%</p>
          <p className="text-sm text-gray-500 mt-1">All candidates</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Shortlist Rate</h3>
          <p className="text-4xl font-bold text-purple-600">24%</p>
          <p className="text-sm text-gray-500 mt-1">Of total applications</p>
        </div>
      </div>
    </div>
  );
}
