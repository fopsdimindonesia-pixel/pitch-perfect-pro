import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, TrendingUp } from "lucide-react";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function CompetitionDashboard() {
  const { activeCompetition, matches, registrations } = useCompetition();

  const finishedMatches = matches.filter((m) => m.status === "Finished");
  const liveMatches = matches.filter((m) => m.status === "Live");
  const scheduledMatches = matches.filter((m) => m.status === "Scheduled");
  const approvedRegs = registrations.filter((r) => r.status === "Approved");

  return (
    <div className="space-y-6" role="main" aria-label="Competition dashboard">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Dashboard</h1>
        <p className="text-muted-foreground mt-1">Live competition overview</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi untuk melihat dashboard</Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Matches</p>
                  <p className="text-2xl font-bold mt-1">{matches.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary/60" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Live Now</p>
                  <p className="text-2xl font-bold mt-1">{liveMatches.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/60" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Registered Clubs</p>
                  <p className="text-2xl font-bold mt-1">{registrations.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary/60" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold mt-1">{approvedRegs.length}</p>
                </div>
                <Trophy className="w-8 h-8 text-primary/60" />
              </div>
            </Card>
          </div>

          {liveMatches.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold mb-4">🔴 Live Matches</h2>
              <div className="space-y-3">
                {liveMatches.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border bg-destructive/5">
                    <span className="text-sm font-medium flex-1">{m.homeTeam}</span>
                    <Badge className="font-mono mx-3">{m.homeScore} - {m.awayScore}</Badge>
                    <span className="text-sm font-medium flex-1 text-right">{m.awayTeam}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Upcoming Matches</h2>
            <div className="space-y-3">
              {scheduledMatches.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada jadwal pertandingan</p>
              ) : (
                scheduledMatches.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                    <span className="text-sm font-mono text-muted-foreground">{m.date} {m.time}</span>
                    <span className="text-sm font-medium flex-1 mx-4">{m.homeTeam}</span>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <span className="text-sm font-medium flex-1 ml-4">{m.awayTeam}</span>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                ))
              )}
            </div>
          </Card>

          {finishedMatches.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Recent Results</h2>
              <div className="space-y-2">
                {finishedMatches.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-2 text-sm border-b last:border-b-0">
                    <span>{m.homeTeam}</span>
                    <Badge className="font-mono">{m.homeScore}-{m.awayScore}</Badge>
                    <span>{m.awayTeam}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
