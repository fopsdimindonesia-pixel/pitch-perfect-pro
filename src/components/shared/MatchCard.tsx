import { cn } from "@/lib/utils";
import { MapPin, User } from "lucide-react";
import { MatchStatusBadge } from "./StatusBadges";

type MatchStatus = "Live" | "Scheduled" | "Finished";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  date: string;
  time: string;
  venue?: string;
  referee?: string;
  competitionName?: string;
  className?: string;
  onClick?: () => void;
}

export const MatchCard = ({
  homeTeam, awayTeam, homeScore, awayScore, status, date, time, venue, referee, competitionName, className, onClick,
}: MatchCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 p-4 cursor-pointer group",
        status === "Live" && "match-card-live",
        status === "Finished" && "match-card-finished",
        status === "Scheduled" && "match-card-scheduled",
        className,
      )}
    >
      {competitionName && (
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-3">{competitionName}</p>
      )}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-right">
          <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{homeTeam}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Home</p>
        </div>
        <div className="flex-shrink-0 text-center min-w-[72px]">
          {status !== "Scheduled" ? (
            <p className="text-xl font-bold tabular-nums tracking-tight">
              {homeScore} — {awayScore}
            </p>
          ) : (
            <div>
              <p className="text-xs font-semibold text-muted-foreground">{time}</p>
              <p className="text-[10px] text-muted-foreground">{date}</p>
            </div>
          )}
          <div className="mt-1 flex justify-center">
            <MatchStatusBadge status={status} />
          </div>
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{awayTeam}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Away</p>
        </div>
      </div>
      {(venue || referee) && (
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-4">
          {venue && (
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{venue}</span>
            </div>
          )}
          {referee && (
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground ml-auto">
              <User className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{referee}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
