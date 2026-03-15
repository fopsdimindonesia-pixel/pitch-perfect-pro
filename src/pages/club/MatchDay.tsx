import { useState } from "react";
import { mockMatches, mockStartingXI, mockBench } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MatchStatusBadge } from "@/components/shared/StatusBadges";
import { PlayerEligibilityBadge } from "@/components/shared/StatusBadges";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const upcomingMatch = mockMatches.find((m) => m.status === "Scheduled") || mockMatches[3];

export default function MatchDay() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [subs, setSubs] = useState<{ out: string; in: string; minute: number }[]>([]);

  const submit = () => {
    setSubmitted(true);
    toast({ title: "Lineup Submitted!", description: "Starting XI dan bangku cadangan telah dikirim ke EO." });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Match header */}
      <Card className="match-card-scheduled overflow-hidden">
        <div className="bg-navy text-navy-foreground p-4">
          <p className="text-[10px] uppercase tracking-widest text-navy-foreground/50 text-center">{upcomingMatch.competitionName}</p>
          <div className="flex items-center justify-between gap-4 mt-3">
            <div className="flex-1 text-right">
              <p className="font-bold">SSB Garuda Muda</p>
              <p className="text-[10px] text-navy-foreground/50">Kandang</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <MatchStatusBadge status="Scheduled" />
              <p className="text-base font-bold mt-2">{upcomingMatch.time}</p>
              <p className="text-[10px] text-navy-foreground/50">{upcomingMatch.date}</p>
            </div>
            <div className="flex-1">
              <p className="font-bold">{upcomingMatch.awayTeam}</p>
              <p className="text-[10px] text-navy-foreground/50">Tandang</p>
            </div>
          </div>
          <p className="text-[10px] text-center text-navy-foreground/40 mt-2">📍 {upcomingMatch.venue}</p>
        </div>
      </Card>

      {/* Starting XI */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Starting XI</CardTitle>
            <Badge className={cn("text-[10px] border-0", submitted ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground")}>
              {submitted ? "✓ Submitted" : "Draft"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {mockStartingXI.map((slot) => (
            <div key={slot.slot} className={cn("flex items-center gap-3 py-2 px-3 rounded-lg border", slot.player.eligibility !== "Verified" ? "border-gold/30 bg-gold/5" : "border-transparent hover:bg-accent/50 transition-colors")}>
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold flex-shrink-0">{slot.player.number}</span>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold w-10 text-center flex-shrink-0">{slot.position}</span>
              <span className="text-sm font-medium flex-1 truncate">{slot.player.name}</span>
              <PlayerEligibilityBadge status={slot.player.eligibility as "Verified" | "Pending" | "Suspended"} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bench */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Bangku Cadangan ({mockBench.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {mockBench.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors">
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold flex-shrink-0">{p.number}</span>
              <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded font-semibold w-10 text-center flex-shrink-0">{p.position}</span>
              <span className="text-sm font-medium flex-1 truncate">{p.name}</span>
              <PlayerEligibilityBadge status={p.eligibility as "Verified" | "Pending" | "Suspended"} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Substitution log */}
      {subs.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Log Pergantian</CardTitle></CardHeader>
          <CardContent>
            {subs.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs py-1">
                <ArrowLeftRight className="w-3 h-3 text-primary" />
                <span>Menit {s.minute}: {s.out} → {s.in}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Button className="w-full gap-2" onClick={submit} disabled={submitted}>
        <Check className="w-4 h-4" />
        {submitted ? "Lineup Sudah Dikirim" : "Submit Lineup"}
      </Button>
    </div>
  );
}
