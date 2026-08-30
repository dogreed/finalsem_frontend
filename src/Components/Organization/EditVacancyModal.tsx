import { useEffect, useState } from "react";
import {
  X,
  CalendarDays,
  GraduationCap,
  Briefcase,
  FileText,
} from "lucide-react";

import { editVacancy } from "../../api/organization/vacancy/edit-vacancy";
import { useToast } from "../../hooks/useToasts";

import skills from "../../constants/skills";
import { educationLevels } from "../../constants/educationLevels";

interface Skill {
  skillId: number;
  skillName: string;
}

interface VacancyData {
  vacancyId: number;
  title: string;
  description: string;
  applicationDeadline: string;
  requiredEducationLevel: string;
  requiredFieldOfStudy: string;
  requiredSkills: Skill[];
  optionalSkills: Skill[];
}

interface EditVacancyModalProps {
  open: boolean;
  onClose: () => void;
  vacancy: VacancyData | null;
  onSuccess?: () => void;
}

const educationLevelMap: Record<string, number> = {
  SEE: 1,
  PlusTwo: 2,
  Bachelor: 3,
  Masters: 4,
  PhD: 5,
};

export default function EditVacancyModal({
  open,
  onClose,
  vacancy,
  onSuccess,
}: EditVacancyModalProps) {
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");

  const [educationLevel, setEducationLevel] = useState(1);

  const [requiredSkills, setRequiredSkills] = useState<
    { id: number; name: string }[]
  >([]);

  const [optionalSkills, setOptionalSkills] = useState<
    { id: number; name: string }[]
  >([]);

  const [requiredSkillInput, setRequiredSkillInput] = useState("");

  const [optionalSkillInput, setOptionalSkillInput] = useState("");

  useEffect(() => {
    if (vacancy) {
      setTitle(vacancy.title);

      setDescription(vacancy.description);

      setFieldOfStudy(vacancy.requiredFieldOfStudy);

      setDeadline(vacancy.applicationDeadline.split("T")[0]);

      setEducationLevel(educationLevelMap[vacancy.requiredEducationLevel] || 1);

      setRequiredSkills(
        vacancy.requiredSkills.map((s) => ({
          id: s.skillId,
          name: s.skillName,
        })),
      );

      setOptionalSkills(
        vacancy.optionalSkills.map((s) => ({
          id: s.skillId,
          name: s.skillName,
        })),
      );
    }
  }, [vacancy]);

  const addRequiredSkill = () => {
    if (!requiredSkillInput) return;

    const selectedSkill = skills.find(
      (skill) => skill.id === Number(requiredSkillInput),
    );

    if (!selectedSkill) return;

    const alreadyExists = requiredSkills.some(
      (skill) => skill.id === selectedSkill.id,
    );

    if (!alreadyExists) {
      setRequiredSkills([...requiredSkills, selectedSkill]);
    }

    setRequiredSkillInput("");
  };

  const addOptionalSkill = () => {
    if (!optionalSkillInput) return;

    const selectedSkill = skills.find(
      (skill) => skill.id === Number(optionalSkillInput),
    );

    if (!selectedSkill) return;

    const alreadyExists = optionalSkills.some(
      (skill) => skill.id === selectedSkill.id,
    );

    if (!alreadyExists) {
      setOptionalSkills([...optionalSkills, selectedSkill]);
    }

    setOptionalSkillInput("");
  };

  const removeRequiredSkill = (skillId: number) => {
    setRequiredSkills(requiredSkills.filter((skill) => skill.id !== skillId));
  };

  const removeOptionalSkill = (skillId: number) => {
    setOptionalSkills(optionalSkills.filter((skill) => skill.id !== skillId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vacancy) return;

    try {
      setLoading(true);

      await editVacancy(vacancy.vacancyId, {
        title,
        description,
        applicationDeadline: new Date(deadline).toISOString(),
        requiredEducationLevel: educationLevel,
        requiredFieldOfStudy: fieldOfStudy,

        requiredSkillIds: requiredSkills.map((skill) => skill.id),

        optionalSkillIds: optionalSkills.map((skill) => skill.id),
      });

      showSuccess("Vacancy updated successfully");

      onSuccess?.();

      onClose();
    } catch (error: any) {
      showError(error?.message || "Failed to update vacancy");
    } finally {
      setLoading(false);
    }
  };

  if (!open || !vacancy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <Briefcase className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Edit Vacancy</h2>

              <p className="mt-1 text-sm text-gray-500">
                Update vacancy details and requirements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Job Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CalendarDays className="h-4 w-4" />
                  Application Deadline
                </label>

                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Education */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <GraduationCap className="h-4 w-4" />
                  Education Level
                </label>

                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(Number(e.target.value))}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  {educationLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Required Field Of Study
                </label>

                <input
                  type="text"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="h-4 w-4" />
                  Description
                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Required Skills */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Required Skills
                </label>

                <div className="flex gap-2">
                  <select
                    value={requiredSkillInput}
                    onChange={(e) => setRequiredSkillInput(e.target.value)}
                    className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select skill</option>

                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={addRequiredSkill}
                    className="rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {requiredSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                    >
                      {skill.name}

                      <button
                        type="button"
                        onClick={() => removeRequiredSkill(skill.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Skills */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Optional Skills
                </label>

                <div className="flex gap-2">
                  <select
                    value={optionalSkillInput}
                    onChange={(e) => setOptionalSkillInput(e.target.value)}
                    className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select skill</option>

                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={addOptionalSkill}
                    className="rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {optionalSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {skill.name}

                      <button
                        type="button"
                        onClick={() => removeOptionalSkill(skill.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
