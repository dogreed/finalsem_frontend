import { CheckCircle, XCircle } from "lucide-react";

const reports = [
  {
    type: "Spam Job Post",
    entity: "QuickCash Inc.",
    desc: "Suspicious job listing with unrealistic salary claims",
    date: "Mar 5, 2026",
    status: "Pending" as const,
  },
  {
    type: "Inappropriate Content",
    entity: "User: john_doe",
    desc: "Offensive language in profile description",
    date: "Mar 4, 2026",
    status: "Pending" as const,
  },
  {
    type: "Fake Organization",
    entity: "PhantomTech",
    desc: "No website, no social presence, suspected scam",
    date: "Mar 3, 2026",
    status: "Active" as const,
  },
  {
    type: "Duplicate Account",
    entity: "User: alice_j",
    desc: "Multiple accounts from same email domain",
    date: "Mar 2, 2026",
    status: "Pending" as const,
  },
  {
    type: "Misleading Job",
    entity: "StartupXYZ",
    desc: "Job description doesn't match actual role",
    date: "Mar 1, 2026",
    status: "Active" as const,
  },
];

export default function Reports() {
  const getStatusStyle = (status: string) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Reports & Moderation
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and moderate platform reports
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Report Type</th>
                <th>Reported Entity</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((r, i) => (
                <tr key={i}>
                  <td>
                    <span className="bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-full">
                      {r.type}
                    </span>
                  </td>

                  <td className="font-medium text-foreground">{r.entity}</td>

                  <td className="text-muted-foreground max-w-xs truncate">
                    {r.desc}
                  </td>

                  <td className="text-muted-foreground">{r.date}</td>

                  <td>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${getStatusStyle(r.status)}`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 text-green-600 text-sm hover:underline">
                        <CheckCircle className="w-4 h-4" />
                        Resolve
                      </button>

                      <button className="flex items-center gap-1 text-gray-500 text-sm hover:underline">
                        <XCircle className="w-4 h-4" />
                        Ignore
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
