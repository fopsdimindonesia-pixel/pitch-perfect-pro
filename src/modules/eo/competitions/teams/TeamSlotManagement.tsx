import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, Users, Lock, Timer, AlertCircle } from "lucide-react";
import { useCompetition, STATUS_LABELS, STATUS_COLORS } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";
import { cn } from "@/lib/utils";

function useCountdown(targetDate: string | undefined) {
  const [remaining, setRemaining] = useState<{ days: number; hours: number; minutes: number; expired: boolean } | null>(null);
  useEffect(() => {
    if (!targetDate) { setRemaining(null); return; }
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };
      return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), expired: false };
    };
    setRemaining(calc());
    const interval = setInterval(() => setRemaining(calc()), 60000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return remaining;
}

export default function TeamSlotManagement() {
  const { activeCompetition, registrations, competitionConfig } = useCompetition();
  const totalSlots = competitionConfig.categories.reduce((sum, c) => sum + c.maxTeams, 0);
  const filledSlots = registrations.filter((r) => r.status === "Approved").length;
  const availableSlots = Math.max(0, totalSlots - filledSlots);
  const fillPercent = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;
  const pendingCount = registrations.filter((r) => r.status === "Pending").length;

  const isRegistrationOpen = activeCompetition?.status === "registration_open";
  const deadline = competitionConfig.eligibility.deadline || activeCompetition?.startDate;
  const countdown = useCountdown(deadline);

  return (
    <div className="space-y-6" role="main" aria-label="Team slot management">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Slot Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Kelola slot tim yang tersedia</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <>
          {/* Status awareness */}
          {activeCompetition.status === "draft" && (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>Kompetisi masih draft. Registrasi belum dibuka — slot belum bisa terisi.</AlertDescription>
            </Alert>
          )}
          {(activeCompetition.status === "registration_closed" || activeCompetition.status === "active") && (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>Registrasi sudah ditutup. Slot tidak akan bertambah.</AlertDescription>
            </Alert>
          )}

          {/* Countdown when registration open */}
          {isRegistrationOpen && countdown && !countdown.expired && (
            <Card className={cn("p-4", countdown.days <= 3 ? "border-chart-4/30 bg-chart-4/5" : "border-chart-2/30 bg-chart-2/5")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Timer className={cn("w-5 h-5", countdown.days <= 3 ? "text-chart-4" : "text-chart-2")} />
                  <div>
                    <p className={cn("text-sm font-semibold", countdown.days <= 3 ? "text-chart-4" : "text-chart-2")}>Registrasi Dibuka</p>
                    <p className="text-xs text-muted-foreground">Deadline: {new Date(deadline!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-center">
                  <div>
                    <div className={cn("text-xl font-bold tabular-nums", countdown.days <= 3 && "text-chart-4")}>{countdown.days}</div>
                    <div className="text-[9px] text-muted-foreground uppercase">Hari</div>
                  </div>
                  <span className="text-muted-foreground">:</span>
                  <div>
                    <div className={cn("text-xl font-bold tabular-nums", countdown.days <= 3 && "text-chart-4")}>{String(countdown.hours).padStart(2, "0")}</div>
                    <div className="text-[9px] text-muted-foreground uppercase">Jam</div>
                  </div>
                  <span className="text-muted-foreground">:</span>
                  <div>
                    <div className={cn("text-xl font-bold tabular-nums", countdown.days <= 3 && "text-chart-4")}>{String(countdown.minutes).padStart(2, "0")}</div>
                    <div className="text-[9px] text-muted-foreground uppercase">Mnt</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {isRegistrationOpen && countdown?.expired && (
            <Card className="p-4 border-chart-4/30 bg-chart-4/5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-chart-4" />
                <span className="text-sm font-semibold text-chart-4">Deadline registrasi terlewat</span>
                <span className="text-xs text-muted-foreground ml-2">Pertimbangkan menutup registrasi.</span>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary">{totalSlots}</div>
                <BarChart3 className="w-8 h-8 text-primary/40" />
              </div>
              <p className="text-sm font-medium">Total Slots</p>
              <p className="text-xs text-muted-foreground mt-1">{activeCompetition.name}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary">{filledSlots}</div>
                <Users className="w-8 h-8 text-primary/40" />
              </div>
              <p className="text-sm font-medium">Filled Slots</p>
              <p className="text-xs text-muted-foreground mt-1">{fillPercent}% capacity</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("text-3xl font-bold", availableSlots <= 0 ? "text-destructive" : "text-primary")}>{availableSlots}</div>
                <BarChart3 className="w-8 h-8 text-primary/40" />
              </div>
              <p className="text-sm font-medium">Available Slots</p>
              <p className="text-xs text-muted-foreground mt-1">{100 - fillPercent}% remaining</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Registration Breakdown</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Approved</span>
                  <span className="text-muted-foreground">{filledSlots}/{totalSlots}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${fillPercent}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Pending</span>
                  <span className="text-muted-foreground">{pendingCount}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Per-category breakdown */}
          {competitionConfig.categories.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Per Kategori</h2>
              <div className="space-y-3">
                {competitionConfig.categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <span className="text-sm font-medium">{cat.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{cat.ageGroup}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Maks: </span>
                      <span className="font-medium">{cat.maxTeams} tim</span>
                      <span className="text-muted-foreground ml-2">· Roster: {cat.minRoster}-{cat.maxPlayers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Competition status */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2">
              <Badge className={cn("text-[10px]", STATUS_COLORS[activeCompetition.status])}>
                {STATUS_LABELS[activeCompetition.status]}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {isRegistrationOpen ? "Slot bisa terisi dari pendaftaran baru" : "Slot tidak akan bertambah"}
              </span>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
