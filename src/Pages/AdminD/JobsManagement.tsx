import { useState } from "react";
import { Search, Eye, Trash2, XCircle } from "lucide-react";

const jobs = [
  { title: "Senior React Developer", org: "TechCorp", stack: "React", apps: 45, status: "Open", date: "Mar 5, 2026" },
  { title: "Data Scientist", org: "DataFlow", stack: "Python", apps: 32, status: "Open", date: "Mar 4, 2026" },
  { title: "DevOps Engineer", org: "CloudScale", stack: "DevOps", apps: 28, status: "Closed", date: "Mar 3, 2026" },
  { title: "UI/UX Designer", org: "DesignHub", stack: "Design", apps: 19, status: "Open", date: "Mar 2, 2026" },
  { title: "Backend Developer", org: "ServerPro", stack: "Node.js", apps: 51, status: "Pending", date: "Mar 1, 2026" },
  { title: "ML Engineer", org: "DataFlow", stack: "Python", apps: 38, status: "Open", date: "Feb 28, 2026" },
  { title: "Full Stack Developer", org: "FinEdge", stack: "React", apps: 62, status: "Open", date: "Feb 27, 2026" },
];

function StatusBadge({ status }: { status: string }) {
  let style = "";

  if (status === "Open") style = "bg-green-100 text-green-700";
  else if (status === "Pending") style = "bg-yellow-100 text-yellow-700";
  else if (status === "Closed") style = "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 text-xs rounded-md font-medium ${style}`}>
      {status}
    </span>
  );
}

export default function JobsManagement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof jobs)[0] | null>(null);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Jobs Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all job postings across the platform
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search jobs..."
            className="w-full border rounded-md pl-9 pr-3 py-2 text-sm"
          />
        </div>

        <select className="border rounded-md px-3 py-2 text-sm w-[140px]">
          <option>Stack</option>
          <option>React</option>
          <option>Python</option>
          <option>Node.js</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm w-[160px]">
          <option>Organization</option>
          <option>TechCorp</option>
          <option>DataFlow</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm w-[140px]">
          <option>Status</option>
          <option>Open</option>
          <option>Closed</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Job Title</th>
                <th className="p-3">Organization</th>
                <th className="p-3">Stack</th>
                <th className="p-3">Applications</th>
                <th className="p-3">Status</th>
                <th className="p-3">Posted</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((j, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{j.title}</td>
                  <td className="p-3">{j.org}</td>

                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                      {j.stack}
                    </span>
                  </td>

                  <td className="p-3">{j.apps}</td>

                  <td className="p-3">
                    <StatusBadge status={j.status} />
                  </td>

                  <td className="p-3 text-gray-500">{j.date}</td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setSelected(j);
                          setModalOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                        <XCircle className="w-4 h-4" />
                      </button>

                      <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Job Details</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{selected.title}</h3>
                <p className="text-sm text-gray-500">
                  {selected.org} · {selected.stack}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <StatusBadge status={selected.status} />
                <span className="text-xs text-gray-500">{selected.date}</span>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Job Description</p>
                <p className="text-sm text-gray-500">
                  We are looking for an experienced {selected.title} to join our
                  team at {selected.org}. You will work with technologies in the
                  {selected.stack} ecosystem.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Required Skills</p>
                <div className="flex gap-2 flex-wrap">
                  {[selected.stack, "Git", "REST APIs", "Agile"].map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm font-medium">{selected.apps} Applicants</p>
                <p className="text-xs text-gray-500 mt-1">
                  View all applicants in the Applications page
                </p>
              </div>
            </div>

            <button
              className="mt-6 px-4 py-2 text-sm bg-black text-white rounded-md"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}