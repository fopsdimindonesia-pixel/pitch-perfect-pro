import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MatchStatus = "Live" | "Scheduled" | "Finished";

const config: Record<MatchStatus, { label: string; className: string; dot?: boolean }> = {
  Live: { label: "LIVE", className: "bg-live text-live-foreground border-0 font-semibold tracking-wide", dot: true },
  Scheduled: { label: "SCHEDULED", className: "bg-secondary text-muted-foreground border border-border font-medium tracking-wide" },
  Finished: { label: "FINISHED", className: "bg-finished text-finished-foreground border-0 font-medium tracking-wide" },
};

export const MatchStatusBadge = ({ status }: { status: MatchStatus }) => {
  const c = config[status];
  return (
    <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full gap-1", c.className)}>
      {c.dot && <span className="w-1.5 h-1.5 rounded-full bg-live-foreground live-pulse inline-block" />}
      {c.label}
    </Badge>
  );
};

type EligibilityStatus = "Verified" | "Pending" | "Suspended";

const eligibilityConfig: Record<EligibilityStatus, { label: string; className: string }> = {
  Verified: { label: "Verified", className: "bg-primary/10 text-primary border-0 font-medium" },
  Pending: { label: "Pending", className: "bg-gold/15 text-gold-foreground border-0 font-medium" },
  Suspended: { label: "Suspended", className: "bg-destructive/10 text-destructive border-0 font-medium" },
};

export const PlayerEligibilityBadge = ({ status }: { status: EligibilityStatus }) => {
  const c = eligibilityConfig[status];
  return (
    <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
};

type RegistrationStatus = "Approved" | "Pending" | "Rejected";
const regConfig: Record<RegistrationStatus, { label: string; className: string }> = {
  Approved: { label: "Approved", className: "bg-primary/10 text-primary border-0" },
  Pending: { label: "Pending", className: "bg-gold/15 text-gold-foreground border-0" },
  Rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-0" },
};
export const RegistrationStatusBadge = ({ status }: { status: RegistrationStatus }) => {
  const c = regConfig[status];
  return <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", c.className)}>{c.label}</Badge>;
};

type ClubStatus = "Verified" | "Pending" | "Suspended";
const clubConfig: Record<ClubStatus, { label: string; className: string }> = {
  Verified: { label: "Verified", className: "bg-primary/10 text-primary border-0" },
  Pending: { label: "Pending", className: "bg-gold/15 text-gold-foreground border-0" },
  Suspended: { label: "Suspended", className: "bg-destructive/10 text-destructive border-0" },
};
export const ClubStatusBadge = ({ status }: { status: ClubStatus }) => {
  const c = clubConfig[status];
  return <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", c.className)}>{c.label}</Badge>;
};

type EOStatus = "Active" | "Suspended";
const eoConfig: Record<EOStatus, { label: string; className: string }> = {
  Active: { label: "Active", className: "bg-primary/10 text-primary border-0" },
  Suspended: { label: "Suspended", className: "bg-destructive/10 text-destructive border-0" },
};
export const EOStatusBadge = ({ status }: { status: EOStatus }) => {
  const c = eoConfig[status];
  return <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", c.className)}>{c.label}</Badge>;
};
