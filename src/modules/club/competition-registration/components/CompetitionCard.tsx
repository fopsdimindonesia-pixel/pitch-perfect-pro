/**
 * CompetitionCard - Card component untuk display competition di list
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, MapPin, Users, Zap } from "lucide-react";
import { formatCurrency, formatDate, getDeadlineInfo, getCompetitionStatusLabel } from "../lib/utils";
import { COMPETITION_STATUS_COLORS } from "../lib/constants";
import type { Competition } from "../lib/types";
import { cn } from "@/lib/utils";

interface CompetitionCardProps {
  competition: Competition;
  onViewDetail: (competitionId: string) => void;
  onRegister: (competitionId: string) => void;
  isRegistered?: boolean;
  isRegistrationOpen?: boolean;
}

export function CompetitionCard({
  competition,
  onViewDetail,
  onRegister,
  isRegistered = false,
  isRegistrationOpen = false,
}: CompetitionCardProps) {
  const deadlineInfo = getDeadlineInfo(competition.registrationDeadline);
  const status = competition.status as keyof typeof COMPETITION_STATUS_COLORS;
  const statusColor = COMPETITION_STATUS_COLORS[status];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-gold flex-shrink-0" />
              <h3 className="font-semibold text-base truncate">{competition.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground truncate">{competition.eoName}</p>
          </div>
          <Badge className={cn("text-xs flex-shrink-0 whitespace-nowrap", statusColor)}>
            {getCompetitionStatusLabel(competition.status as any)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Format & Age Group */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{competition.format}</p>
              <p className="font-medium text-sm">{competition.ageGroup}</p>
            </div>
          </div>

          {/* Slots */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-blue-700">#</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Kuota</p>
              <p className={cn("font-medium text-sm", competition.slotsAvailable === 0 ? "text-destructive" : "text-green-700")}>
                {competition.currentClubs}/{competition.totalSlots}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm col-span-2">
            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm truncate">{competition.location || "TBA"}</p>
          </div>
        </div>

        {/* Fee & Deadline */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Fee Registrasi</span>
            <span className="font-semibold text-sm">{formatCurrency(competition.registrationFee)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Deadline</span>
            <span className={cn("text-sm font-medium", deadlineInfo.isUrgent ? "text-destructive" : "text-foreground")}>
              {formatDate(competition.registrationDeadline)}
            </span>
          </div>

          {deadlineInfo.isUrgent && !deadlineInfo.isPassed && (
            <div className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
              <Zap className="w-3 h-3" />
              <span>{deadlineInfo.displayText}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetail(competition.id)}
            className="flex-1"
          >
            Detail
          </Button>
          <Button
            size="sm"
            onClick={() => onRegister(competition.id)}
            disabled={isRegistered || !isRegistrationOpen}
            className="flex-1"
          >
            {isRegistered ? "Terdaftar" : "Daftar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
