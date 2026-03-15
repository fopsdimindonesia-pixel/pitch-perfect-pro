import { StatCard } from "@/components/shared/StatCard";
import { MatchCard } from "@/components/shared/MatchCard";
import { StandingsTable } from "@/components/shared/StandingsTable";
import { Trophy, UserCheck, Calendar, Clock } from "lucide-react";
import { mockCompetitions, mockRegistrations, mockMatches, mockStandings } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EOOverview() {
  const activeComps = mockCompetitions.filter((c) => c.status === "Active").length;
  const pendingRegs = mockRegistrations.filter((r) => r.status === "Pending").length;
  const todayMatches = mockMatches.filter((m) => m.status === "Live" || m.status === "Scheduled").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">EO Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Dashboard Event Organizer — PSSI Makassar</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Kompetisi Aktif" value={activeComps} icon={Trophy} accent="primary" />
        <StatCard title="Registrasi Pending" value={pendingRegs} icon={UserCheck} accent="gold" trend={{ value: pendingRegs, label: "menunggu" }} />
        <StatCard title="Pertandingan Hari Ini" value={todayMatches} icon={Calendar} accent="navy" />
        <StatCard title="Total Kompetisi" value={mockCompetitions.length} icon={Clock} accent="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-base font-semibold">Pertandingan Aktif</h2>
          {mockMatches.filter((m) => m.status === "Live" || m.status === "Scheduled").slice(0, 3).map((m) => (
            <MatchCard key={m.id} {...m} competitionName={m.competitionName} />
          ))}
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-semibold">Klasemen — Liga Makassar U13</h2>
          <StandingsTable data={mockStandings} />
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Kompetisi Aktif</h2>
            {mockCompetitions.filter((c) => c.status === "Active").slice(0, 2).map((c) => (
              <Card key={c.id}>
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.clubs} klub · {c.format} · {c.ageGroup}</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0 text-[10px]">{c.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
