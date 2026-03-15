import { useState } from "react";
import { mockMatches, mockStartingXI, mockBench, mockMatchEvents } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MatchStatusBadge } from "@/components/shared/StatusBadges";
import { PlayerEligibilityBadge } from "@/components/shared/StatusBadges";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Target, CreditCard, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const match = mockMatches[2]; // Live match

const eventIcons: Record<string, React.ReactNode> = {
  "Goal": <Target className="w-3.5 h-3.5 text-primary" />,
  "Yellow Card": <CreditCard className="w-3.5 h-3.5 text-yellow-500" />,
  "Red Card": <CreditCard className="w-3.5 h-3.5 text-destructive" />,
};

export default function MatchSheet() {
  const { toast } = useToast();
  const [homeScore, setHomeScore] = useState(match.homeScore);
  const [awayScore, setAwayScore] = useState(match.awayScore);
  const [events, setEvents] = useState(mockMatchEvents);

  const addGoal = (team: "home" | "away") => {
    if (team === "home") setHomeScore((s) => s + 1);
    else setAwayScore((s) => s + 1);
    toast({ title: "Gol dicatat", description: `Skor diperbarui: ${team === "home" ? homeScore + 1 : homeScore} - ${team === "away" ? awayScore + 1 : awayScore}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Match Sheet</h1>
        <p className="text-muted-foreground text-sm mt-1">Input skor, verifikasi pemain, dan catat event pertandingan.</p>
      </div>

      {/* Score Board */}
      <Card className="match-card-live overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-navy text-navy-foreground p-4">
            <div className="text-center mb-1">
              <p className="text-[10px] uppercase tracking-widest text-navy-foreground/60">{match.competitionName}</p>
              <div className="flex justify-center mt-1"><MatchStatusBadge status="Live" /></div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-4">
              <div className="flex-1 text-right">
                <p className="font-bold text-lg">{match.homeTeam}</p>
                <p className="text-xs text-navy-foreground/60 mt-0.5">Kandang</p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-white/20 text-navy-foreground hover:bg-white/10 bg-transparent" onClick={() => addGoal("home")}>
                  + Gol
                </Button>
              </div>
              <div className="text-center flex-shrink-0">
                <p className="text-4xl font-black tabular-nums tracking-tight">{homeScore} — {awayScore}</p>
                <p className="text-xs text-navy-foreground/50 mt-1">{match.venue}</p>
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-lg">{match.awayTeam}</p>
                <p className="text-xs text-navy-foreground/60 mt-0.5">Tandang</p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-white/20 text-navy-foreground hover:bg-white/10 bg-transparent" onClick={() => addGoal("away")}>
                  + Gol
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lineups */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {/* Home lineup */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{match.homeTeam}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-3">
              {mockStartingXI.map((slot) => (
                <div key={slot.slot} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-accent/50 transition-colors">
                  <span className="w-5 text-center text-[10px] font-bold text-muted-foreground tabular-nums">{slot.player.number}</span>
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-semibold text-muted-foreground w-9 text-center flex-shrink-0">{slot.position}</span>
                  <span className="text-xs font-medium truncate flex-1">{slot.player.name}</span>
                  <PlayerEligibilityBadge status={slot.player.eligibility as "Verified" | "Pending" | "Suspended"} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Away lineup - mirror */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{match.awayTeam}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-3">
              {mockBench.map((p) => (
                <div key={p.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-accent/50 transition-colors">
                  <span className="w-5 text-center text-[10px] font-bold text-muted-foreground tabular-nums">{p.number}</span>
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-semibold text-muted-foreground w-9 text-center flex-shrink-0">{p.position}</span>
                  <span className="text-xs font-medium truncate flex-1">{p.name}</span>
                  <PlayerEligibilityBadge status={p.eligibility as "Verified" | "Pending" | "Suspended"} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Event Log */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Event Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            {events.map((ev) => (
              <div key={ev.id} className={cn("flex items-start gap-3 py-2 px-2 rounded border-l-2", ev.type === "Goal" ? "border-l-primary bg-primary/5" : "border-l-yellow-400 bg-yellow-400/5")}>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-bold tabular-nums text-muted-foreground">{ev.minute}'</span>
                  {eventIcons[ev.type]}
                </div>
                <div>
                  <p className="text-xs font-medium">{ev.player}</p>
                  {ev.assist && <p className="text-[10px] text-muted-foreground">Assist: {ev.assist}</p>}
                  <Badge className={cn("text-[10px] px-1.5 py-0 border-0 mt-0.5", ev.team === "home" ? "bg-primary/10 text-primary" : "bg-navy/10 text-navy")}>
                    {ev.team === "home" ? match.homeTeam : match.awayTeam}
                  </Badge>
                </div>
              </div>
            ))}
            {/* Add event form */}
            <div className="pt-3 border-t border-border space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Tambah Event</p>
              <div className="flex gap-2">
                <Input placeholder="Menit" className="h-7 text-xs w-16 flex-shrink-0" />
                <Input placeholder="Nama pemain" className="h-7 text-xs" />
              </div>
              <div className="flex gap-1">
                <Button size="sm" className="flex-1 h-7 text-xs gap-1" onClick={() => toast({ title: "Event ditambah" })}>
                  <Target className="w-3 h-3" />Gol
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1">
                  <AlertTriangle className="w-3 h-3 text-yellow-500" />Kartu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
