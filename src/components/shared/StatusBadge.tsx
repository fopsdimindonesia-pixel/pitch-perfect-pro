import { Badge } from "@/components/ui/badge";

export type StatusType = 
  | "active" | "inactive" | "pending" | "approved" | "rejected" 
  | "operational" | "maintenance" | "completed" | "in-progress" 
  | "expiring" | "expired" | "loaned" | "reserved" 
  | "available" | "unavailable" | "verified" | "unverified"
  | "ok" | "warning" | "error" | "unknown";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

/**
 * Consistent Status Badge Component
 * Maps status values to standardized colors and styles
 */
export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  // Status color mapping - consistent across entire app
  const statusColorMap: Record<StatusType, { bgClass: string; textClass: string; displayText?: string }> = {
    // Active/Operational states (Green)
    active: { bgClass: "bg-green-100", textClass: "text-green-800", displayText: "Active" },
    operational: { bgClass: "bg-green-100", textClass: "text-green-800", displayText: "Operational" },
    approved: { bgClass: "bg-green-100", textClass: "text-green-800", displayText: "Approved" },
    completed: { bgClass: "bg-green-100", textClass: "text-green-800", displayText: "Completed" },
    available: { bgClass: "bg-green-100", textClass: "text-green-800", displayText: "Available" },
    verified: { bgClass: "bg-green-100", textClass: "text-green-800", displayText: "Verified" },

    // Pending/In Progress states (Blue/Amber)
    pending: { bgClass: "bg-blue-100", textClass: "text-blue-800", displayText: "Pending" },
    "in-progress": { bgClass: "bg-amber-100", textClass: "text-amber-800", displayText: "In Progress" },
    maintenance: { bgClass: "bg-amber-100", textClass: "text-amber-800", displayText: "Maintenance" },
    expiring: { bgClass: "bg-amber-100", textClass: "text-amber-800", displayText: "Expiring Soon" },
    loaned: { bgClass: "bg-amber-100", textClass: "text-amber-800", displayText: "Loaned" },

    // Inactive/Error states (Red)
    inactive: { bgClass: "bg-red-100", textClass: "text-red-800", displayText: "Inactive" },
    rejected: { bgClass: "bg-red-100", textClass: "text-red-800", displayText: "Rejected" },
    expired: { bgClass: "bg-red-100", textClass: "text-red-800", displayText: "Expired" },
    unavailable: { bgClass: "bg-red-100", textClass: "text-red-800", displayText: "Unavailable" },

    // Reserved/Other (Gray)
    reserved: { bgClass: "bg-gray-100", textClass: "text-gray-800", displayText: "Reserved" },
    unverified: { bgClass: "bg-gray-100", textClass: "text-gray-800", displayText: "Unverified" },
    ok: { bgClass: "bg-blue-100", textClass: "text-blue-800", displayText: "OK" },
    warning: { bgClass: "bg-amber-100", textClass: "text-amber-800", displayText: "Warning" },
    error: { bgClass: "bg-red-100", textClass: "text-red-800", displayText: "Error" },
    unknown: { bgClass: "bg-gray-100", textClass: "text-gray-800", displayText: "Unknown" },
  };

  const statusConfig = statusColorMap[status] || statusColorMap.unknown;
  const displayLabel = label || statusConfig.displayText || status;

  return (
    <Badge className={`${statusConfig.bgClass} ${statusConfig.textClass} ${className}`}>
      {displayLabel}
    </Badge>
  );
}

/**
 * Multiple status badge component for showing multiple statuses
 */
export function StatusBadges({ statuses }: { statuses: { status: StatusType; label?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((item, idx) => (
        <StatusBadge key={idx} status={item.status} label={item.label} />
      ))}
    </div>
  );
}
