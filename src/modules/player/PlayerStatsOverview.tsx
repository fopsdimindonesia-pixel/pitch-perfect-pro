import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Target, Medal, TrendingUp } from "lucide-react";
import { globalPlayers, skillEvaluations } from "@/lib/playerEcosystemData";
import { useRole } from "@/context/RoleContext";

export default function PlayerStatsOverview() {
  const { role } = useRole();
  const isClub = role === "club";
  const clubName = "SSB Garuda Muda";
  
  const visiblePlayers = isClub
    ? globalPlayers.filter(p => p.currentClub === clubName)
    : globalPlayers;

  const topScorers = [...visiblePlayers].sort((a, b) => b.totalGoals - a.totalGoals).slice(0, 10);
  const topAssists = [...visiblePlayers].sort((a, b) => b.totalAssists - a.totalAssists).slice(0, 10);
  const topAppearances = [...visiblePlayers].sort((a, b) => b.totalAppearances - a.totalAppearances).slice(0, 10);
  const highPotential = [...visiblePlayers].sort((a, b) => b.potentialScore - a.potentialScore).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isClub ? "Statistik Pemain Klub" : "Player Statistics & Rankings"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isClub ? `Statistik dan peringkat pemain ${clubName}` : "Statistik dan peringkat pemain di seluruh platform"}
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Pemain", value: globalPlayers.length, icon: <Medal className="w-5 h-5 text-primary" /> },
          { label: "Total Gol", value: globalPlayers.reduce((a, p) => a + p.totalGoals, 0), icon: <Target className="w-5 h-5 text-gold" /> },
          { label: "Total Assist", value: globalPlayers.reduce((a, p) => a + p.totalAssists, 0), icon: <TrendingUp className="w-5 h-5 text-navy" /> },
          { label: "Caps Internasional", value: globalPlayers.reduce((a, p) => a + p.internationalCaps, 0), icon: <Trophy className="w-5 h-5 text-purple-600" /> },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">{s.icon}</div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Scorers */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Target className="w-4 h-4 text-primary" />Top Skor</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>Pemain</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead className="text-right">Goals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topScorers.map((p, i) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-bold text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={p.photo} alt="" className="w-6 h-6 rounded-full bg-muted" />
                        <span className="font-medium text-sm">{p.name}</span>
                        <Badge variant="outline" className="text-[10px]">{p.position}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.currentClub}</TableCell>
                    <TableCell className="text-right font-bold tabular-nums text-primary">{p.totalGoals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Assists */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-navy" />Top Assist</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>Pemain</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead className="text-right">Assists</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAssists.map((p, i) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-bold text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={p.photo} alt="" className="w-6 h-6 rounded-full bg-muted" />
                        <span className="font-medium text-sm">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.currentClub}</TableCell>
                    <TableCell className="text-right font-bold tabular-nums text-navy">{p.totalAssists}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* High Potential Players */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Trophy className="w-4 h-4 text-gold" />Pemain Potensi Tertinggi</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {highPotential.map((p, i) => (
              <div key={p.id} className="text-center p-4 rounded-xl bg-muted/50 border">
                <div className="relative inline-block mb-2">
                  <img src={p.photo} alt={p.name} className="w-14 h-14 rounded-full bg-muted mx-auto" />
                  {i === 0 && <span className="absolute -top-1 -right-1 text-lg">👑</span>}
                </div>
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.position} • {p.currentClub}</p>
                <div className="mt-2 flex justify-center gap-3">
                  <div>
                    <p className="text-lg font-bold text-primary">{p.currentRating}</p>
                    <p className="text-[9px] text-muted-foreground">Rating</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gold">{p.potentialScore}</p>
                    <p className="text-[9px] text-muted-foreground">Potential</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
