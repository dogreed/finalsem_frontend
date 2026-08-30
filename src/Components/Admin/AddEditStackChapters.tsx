import { useEffect, useState } from "react";
import { X, BookOpen } from "lucide-react";

export type StackChapterFormData = {
  stackId: string;
  name: string;
};

type AddEditStackChaptersProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: StackChapterFormData) => Promise<void>;
  mode: "create" | "edit";
  initialData?: Partial<StackChapterFormData> | null;
  stackId?: string;
};

export default function AddEditStackChapters({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
  stackId,
}: AddEditStackChaptersProps) {
  const [formData, setFormData] = useState<StackChapterFormData>({
    stackId: "",
    name: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      stackId: initialData?.stackId || stackId || "",
      name: initialData?.name || "",
    });
  }, [isOpen, initialData, stackId]);

  if (!isOpen) return null;

  const isValid = !!formData.stackId && !!formData.name.trim();

  const handleSubmit = async () => {
    if (!isValid || !onSubmit) return;

    try {
      setSubmitting(true);

      await onSubmit({
        stackId: formData.stackId.trim(),
        name: formData.name.trim(),
      });

      onClose();
    } catch (error) {
      console.error("Failed to submit chapter:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[450px] rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {mode === "create" ? "Add Chapter" : "Edit Chapter"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {mode === "create"
                ? "Create a new chapter."
                : "Update chapter name."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <BookOpen className="h-4 w-4" />
            Chapter Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Enter chapter name"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Saving..."
              : mode === "create"
                ? "Create Chapter"
                : "Update Chapter"}
          </button>
        </div>
      </div>
    </div>
  );
}
