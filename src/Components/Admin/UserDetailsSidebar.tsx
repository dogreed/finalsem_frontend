import {
  X,
  Mail,
  GraduationCap,
  Brain,
  FileText,
  BookOpen,
  Sparkles,
} from "lucide-react";

import type { StudentResponse } from "../../api/admin/manage-Students/get-students";

import { educationLevels } from "../../constants/educationLevels";

interface UserDetailsSidebarProps {
  open: boolean;
  onClose: () => void;
  user: StudentResponse | null;
}

export default function UserDetailsSidebar({
  open,
  onClose,
  user,
}: UserDetailsSidebarProps) {
  if (!open || !user) return null;

  const getEducationLevel = (level: number | null) => {
    if (!level) return "Not Added";

    return (
      educationLevels.find((item) => item.value === level)?.label || "Unknown"
    );
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed h-screen w-screen inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* SIDEBAR */}
      <div className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-lg flex-col overflow-hidden border-l border-gray-200 bg-white shadow-2xl">
        {/* HEADER */}
        <div className="border-b border-blue-100 bg-blue-600 p-4  text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-400 bg-white/10 text-3xl font-black text-white">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Student Profile
                </p>

                <h2 className="max-w-[220px] text-2xl font-black leading-tight">
                  {user.fullName}
                </h2>

                <p className="mt-2 text-sm text-blue-100">
                  User ID #{user.userId}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-blue-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="space-y-5">
            {/* EMAIL */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* EDUCATION */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Education Level
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Academic Qualification
                  </p>
                </div>
              </div>

              <span className="inline-flex h-10 min-w-[140px] items-center justify-center rounded-full bg-blue-100 px-5 text-sm font-bold text-blue-700">
                {getEducationLevel(user.educationLevel)}
              </span>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>

                  <Sparkles className="h-4 w-4 text-blue-300" />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Total Tests
                </p>

                <h3 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
                  {user.totalTests}
                </h3>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>

                  <Sparkles className="h-4 w-4 text-blue-300" />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Applications
                </p>

                <h3 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
                  {user.totalApplications}
                </h3>
              </div>
            </div>

            {/* SKILLS */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Skills
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Technical Expertise
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {user.skills?.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center rounded-2xl border border-dashed border-gray-200 py-8">
                    <p className="text-sm text-gray-400">No skills added</p>
                  </div>
                )}
              </div>
            </div>

            {/* FIELD OF STUDY */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Field Of Study
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Academic Background
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm leading-relaxed text-gray-700">
                  {user.fieldOfStudy || "Not Added"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
