import React from "react";
import { Eye, Edit, Plus } from "lucide-react";

const stacks = [
  { name: "React", questions: 120, tests: 3240 },
  { name: "Python", questions: 95, tests: 2810 },
  { name: "Node.js", questions: 80, tests: 1950 },
  { name: "Java", questions: 110, tests: 2100 },
  { name: "DevOps", questions: 65, tests: 890 },
  { name: "Data Science", questions: 88, tests: 1560 },
];

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm rounded-md border bg-white hover:bg-gray-100 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default function AptitudeTests() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Aptitude Tests</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage test stacks and structure
          </p>
        </div>

        <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 border-none">
          <Plus className="w-4 h-4" />
          Create New Test Stack
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Stack Name</th>
                <th className="p-3">Total Questions</th>
                <th className="p-3">Tests Taken</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {stacks.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-1 rounded-full">
                      {s.name}
                    </span>
                  </td>

                  <td className="p-3">{s.questions}</td>

                  <td className="p-3">{s.tests.toLocaleString()}</td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                        <Eye className="w-4 h-4" />
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