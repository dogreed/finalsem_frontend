import { X } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS = [
  { label: "Pending", value: 0 },
  { label: "Verified", value: 1 },
  { label: "Rejected", value: 2 },
  { label: "Suspended", value: 3 },
];

interface VerifyOrganizationModalProps {
  open: boolean;
  loading?: boolean;

  organizationName: string;

  onClose: () => void;

  onSubmit: (data: { status: number; reason: string }) => void;
}

export default function VerifyOrganizationModal({
  open,
  loading,
  organizationName,
  onClose,
  onSubmit,
}: VerifyOrganizationModalProps) {
  const [status, setStatus] = useState(1);

  const [reason, setReason] = useState("");

  if (!open) return null;

  const selectedStatus = STATUS_OPTIONS.find(
    (item) => item.value === status,
  )?.label;

  const handleClose = () => {
    setStatus(1);

    setReason("");

    onClose();
  };

  const handleSubmit = () => {
    onSubmit({
      status,
      reason,
    });

    setStatus(1);

    setReason("");
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Update Organization Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">{organizationName}</p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-6 px-6 py-6">
          {/* STATUS */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              {STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* REASON */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={5}
              placeholder="Write additional notes or reason..."
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* PREVIEW */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Selected Status
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {selectedStatus}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-5">
          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}
