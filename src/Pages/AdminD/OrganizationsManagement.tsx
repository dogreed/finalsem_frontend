import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Building2, Search, Filter } from "lucide-react";

import OrganizationDetailsSidebar from "../../Components/Admin/OrganizationDetailsSidebar";
import VerifyOrganizationModal from "../../Components/Admin/VerifyOrganizationModal";

import { useToast } from "../../hooks/useToasts";

import { getOrganizations } from "../../api/admin/manage-organizations/get-organizations";
import { updateOrganizationStatus } from "../../api/admin/manage-organizations/update-org-status";

type OrganizationStatus = "Pending" | "Verified" | "Rejected" | "Suspended";

type OrganizationItem = {
  organizationId: number;
  userId: number;

  name: string;
  email: string;

  websiteUrl: string;

  isVerified: boolean;

  createdAt: string;

  status?: number;
  reason?: string;

  phoneNumber?: string;
  address?: string;
  description?: string;
};

type FilterStatus = "All" | OrganizationStatus;

function getStatusText(status?: number) {
  switch (status) {
    case 0:
      return "Pending";

    case 1:
      return "Verified";

    case 2:
      return "Rejected";

    case 3:
      return "Suspended";

    default:
      return "Pending";
  }
}

function getStatusClasses(status: string) {
  const baseClasses =
    "inline-flex items-center justify-center min-w-[110px] px-3 py-1 rounded-full border text-sm font-semibold";

  switch (status) {
    case "Verified":
      return `${baseClasses} bg-emerald-100 text-emerald-700 border-emerald-200`;

    case "Rejected":
      return `${baseClasses} bg-red-100 text-red-700 border-red-200`;

    case "Suspended":
      return `${baseClasses} bg-slate-200 text-slate-700 border-slate-300`;

    case "Pending":
    default:
      return `${baseClasses} bg-amber-100 text-amber-700 border-amber-200`;
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${getStatusClasses(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: number;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

export default function OrganizationsManagement() {
  const { showError, showSuccess } = useToast();

  const [organizations, setOrganizations] = useState<OrganizationItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<OrganizationItem | null>(null);

  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");

  const [search, setSearch] = useState("");

  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  const [verifyOrganization, setVerifyOrganization] =
    useState<OrganizationItem | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);

        const res = await getOrganizations();

        setOrganizations(Array.isArray(res) ? res : []);
      } catch (error: any) {
        console.error(
          "Organizations fetch error:",
          error?.response?.data || error.message,
        );

        setOrganizations([]);

        showError(
          error?.response?.data?.message ||
            error?.response?.data?.errors?.[0] ||
            "Error occurred while fetching organizations",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        org.name?.toLowerCase().includes(query) ||
        org.email?.toLowerCase().includes(query);

      const orgStatus = getStatusText(org.status);

      const matchesStatus =
        statusFilter === "All" || orgStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [organizations, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: organizations.length,

      pending: organizations.filter(
        (o) => getStatusText(o.status) === "Pending",
      ).length,

      verified: organizations.filter(
        (o) => getStatusText(o.status) === "Verified",
      ).length,

      rejected: organizations.filter(
        (o) => getStatusText(o.status) === "Rejected",
      ).length,

      suspended: organizations.filter(
        (o) => getStatusText(o.status) === "Suspended",
      ).length,
    };
  }, [organizations]);

  const statusOptions: FilterStatus[] = [
    "All",
    "Pending",
    "Verified",
    "Rejected",
    "Suspended",
  ];

  const handleStatusChange = async (
    organizationId: number,
    status: number,
    reason: string,
  ) => {
    try {
      setActionLoadingId(organizationId);

      await updateOrganizationStatus(organizationId, {
        status,
        reason,
      });

      setOrganizations((prev) =>
        prev.map((org) =>
          org.organizationId === organizationId
            ? {
                ...org,
                status,
                reason,
              }
            : org,
        ),
      );

      if (selected?.organizationId === organizationId) {
        setSelected((prev) =>
          prev
            ? {
                ...prev,
                status,
                reason,
              }
            : prev,
        );
      }

      showSuccess("Organization status updated successfully");

      setVerifyModalOpen(false);

      setVerifyOrganization(null);
    } catch (error: any) {
      console.error(
        "Update Organization Status Error:",
        error?.response?.data || error,
      );

      const data = error?.response?.data;

      let errorMessage =
        data?.title || "Error occurred while updating organization status";

      // HANDLE VALIDATION ERRORS
      if (data?.errors) {
        const validationErrors = Object.values(data.errors).flat().join(", ");

        errorMessage = validationErrors;
      }

      showError(errorMessage);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-5 p-3 sm:p-4 md:p-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Building2 className="h-4 w-4" />
                Organization approvals
              </div>

              <h1 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Organizations Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Review registered organizations and manage approvals.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:w-[560px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search organization or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as FilterStatus)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <StatCard
            title="Total Organizations"
            value={stats.total}
            subtitle="All registered organizations"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            subtitle="Awaiting review"
          />

          <StatCard
            title="Verified"
            value={stats.verified}
            subtitle="Ready to operate"
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
            subtitle="Needs correction"
          />

          <StatCard
            title="Suspended"
            value={stats.suspended}
            subtitle="Temporarily disabled"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Registered Organizations
            </h2>

            <p className="text-sm text-slate-500">
              {loading
                ? "Loading organizations..."
                : `Showing ${filteredOrganizations.length} of ${organizations.length} organizations`}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="px-5 py-4 font-semibold">Company</th>

                  <th className="px-5 py-4 font-semibold">Website</th>

                  <th className="px-5 py-4 font-semibold">Status</th>

                  <th className="px-5 py-4 font-semibold">Registered</th>

                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrganizations.map((org) => {
                  const orgStatus = getStatusText(org.status);
                  return (
                    <tr
                      key={org.organizationId}
                      onClick={() => setSelected(org)}
                      className="cursor-pointer border-b border-slate-100 transition hover:bg-blue-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                            {org.name?.slice(0, 2).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">
                              {org.name}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {org.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {org.websiteUrl ? (
                          <a
                            href={org.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            Visit
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={orgStatus} />
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {org.createdAt
                          ? new Date(org.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td
                        className="px-5 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-center">
                          {orgStatus === "Pending" && (
                            <button
                              onClick={() => {
                                setVerifyOrganization(org);

                                setVerifyModalOpen(true);
                              }}
                              className="w-28 rounded-xl bg-green-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-green-700 cursor-pointer"
                            >
                              Verify
                            </button>
                          )}

                          {orgStatus === "Verified" && (
                            <button
                              onClick={() => {
                                setVerifyOrganization(org);

                                setVerifyModalOpen(true);
                              }}
                              className="w-28 rounded-xl bg-red-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
                            >
                              Suspend
                            </button>
                          )}

                          {(orgStatus === "Rejected" ||
                            orgStatus === "Suspended") && (
                            <button
                              onClick={() => {
                                setVerifyOrganization(org);

                                setVerifyModalOpen(true);
                              }}
                              className="w-28 rounded-xl bg-slate-700 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-800 cursor-pointer"
                            >
                              Re-check
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <OrganizationDetailsSidebar
          selected={selected}
          onClose={() => setSelected(null)}
          StatusBadge={StatusBadge}
        />
      )}

      {verifyOrganization && (
        <VerifyOrganizationModal
          open={verifyModalOpen}
          loading={actionLoadingId === verifyOrganization.organizationId}
          organizationName={verifyOrganization.name}
          onClose={() => {
            setVerifyModalOpen(false);

            setVerifyOrganization(null);
          }}
          onSubmit={(data) =>
            handleStatusChange(
              verifyOrganization.organizationId,
              data.status,
              data.reason,
            )
          }
        />
      )}
    </div>
  );
}
