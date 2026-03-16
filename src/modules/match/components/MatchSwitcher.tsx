import { useMatch } from '../context/MatchContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  Live: 'bg-destructive/10 text-destructive',
  Scheduled: 'bg-primary/10 text-primary',
  Finished: 'bg-muted text-muted-foreground',
};

export function MatchSwitcher() {
  const { activeMatch, matches, setActiveMatchId } = useMatch();

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
      <Select value={activeMatch?.id ?? ''} onValueChange={setActiveMatchId}>
        <SelectTrigger className="w-80 h-9 text-sm font-medium">
          <SelectValue placeholder="Pilih pertandingan..." />
        </SelectTrigger>
        <SelectContent>
          {matches.map((m) => (
            <SelectItem key={m.id} value={m.id} className="text-sm">
              <span className="flex items-center gap-2">
                {m.homeTeam} vs {m.awayTeam}
                <Badge className={cn('text-[9px] px-1.5 py-0 rounded-full border-0', statusColors[m.status])}>
                  {m.status}
                </Badge>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {activeMatch && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{activeMatch.date}</span>
          <span>·</span>
          <span>{activeMatch.venue}</span>
          <span>·</span>
          <span>MD {activeMatch.matchday}</span>
        </div>
      )}
    </div>
  );
}
