import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon: LucideIcon;
}

export function StatCard({ title, value, change, changeType = "up", icon: Icon }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-display font-bold text-foreground mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-2 font-medium ${changeType === "up" ? "text-success" : "text-destructive"}`}>
              {changeType === "up" ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
