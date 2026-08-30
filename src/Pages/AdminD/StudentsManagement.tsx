import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Loader2 } from "lucide-react";
import {
  getStudents,
  type StudentResponse,
} from "../../api/admin/manage-Students/get-students";
import { educationLevels } from "../../constants/educationLevels";
import UserDetailsSidebar from "../../Components/Admin/UserDetailsSidebar";

export default function StudentsManagement() {
  const [students, setStudents] = useState<StudentResponse[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [profileOpen, setProfileOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<StudentResponse | null>(
    null,
  );

  const [selectedEducation, setSelectedEducation] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();

        setStudents(data);
      } catch (error) {
        console.error("Students fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const getEducationLevel = (level: number | null) => {
    if (!level) return "Not Added";

    return (
      educationLevels.find((item) => item.value === level)?.label || "Unknown"
    );
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchesEducation =
        selectedEducation === "all"
          ? true
          : String(student.educationLevel) === selectedEducation;

      return matchesSearch && matchesEducation;
    });
  }, [students, search, selectedEducation]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          Students Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage all registered students
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="h-11 w-[280px] rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <select
          value={selectedEducation}
          onChange={(e) => setSelectedEducation(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="all">All Education Levels</option>

          {educationLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Full Name
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Education Level
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Total Tests
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Total Applications
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.studentId}
                    onClick={() => {
                      setSelectedUser(student);
                      setProfileOpen(true);
                    }}
                    className="border-b border-gray-100 transition hover:bg-blue-100 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
        flex h-10 w-10 items-center justify-center rounded-full  bg-blue-500 font-bold text-white
      "
                        >
                          {student.fullName?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {student.fullName}
                          </p>

                          <p className="text-xs text-gray-500">
                            User ID #{student.userId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{student.email}</td>

                    <td className="px-6 py-4">
                      <span className="inline-flex h-8 min-w-[110px] items-center justify-center rounded-full bg-blue-100 px-3 text-xs font-semibold text-blue-700">
                        {getEducationLevel(student.educationLevel)}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700  text-center">
                      {student.totalTests}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700 text-center">
                      {student.totalApplications}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer "
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("helllo my boy");
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserDetailsSidebar
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
