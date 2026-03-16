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

export default function MatchEventRecorder() {
  const { activeMatch, events, addEvent, homeRoster, awayRoster } = useMatch();
  const [eventType, setEventType] = useState<MatchEvent['type']>('Goal');
  const [team, setTeam] = useState<'home' | 'away'>('home');
  const [minute, setMinute] = useState('');
  const [player, setPlayer] = useState('');
  const [assist, setAssist] = useState('');

  const roster = team === 'home' ? homeRoster : awayRoster;

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

  const goals = events.filter((e) => e.type === 'Goal');
  const cards = events.filter((e) => e.type === 'Yellow Card' || e.type === 'Red Card');
  const subs = events.filter((e) => e.type === 'Substitution');

  return (
    <div className="space-y-6" role="main" aria-label="Match event recorder">
      <div>
        <h1 className="text-3xl font-bold">Event Recorder</h1>
        <p className="text-muted-foreground mt-1">Record goals, cards, and substitutions in real-time</p>
      </div>

      <MatchSwitcher />

      {!activeMatch ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih pertandingan</Card>
      ) : (
        <>
          <LiveScoreHeader />

          {/* Event Recorder Form */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Add Event</h2>
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

          {/* Events Display */}
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({events.length})</TabsTrigger>
              <TabsTrigger value="goals">Goals ({goals.length})</TabsTrigger>
              <TabsTrigger value="cards">Cards ({cards.length})</TabsTrigger>
              <TabsTrigger value="subs">Subs ({subs.length})</TabsTrigger>
            </TabsList>

            {['all', 'goals', 'cards', 'subs'].map((tab) => {
              const filtered = tab === 'all' ? events : tab === 'goals' ? goals : tab === 'cards' ? cards : subs;
              return (
                <TabsContent key={tab} value={tab}>
                  <Card className="p-4">
                    {filtered.length === 0 ? (
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
                              <p className="text-sm font-medium">{ev.player}</p>
                              {ev.assist && <p className="text-xs text-muted-foreground">Assist: {ev.assist}</p>}
                            </div>
                            <Badge className={ev.team === 'home' ? 'bg-primary/10 text-primary' : 'bg-secondary'} variant="secondary">
                              {ev.team === 'home' ? activeMatch.homeTeam : activeMatch.awayTeam}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </>
      )}
    </div>
  );
}
