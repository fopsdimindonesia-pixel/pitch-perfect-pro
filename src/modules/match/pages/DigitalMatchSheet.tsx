import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMatch } from '../context/MatchContext';
import { MatchSwitcher } from '../components/MatchSwitcher';
import { LiveScoreHeader } from '../components/LiveScoreHeader';

export default function DigitalMatchSheet() {
  const { activeMatch, events, homeRoster, awayRoster } = useMatch();

  const homeStarting = homeRoster.filter((p) => p.starting);
  const homeBench = homeRoster.filter((p) => !p.starting);
  const awayStarting = awayRoster.filter((p) => p.starting);
  const awayBench = awayRoster.filter((p) => !p.starting);

  return (
    <div className="space-y-6" role="main" aria-label="Digital match sheet">
      <div>
        <h1 className="text-3xl font-bold">Digital Match Sheet</h1>
        <p className="text-muted-foreground mt-1">Complete match documentation with dual lineups</p>
      </div>

      <MatchSwitcher />

      {!activeMatch ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih pertandingan</Card>
      ) : (
        <>
          <LiveScoreHeader />

          <Tabs defaultValue="lineups">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lineups">Lineups</TabsTrigger>
              <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
              <TabsTrigger value="info">Match Info</TabsTrigger>
            </TabsList>

            <TabsContent value="lineups" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Home Lineup */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{activeMatch.homeTeam}</h3>
                    <Badge variant="outline">HOME</Badge>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Starting XI</p>
                    {homeStarting.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold w-6 text-center">{p.number}</span>
                          <span>{p.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{p.position}</Badge>
                      </div>
                    ))}
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-4 mb-2">Substitutes</p>
                    {homeBench.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-mono w-6 text-center">{p.number}</span>
                          <span>{p.name}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px]">{p.position}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Away Lineup */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{activeMatch.awayTeam}</h3>
                    <Badge variant="outline">AWAY</Badge>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Starting XI</p>
                    {awayStarting.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold w-6 text-center">{p.number}</span>
                          <span>{p.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{p.position}</Badge>
                      </div>
                    ))}
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-4 mb-2">Substitutes</p>
                    {awayBench.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-mono w-6 text-center">{p.number}</span>
                          <span>{p.name}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px]">{p.position}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-4">
              <Card className="p-4">
                {events.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Belum ada event</p>
                ) : (
                  <div className="space-y-3">
                    {events
                      .sort((a, b) => a.minute - b.minute)
                      .map((ev) => (
                        <div key={ev.id} className="flex items-center gap-3 p-3 rounded-lg border">
                          <Badge variant="outline" className="font-mono w-12 justify-center">{ev.minute}'</Badge>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {ev.type === 'Goal' && '⚽'}
                                {ev.type === 'Yellow Card' && '🟨'}
                                {ev.type === 'Red Card' && '🟥'}
                                {ev.type === 'Substitution' && '🔄'}
                              </span>
                              <span className="text-sm font-medium">{ev.type}</span>
                              <Badge className={ev.team === 'home' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'} variant="secondary">
                                {ev.team === 'home' ? activeMatch.homeTeam : activeMatch.awayTeam}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {ev.player}
                              {ev.assist && ` (Assist: ${ev.assist})`}
                              {ev.playerOut && ` — ${ev.playerOut} ↔ ${ev.playerIn}`}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="info" className="mt-4">
              <Card className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium">Competition</p>
                    <p className="text-sm text-muted-foreground">{activeMatch.competitionName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Matchday</p>
                    <p className="text-sm text-muted-foreground">{activeMatch.matchday}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Venue</p>
                    <p className="text-sm text-muted-foreground">{activeMatch.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Referee</p>
                    <p className="text-sm text-muted-foreground">{activeMatch.referee}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">{activeMatch.date} — {activeMatch.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge className="mt-1">{activeMatch.status}</Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
