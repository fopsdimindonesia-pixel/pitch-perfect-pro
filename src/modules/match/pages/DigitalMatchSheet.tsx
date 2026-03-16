import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useMatch, MatchEvent } from '../context/MatchContext';
import { MatchSwitcher } from '../components/MatchSwitcher';
import { LiveScoreHeader } from '../components/LiveScoreHeader';
import { useRole } from '@/context/RoleContext';

export default function DigitalMatchSheet() {
  const { activeMatch, events, addEvent, homeRoster, awayRoster } = useMatch();
  const { role } = useRole();

  // Event recorder state (EO only)
  const [eventType, setEventType] = useState<MatchEvent['type']>('Goal');
  const [team, setTeam] = useState<'home' | 'away'>('home');
  const [minute, setMinute] = useState('');
  const [player, setPlayer] = useState('');
  const [assist, setAssist] = useState('');

  const roster = team === 'home' ? homeRoster : awayRoster;

  const homeStarting = homeRoster.filter((p) => p.starting);
  const homeBench = homeRoster.filter((p) => !p.starting);
  const awayStarting = awayRoster.filter((p) => p.starting);
  const awayBench = awayRoster.filter((p) => !p.starting);

  const goals = events.filter((e) => e.type === 'Goal');
  const cards = events.filter((e) => e.type === 'Yellow Card' || e.type === 'Red Card');
  const subs = events.filter((e) => e.type === 'Substitution');

  const handleAddEvent = () => {
    if (!activeMatch || !minute || !player) return;
    addEvent({
      matchId: activeMatch.id,
      minute: parseInt(minute),
      type: eventType,
      team,
      player,
      assist: assist || null,
    });
    setMinute('');
    setPlayer('');
    setAssist('');
  };

  const renderEventList = (filtered: typeof events) => (
    filtered.length === 0 ? (
      <p className="text-center text-muted-foreground py-6">Belum ada event</p>
    ) : (
      <div className="space-y-2">
        {filtered.sort((a, b) => a.minute - b.minute).map((ev) => (
          <div key={ev.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50">
            <Badge variant="outline" className="font-mono w-12 justify-center">{ev.minute}'</Badge>
            <span className="text-lg">
              {ev.type === 'Goal' && '⚽'}
              {ev.type === 'Yellow Card' && '🟨'}
              {ev.type === 'Red Card' && '🟥'}
              {ev.type === 'Substitution' && '🔄'}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{ev.type}</span>
                <Badge className={ev.team === 'home' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'} variant="secondary">
                  {ev.team === 'home' ? activeMatch!.homeTeam : activeMatch!.awayTeam}
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
    )
  );

  return (
    <div className="space-y-6" role="main" aria-label="Digital match sheet">
      <div>
        <h1 className="text-3xl font-bold">Digital Match Sheet</h1>
        <p className="text-muted-foreground mt-1">Complete match documentation — lineups, events & info</p>
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

            {/* === LINEUPS TAB === */}
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

            {/* === EVENTS TAB (with EO-only recorder) === */}
            <TabsContent value="events" className="space-y-4 mt-4">
              {/* Event Recording Form — EO only */}
              {role === 'eo' && (
                <Card className="p-6">
                  <h2 className="font-semibold mb-4">Record Event</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <Select value={eventType} onValueChange={(v) => setEventType(v as MatchEvent['type'])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Goal">⚽ Goal</SelectItem>
                        <SelectItem value="Yellow Card">🟨 Yellow Card</SelectItem>
                        <SelectItem value="Red Card">🟥 Red Card</SelectItem>
                        <SelectItem value="Substitution">🔄 Substitution</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={team} onValueChange={(v) => setTeam(v as 'home' | 'away')}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">{activeMatch.homeTeam}</SelectItem>
                        <SelectItem value="away">{activeMatch.awayTeam}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input type="number" placeholder="Minute" value={minute} onChange={(e) => setMinute(e.target.value)} min="1" max="120" />

                    <Select value={player} onValueChange={setPlayer}>
                      <SelectTrigger><SelectValue placeholder="Player" /></SelectTrigger>
                      <SelectContent>
                        {roster.map((p) => (
                          <SelectItem key={p.id} value={p.name}>{p.number} — {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button onClick={handleAddEvent} className="gap-2" disabled={!minute || !player}>
                      <Plus className="w-4 h-4" /> Record
                    </Button>
                  </div>
                  {eventType === 'Goal' && (
                    <div className="mt-3">
                      <Select value={assist} onValueChange={setAssist}>
                        <SelectTrigger className="w-64"><SelectValue placeholder="Assist (optional)" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value=" ">No assist</SelectItem>
                          {roster.map((p) => (
                            <SelectItem key={p.id} value={p.name}>{p.number} — {p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </Card>
              )}

              {/* Event Timeline with filter tabs */}
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All ({events.length})</TabsTrigger>
                  <TabsTrigger value="goals">Goals ({goals.length})</TabsTrigger>
                  <TabsTrigger value="cards">Cards ({cards.length})</TabsTrigger>
                  <TabsTrigger value="subs">Subs ({subs.length})</TabsTrigger>
                </TabsList>

                {[
                  { key: 'all', data: events },
                  { key: 'goals', data: goals },
                  { key: 'cards', data: cards },
                  { key: 'subs', data: subs },
                ].map(({ key, data }) => (
                  <TabsContent key={key} value={key}>
                    <Card className="p-4">
                      {renderEventList(data)}
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            {/* === MATCH INFO TAB === */}
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
