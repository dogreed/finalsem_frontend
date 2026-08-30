import { useEffect, useState } from "react";
import { X } from "lucide-react";

type ChapterItem = {
  chapterId: number;
  name: string;
};

interface AddEditQuestionsProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  stackId: number;
  chapters: ChapterItem[];
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

const initialFormState = {
  chapterId: "",
  text: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "A",
};

export default function AddEditQuestions({
  isOpen,
  onClose,
  mode,
  stackId,
  chapters,
  initialData,
  onSubmit,
}: AddEditQuestionsProps) {
  console.log("ss", initialData);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          chapterId: initialData.chapterId?.toString() || "",
          text: initialData.text || "",
          optionA: initialData.optionA || "",
          optionB: initialData.optionB || "",
          optionC: initialData.optionC || "",
          optionD: initialData.optionD || "",
          correctOption: initialData.correctOption || "A",
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleClose = () => {
    resetForm();

    onClose();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onSubmit({
        ...formData,
        stackId,
        chapterId: Number(formData.chapterId),
      });

      resetForm();

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              {mode === "create" ? "Add Question" : "Edit Question"}
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Manage question details
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {mode === "create" && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Chapter
              </label>

              <select
                value={formData.chapterId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    chapterId: e.target.value,
                  }))
                }
                className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none transition focus:border-blue-500"
              >
                <option value="">Select Chapter</option>

                {chapters.map((chapter) => (
                  <option key={chapter.chapterId} value={chapter.chapterId}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Question
            </label>

            <textarea
              rows={3}
              value={formData.text}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500"
              placeholder="Enter question"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {["A", "B", "C", "D"].map((option) => (
              <div key={option}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Option {option}
                </label>

                <input
                  value={formData[`option${option}` as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`option${option}`]: e.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  placeholder={`Enter option ${option}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Correct Option
            </label>

            <select
              value={formData.correctOption}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  correctOption: e.target.value,
                }))
              }
              className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none transition focus:border-blue-500"
            >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-5 py-4">
          <button
            onClick={handleClose}
            className="h-10 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "create"
                ? "Create Question"
                : "Update Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
