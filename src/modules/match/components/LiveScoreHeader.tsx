import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMatch } from '../context/MatchContext';
import { cn } from '@/lib/utils';

export function LiveScoreHeader() {
  const { activeMatch, events } = useMatch();
  if (!activeMatch) return null;

  const homeGoals = events.filter((e) => e.type === 'Goal' && e.team === 'home');
  const awayGoals = events.filter((e) => e.type === 'Goal' && e.team === 'away');

  return (
    <Card className={cn(
      'overflow-hidden',
      activeMatch.status === 'Live' && 'ring-2 ring-destructive/30'
    )}>
      <div className="bg-gradient-to-r from-primary/10 via-background to-primary/10 p-6">
        <div className="flex items-center justify-around">
          <div className="text-center flex-1">
            <p className="text-sm font-medium text-muted-foreground">{activeMatch.homeTeam}</p>
            <p className="text-5xl font-black mt-2 tabular-nums">{activeMatch.homeScore}</p>
            {homeGoals.length > 0 && (
              <div className="mt-2 space-y-0.5">
                {homeGoals.map((g) => (
                  <p key={g.id} className="text-xs text-muted-foreground">⚽ {g.player} {g.minute}'</p>
                ))}
              </div>
            )}
          </div>

          <div className="text-center px-6">
            {activeMatch.status === 'Live' ? (
              <Badge className="bg-destructive text-destructive-foreground animate-pulse mb-1">🔴 LIVE</Badge>
            ) : activeMatch.status === 'Finished' ? (
              <Badge variant="secondary">FT</Badge>
            ) : (
              <Badge variant="outline">{activeMatch.time}</Badge>
            )}
            <p className="text-xs text-muted-foreground mt-2">{activeMatch.venue}</p>
            <p className="text-xs text-muted-foreground">{activeMatch.date}</p>
          </div>

          <div className="text-center flex-1">
            <p className="text-sm font-medium text-muted-foreground">{activeMatch.awayTeam}</p>
            <p className="text-5xl font-black mt-2 tabular-nums">{activeMatch.awayScore}</p>
            {awayGoals.length > 0 && (
              <div className="mt-2 space-y-0.5">
                {awayGoals.map((g) => (
                  <p key={g.id} className="text-xs text-muted-foreground">⚽ {g.player} {g.minute}'</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <span>🏟️ {activeMatch.venue}</span>
          <span>·</span>
          <span>👨‍⚖️ {activeMatch.referee}</span>
          <span>·</span>
          <span>{activeMatch.competitionName} — MD {activeMatch.matchday}</span>
        </div>
      </div>
    </Card>
  );
}
