import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  CalendarDays,
  FileText,
  ExternalLink,
  X,
  Building2,
  Link2,
} from "lucide-react";

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

  industry?: string;
  city?: string;
  country?: string;

  documentUrls?: string[];

  socialLinks?: {
    platform: string;
    url: string;
  }[];
};

interface Props {
  selected: OrganizationItem | null;

  onClose: () => void;

  StatusBadge: (props: { status: string }) => React.ReactNode;
}

function getStatusText(status?: number, isVerified?: boolean) {
  switch (status) {
    case 1:
      return "Pending";

    case 2:
      return "Verified";

    case 3:
      return "Rejected";

    case 4:
      return "Suspended";

    default:
      return isVerified ? "Verified" : "Pending";
  }
}

export default function OrganizationDetailsSidebar({
  selected,
  onClose,
  StatusBadge,
}: Props) {
  if (!selected) return null;

  const statusText = getStatusText(
    selected.status,
    selected.isVerified,
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex h-full justify-end overflow-hidden">
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-full w-full bg-white shadow-2xl sm:max-w-xl lg:max-w-2xl"
        >
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-700">
                  {selected.name?.slice(0, 2).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="break-words text-xl font-bold text-slate-900">
                      {selected.name}
                    </h2>

                    <StatusBadge status={statusText} />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Organization details
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoCard
                    icon={<Mail className="h-4 w-4" />}
                    title="Email"
                    value={selected.email}
                    breakAll
                  />

                  <InfoCard
                    icon={<Phone className="h-4 w-4" />}
                    title="Phone Number"
                    value={selected.phoneNumber}
                  />

                  <InfoCard
                    icon={<Briefcase className="h-4 w-4" />}
                    title="Industry"
                    value={selected.industry}
                  />

                  <InfoCard
                    icon={<CalendarDays className="h-4 w-4" />}
                    title="Registered At"
                    value={
                      selected.createdAt
                        ? new Date(
                            selected.createdAt,
                          ).toLocaleString()
                        : "-"
                    }
                  />
                </div>

                <Section
                  icon={<MapPin className="h-4 w-4" />}
                  title="Address"
                >
                  {[
                    selected.address,
                    selected.city,
                    selected.country,
                  ]
                    .filter(Boolean)
                    .join(", ") || "-"}
                </Section>

                <Section
                  icon={<Globe className="h-4 w-4" />}
                  title="Website"
                >
                  {selected.websiteUrl ? (
                    <a
                      href={selected.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 break-all font-medium text-blue-600 hover:underline"
                    >
                      {selected.websiteUrl}

                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                  ) : (
                    "-"
                  )}
                </Section>

                <Section
                  icon={<FileText className="h-4 w-4" />}
                  title="Description"
                >
                  {selected.description ||
                    "No description available."}
                </Section>

                {selected.reason && (
                  <div className="rounded-3xl border border-red-200 bg-red-50 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                      <Building2 className="h-4 w-4" />
                      Reason
                    </div>

                    <p className="mt-2 text-sm leading-6 text-red-600">
                      {selected.reason}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                  <ListSection
                    title="Documents"
                    icon={<FileText className="h-4 w-4" />}
                    items={selected.documentUrls || []}
                    renderLabel={(_, index) =>
                      `Document ${index + 1}`
                    }
                  />

                  <SocialLinksSection
                    title="Social Links"
                    icon={<Link2 className="h-4 w-4" />}
                    items={selected.socialLinks || []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  breakAll = false,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string | null;
  breakAll?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span className="text-slate-500">{icon}</span>

        {title}
      </div>

      <p
        className={`mt-2 text-sm leading-6 text-slate-600 ${
          breakAll ? "break-all" : "break-words"
        }`}
      >
        {value || "-"}
      </p>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="text-slate-500">{icon}</span>

        {title}
      </div>

      <div className="mt-2 break-words text-sm leading-6 text-slate-600">
        {children}
      </div>
    </div>
  );
}

function ListSection({
  title,
  icon,
  items,
  renderLabel,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  renderLabel: (item: string, index: number) => string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="text-slate-500">{icon}</span>

        {title}
      </div>

      {items.length > 0 ? (
        <div className="mt-4 space-y-2">
          {items.map((url, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <span className="truncate font-medium">
                {renderLabel(url, index)}
              </span>

              <ExternalLink className="h-4 w-4 shrink-0 text-blue-600" />
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          No documents available.
        </p>
      )}
    </div>
  );
}

function SocialLinksSection({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: {
    platform: string;
    url: string;
  }[];
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="text-slate-500">{icon}</span>

        {title}
      </div>

      {items.length > 0 ? (
        <div className="mt-4 space-y-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-3 py-3 transition hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">
                  {item.platform || `Link ${index + 1}`}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {item.url}
                </p>
              </div>

              <ExternalLink className="h-4 w-4 shrink-0 text-blue-600" />
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          No social links available.
        </p>
      )}
    </div>
  );
}