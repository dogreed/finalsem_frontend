import { useEffect, useState } from "react";
import { X } from "lucide-react";

type StackFormData = {
  name: string;
};

interface AddEditStackProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: StackFormData) => Promise<void>;
  mode: "create" | "edit";
  initialData?: StackFormData | null;
}

export type { StackFormData };

export default function AddEditStack({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
}: AddEditStackProps) {
  const [formData, setFormData] = useState<StackFormData>({
    name: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData?.name || "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isValid = formData.name.trim();

  const handleChange = (key: keyof StackFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isValid || !onSubmit) return;

    try {
      setSubmitting(true);

      await onSubmit(formData);

      onClose();
    } catch (error) {
      console.error("Failed to submit stack:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-gray-100 bg-white shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
              {mode === "create" ? "Create New Stack" : "Edit Stack"}
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              {mode === "create"
                ? "Add a new stack to organize your question bank."
                : "Update the stack details below."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2.5 text-gray-400 transition hover:bg-gray-200 hover:text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-700">
              Stack Name
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. NodeJS"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-6 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Saving..."
              : mode === "create"
                ? "Create Stack"
                : "Update Stack"}
          </button>
        </div>
      </div>
    </div>
  );
}
