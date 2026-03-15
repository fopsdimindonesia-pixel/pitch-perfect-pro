import { mockCompetitions, mockMatches } from "@/lib/mockData";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MatchStatusBadge } from "@/components/shared/StatusBadges";
import { Trophy, Swords, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Reports() {
  const totalGoals = 12;
  const totalCards = 8;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Laporan</h1>
          <p className="text-muted-foreground text-sm mt-1">Statistik dan laporan kompetisi.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Kompetisi" value={mockCompetitions.length} icon={Trophy} accent="primary" />
        <StatCard title="Total Pertandingan" value={mockMatches.length} icon={Swords} accent="navy" />
        <StatCard title="Total Gol" value={totalGoals} icon={Target} accent="gold" />
        <StatCard title="Total Klub" value={34} icon={Users} accent="primary" />
      </div>

      {/* Competition stats */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">Statistik per Kompetisi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCompetitions.filter((c) => c.status !== "Draft").map((comp) => (
            <Card key={comp.id}>
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="font-semibold text-sm">{comp.name}</p>
                  <p className="text-xs text-muted-foreground">{comp.ageGroup} · {comp.format}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  {[
                    { label: "Klub", value: comp.clubs },
                    { label: "Match", value: Math.floor(comp.clubs * 1.5) },
                    { label: "Gol", value: Math.floor(comp.clubs * 2.3) },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-lg font-bold tabular-nums">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Match results */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Hasil Pertandingan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Kompetisi</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Home</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Skor</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Away</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMatches.map((m) => (
                <TableRow key={m.id} className="hover:bg-accent/30">
                  <TableCell className="text-xs text-muted-foreground">{m.competitionName}</TableCell>
                  <TableCell className="text-sm font-medium">{m.homeTeam}</TableCell>
                  <TableCell className="text-center text-sm font-bold tabular-nums">
                    {m.status !== "Scheduled" ? `${m.homeScore} - ${m.awayScore}` : "vs"}
                  </TableCell>
                  <TableCell className="text-sm">{m.awayTeam}</TableCell>
                  <TableCell><MatchStatusBadge status={m.status} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
