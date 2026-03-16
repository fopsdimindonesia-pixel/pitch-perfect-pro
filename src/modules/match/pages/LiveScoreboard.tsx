import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMatch } from '../context/MatchContext';
import { MatchSwitcher } from '../components/MatchSwitcher';
import { LiveScoreHeader } from '../components/LiveScoreHeader';

export default function LiveScoreboard() {
  const { activeMatch, matches, events } = useMatch();

  const liveMatches = matches.filter((m) => m.status === 'Live');
  const todayScheduled = matches.filter((m) => m.status === 'Scheduled');

  return (
    <div className="space-y-6" role="main" aria-label="Live scoreboard">
      <div>
        <h1 className="text-3xl font-bold">Live Scoreboard</h1>
        <p className="text-muted-foreground mt-1">Real-time scores across all competitions</p>
      </div>

      <MatchSwitcher />

      {activeMatch && <LiveScoreHeader />}

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" /> Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {liveMatches.map((m) => (
              <Card key={m.id} className="p-4 cursor-pointer hover:ring-2 ring-primary/20 transition-all"
                onClick={() => {/* handled by context */}}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.homeTeam}</p>
                    <p className="text-sm font-medium">{m.awayTeam}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black tabular-nums">{m.homeScore} - {m.awayScore}</p>
                    <Badge className="bg-destructive/10 text-destructive text-[10px]">LIVE</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{m.venue} · {m.competitionName}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {todayScheduled.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3">Upcoming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {todayScheduled.map((m) => (
              <Card key={m.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.homeTeam}</p>
                    <p className="text-sm font-medium">{m.awayTeam}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{m.time}</p>
                    <Badge variant="outline" className="text-[10px]">{m.date}</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{m.venue} · {m.competitionName}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Finished */}
      <div>
        <h2 className="font-semibold mb-3">Recent Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {matches.filter((m) => m.status === 'Finished').map((m) => (
            <Card key={m.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{m.homeTeam}</p>
                  <p className="text-sm font-medium">{m.awayTeam}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black tabular-nums">{m.homeScore} - {m.awayScore}</p>
                  <Badge variant="secondary" className="text-[10px]">FT</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{m.venue} · {m.competitionName}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
