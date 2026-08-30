import { Search } from "lucide-react";

const applications = [
  { candidate: "Alice Johnson", job: "Senior React Developer", org: "TechCorp", match: 92, aptitude: 87, status: "Pending", date: "Mar 5, 2026" },
  { candidate: "Bob Smith", job: "Data Scientist", org: "DataFlow", match: 85, aptitude: 72, status: "Active", date: "Mar 4, 2026" },
  { candidate: "Carol White", job: "DevOps Engineer", org: "CloudScale", match: 78, aptitude: 65, status: "Pending", date: "Mar 3, 2026" },
  { candidate: "Dan Brown", job: "Backend Developer", org: "ServerPro", match: 95, aptitude: 91, status: "Active", date: "Mar 2, 2026" },
  { candidate: "Eve Davis", job: "UI/UX Designer", org: "DesignHub", match: 88, aptitude: 78, status: "Suspended", date: "Mar 1, 2026" },
  { candidate: "Frank Miller", job: "ML Engineer", org: "DataFlow", match: 82, aptitude: 83, status: "Active", date: "Feb 28, 2026" },
  { candidate: "Grace Lee", job: "Full Stack Developer", org: "FinEdge", match: 76, aptitude: 69, status: "Pending", date: "Feb 27, 2026" },
];

function StatusBadge({ status }: { status: string }) {
  let color = "";

  if (status === "Active") color = "bg-green-100 text-green-700";
  else if (status === "Pending") color = "bg-yellow-100 text-yellow-700";
  else if (status === "Suspended") color = "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
      {status}
    </span>
  );
}

export default function TotalApplications() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all job applications across the platform
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search applications..."
            className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select className="border rounded-md px-3 py-2 text-sm w-[140px]">
          <option>Stack</option>
          <option>React</option>
          <option>Python</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm w-[160px]">
          <option>Organization</option>
          <option>TechCorp</option>
          <option>DataFlow</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm w-[140px]">
          <option>Match %</option>
          <option>90%+</option>
          <option>80%+</option>
          <option>70%+</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Candidate</th>
                <th className="p-3">Job Title</th>
                <th className="p-3">Organization</th>
                <th className="p-3">Match %</th>
                <th className="p-3">Aptitude</th>
                <th className="p-3">Status</th>
                <th className="p-3">Applied</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((a, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{a.candidate}</td>
                  <td className="p-3">{a.job}</td>
                  <td className="p-3">{a.org}</td>

                  <td className="p-3 font-medium">
                    <span
                      className={
                        a.match >= 90
                          ? "text-green-600"
                          : a.match >= 80
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }
                    >
                      {a.match}%
                    </span>
                  </td>

                  <td className="p-3">{a.aptitude}%</td>

                  <td className="p-3">
                    <StatusBadge status={a.status} />
                  </td>

                  <td className="p-3 text-gray-500">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}