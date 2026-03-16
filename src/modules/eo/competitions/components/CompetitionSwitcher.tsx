import { useCompetition } from '../context/CompetitionContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  Active: 'bg-primary/10 text-primary',
  Draft: 'bg-secondary text-muted-foreground',
  Finished: 'bg-muted text-muted-foreground',
};

export function CompetitionSwitcher() {
  const { activeCompetition, competitions, setActiveCompetitionId } = useCompetition();

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
      <Select value={activeCompetition?.id ?? ''} onValueChange={setActiveCompetitionId}>
        <SelectTrigger className="w-64 h-9 text-sm font-medium">
          <SelectValue placeholder="Pilih kompetisi..." />
        </SelectTrigger>
        <SelectContent>
          {competitions.map((c) => (
            <SelectItem key={c.id} value={c.id} className="text-sm">
              <span className="flex items-center gap-2">
                {c.name}
                <Badge className={cn('text-[9px] px-1.5 py-0 rounded-full border-0 ml-1', statusColors[c.status])}>
                  {c.status}
                </Badge>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {activeCompetition && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{activeCompetition.format}</span>
          <span>·</span>
          <span>{activeCompetition.ageGroup}</span>
          <span>·</span>
          <span>{activeCompetition.clubs} klub</span>
        </div>
      )}
    </div>
  );
}
