import { useState } from "react";
import { X, Briefcase, CalendarDays, GraduationCap } from "lucide-react";

import { useToast } from "../../hooks/useToasts";
import { createVacancy } from "../../api/organization/vacancy/create-vacancy";
import skills from "../../constants/skills";

const educationLevels = [
  { label: "SEE", value: 1 },
  { label: "+2", value: 2 },
  { label: "Bachelor", value: 3 },
  { label: "Masters", value: 4 },
  { label: "PhD", value: 5 },
];

export default function PostVacancy() {
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [educationLevel, setEducationLevel] = useState(1);

  const [selectedSkills, setSelectedSkills] = useState<
    { id: number; name: string }[]
  >([]);

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (!skillInput) return;

    const selectedSkill = skills.find(
      (skill) => skill.id === Number(skillInput),
    );

    if (!selectedSkill) return;

    const alreadyExists = selectedSkills.some(
      (skill) => skill.id === selectedSkill.id,
    );

    if (!alreadyExists) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }

    setSkillInput("");
  };

  const removeSkill = (skillId: number) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !deadline || !fieldOfStudy) {
      showError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await createVacancy({
        title,
        description,
        applicationDeadline: new Date(deadline).toISOString(),
        requiredEducationLevel: educationLevel,
        requiredFieldOfStudy: fieldOfStudy,
        requiredSkillIds: selectedSkills.map((skill) => skill.id),
        optionalSkillIds: [],
      });

      showSuccess("Vacancy posted successfully");

      setTitle("");
      setDescription("");
      setDeadline("");
      setFieldOfStudy("");
      setEducationLevel(1);
      setSelectedSkills([]);
      setSkillInput("");
    } catch (error: any) {
      showError(error?.message || "Failed to create vacancy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <Briefcase className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Post New Vacancy
              </h1>

              <p className="mt-1 text-gray-500">
                Create and publish a vacancy for applicants
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Job Title */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Job Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer Intern"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Education Level */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <GraduationCap className="h-4 w-4" />
                    Education Level
                  </label>

                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {educationLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field Of Study */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Required Field Of Study
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Computer Science"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Job Description
                  </label>

                  <textarea
                    rows={8}
                    placeholder="Describe the role, responsibilities, required qualifications, and expectations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Skills */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Skills
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <select
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select a skill</option>

                      {skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={addSkill}
                      className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Add Skill
                    </button>
                  </div>

                  {selectedSkills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {selectedSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                        >
                          {skill.name}

                          <button
                            type="button"
                            onClick={() => removeSkill(skill.id)}
                            className="transition hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-5 md:px-8">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Posting Vacancy..." : "Post Vacancy"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
