import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { globalPlayers, careerEvents, transferRecords } from "@/lib/playerEcosystemData";

const typeConfig: Record<string, { color: string; emoji: string }> = {
  Transfer: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", emoji: "🔄" },
  Achievement: { color: "bg-primary/10 text-primary", emoji: "🏆" },
  International: { color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", emoji: "🌍" },
  Injury: { color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", emoji: "🩹" },
  Contract: { color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", emoji: "📝" },
  Milestone: { color: "bg-gold/15 text-gold-foreground", emoji: "⭐" },
};

export default function CareerTimeline() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const player = globalPlayers.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="p-6">
        <Card><CardContent className="pt-6 text-center">
          <p className="text-muted-foreground mb-4">Pemain tidak ditemukan.</p>
          <Button onClick={() => navigate("/player/registry")}>Kembali</Button>
        </CardContent></Card>
      </div>
    );
  }

  const events = careerEvents.filter((e) => e.playerId === id).sort((a, b) => b.date.localeCompare(a.date));
  const transfers = transferRecords.filter((t) => t.playerId === id);

  // Group events by year
  const eventsByYear = events.reduce<Record<number, typeof events>>((acc, event) => {
    if (!acc[event.year]) acc[event.year] = [];
    acc[event.year].push(event);
    return acc;
  }, {});

  const years = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/player/passport/${id}`)} className="h-10 w-10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Timeline</h1>
          <p className="text-muted-foreground">{player.name} • {player.globalId}</p>
        </div>
      </div>

      {/* Player Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-navy/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-5">
            <img src={player.photo} alt={player.name} className="w-16 h-16 rounded-xl bg-muted" />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{player.name}</h2>
              <p className="text-sm text-muted-foreground">{player.position} • {player.currentClub}</p>
            </div>
            <div className="hidden md:flex gap-6 text-center">
              <div><p className="text-2xl font-bold">{player.totalAppearances}</p><p className="text-xs text-muted-foreground">Appearances</p></div>
              <div><p className="text-2xl font-bold text-primary">{player.totalGoals}</p><p className="text-xs text-muted-foreground">Goals</p></div>
              <div><p className="text-2xl font-bold text-navy">{player.totalAssists}</p><p className="text-xs text-muted-foreground">Assists</p></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Summary */}
      {transfers.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Riwayat Transfer</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transfers.map((t) => (
                <div key={t.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="text-center min-w-[80px]">
                    <p className="text-sm font-semibold">{t.date}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="text-muted-foreground">{t.fromClub}</span> → <span className="font-semibold">{t.toClub}</span></p>
                  </div>
                  <Badge variant="outline">{t.type}</Badge>
                  <span className="text-sm font-semibold tabular-nums">{t.fee}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-navy to-muted" />

        <div className="space-y-8">
          {years.map((year) => (
            <div key={year}>
              {/* Year marker */}
              <div className="relative flex items-center mb-4">
                <div className="absolute left-[22px] w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                <div className="ml-16">
                  <span className="text-2xl font-black text-primary">{year}</span>
                </div>
              </div>

              {/* Events for year */}
              <div className="space-y-3 ml-16">
                {eventsByYear[year].map((event) => {
                  const config = typeConfig[event.type] || { color: "bg-muted text-muted-foreground", emoji: "📌" };
                  return (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{config.emoji}</span>
                              <p className="font-semibold">{event.title}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            {event.club && <p className="text-xs text-muted-foreground mt-1">📍 {event.club}</p>}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge className={config.color}>{event.type}</Badge>
                            <span className="text-[10px] text-muted-foreground">{event.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {events.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Belum ada data timeline karir untuk pemain ini.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
