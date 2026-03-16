import { useState } from "react";
import { StatCard } from "@/components/shared/StatCard";
import { MatchCard } from "@/components/shared/MatchCard";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { Users, Trophy, Calendar, Swords, RefreshCw } from "lucide-react";
import { mockPlayers, mockMatches, mockRegistrations, mockMatchHistory } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { focusVisibleClass } from "@/lib/accessibility";

export default function ClubOverview() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };
  const verifiedPlayers = mockPlayers.filter((p) => p.eligibility === "Verified").length;
  const upcoming = mockMatches.filter((m) => m.status === "Scheduled" || m.status === "Live");
  const lastMatch = mockMatchHistory[0];

  if (isLoading) {
    return <LoadingSkeleton rows={6} type="card" />;
  }

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club overview">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 id="page-title" className="text-2xl font-bold tracking-tight">SSB Garuda Muda</h1>
          <p className="text-muted-foreground text-sm mt-1">Club Dashboard — Makassar</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className={cn("gap-2", focusVisibleClass)}
          onClick={handleRefresh}
          disabled={isLoading}
          aria-label="Refresh dashboard data"
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="group" aria-label="Dashboard statistics">
        <StatCard title="Total Pemain" value={mockPlayers.length} icon={Users} accent="primary" />
        <StatCard title="Pemain Terverifikasi" value={verifiedPlayers} icon={Users} accent="navy" />
        <StatCard title="Kompetisi Aktif" value={mockRegistrations.filter((r) => r.status === "Approved").length} icon={Trophy} accent="gold" />
        <StatCard title="Total Pertandingan" value={mockMatchHistory.length} icon={Swords} accent="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last result + upcoming */}
        <div className="space-y-3" role="region" aria-label="Recent matches and upcoming fixtures">
          <h2 className="text-base font-semibold">Hasil Terakhir</h2>
          {lastMatch && (
            <Card className={cn(lastMatch.result === "W" ? "match-card-finished" : lastMatch.result === "L" ? "match-card-live" : "match-card-scheduled")}>
              <CardContent className="p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{lastMatch.competition}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className={cn("flex-1 text-right", !lastMatch.isHome && "opacity-70")}>
                    <p className="font-bold text-sm">SSB Garuda Muda</p>
                    <p className="text-[10px] text-muted-foreground">{lastMatch.isHome ? "Home" : "Away"}</p>
                  </div>
                  <div className="flex-shrink-0 text-center px-4">
                    <p className="text-2xl font-black tabular-nums">
                      {lastMatch.isHome ? lastMatch.homeScore : lastMatch.awayScore} — {lastMatch.isHome ? lastMatch.awayScore : lastMatch.homeScore}
                    </p>
                    <Badge className={cn("text-[10px] px-2 py-0.5 border-0 rounded-full mt-1", lastMatch.result === "W" ? "bg-primary/10 text-primary" : lastMatch.result === "L" ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground")}>
                      {lastMatch.result === "W" ? "Menang" : lastMatch.result === "L" ? "Kalah" : "Seri"} · {lastMatch.date}
                    </Badge>
                  </div>
                  <div className={cn("flex-1 text-left", lastMatch.isHome && "opacity-70")}>
                    <p className="font-bold text-sm">{lastMatch.opponent}</p>
                    <p className="text-[10px] text-muted-foreground">{!lastMatch.isHome ? "Home" : "Away"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <h2 className="text-base font-semibold mt-4">Pertandingan Mendatang</h2>
          {upcoming.slice(0, 2).map((m) => (
            <MatchCard key={m.id} {...m} competitionName={m.competitionName} />
          ))}
        </div>

        {/* Squad summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Ringkasan Skuat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { pos: "Penjaga Gawang", count: mockPlayers.filter((p) => p.position === "GK").length, color: "bg-gold/15 text-gold-foreground" },
              { pos: "Belakang", count: mockPlayers.filter((p) => ["CB", "LB", "RB"].includes(p.position)).length, color: "bg-navy/10 text-navy" },
              { pos: "Tengah", count: mockPlayers.filter((p) => ["CM", "DM", "AM"].includes(p.position)).length, color: "bg-primary/10 text-primary" },
              { pos: "Penyerang", count: mockPlayers.filter((p) => ["LW", "RW", "ST", "SS"].includes(p.position)).length, color: "bg-primary/10 text-primary" },
            ].map((g) => (
              <div key={g.pos} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <p className="text-sm text-muted-foreground">{g.pos}</p>
                <Badge className={cn("text-xs px-3 py-0.5 border-0 font-bold tabular-nums", g.color)}>{g.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
