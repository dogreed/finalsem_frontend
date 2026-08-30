import { Trash2, X } from "lucide-react";

interface ConformationModelProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConformationModel({
  isOpen,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  loading = false,
  onClose,
  onConfirm,
}: ConformationModelProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <Trash2 className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 p-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />

            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}