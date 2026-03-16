import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMatch } from '../context/MatchContext';
import { MatchSwitcher } from '../components/MatchSwitcher';
import { LiveScoreHeader } from '../components/LiveScoreHeader';
import { FileText, Download } from 'lucide-react';
import { useState } from 'react';

export default function RefereeReport() {
  const { activeMatch, events } = useMatch();
  const [notes, setNotes] = useState('Match was conducted according to regulations. No major incidents occurred.');

  const goals = events.filter((e) => e.type === 'Goal');
  const yellows = events.filter((e) => e.type === 'Yellow Card');
  const reds = events.filter((e) => e.type === 'Red Card');
  const subs = events.filter((e) => e.type === 'Substitution');

  return (
    <div className="space-y-6" role="main" aria-label="Referee report">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Referee Report</h1>
          <p className="text-muted-foreground mt-1">Official post-match referee documentation</p>
        </div>
        <Button className="gap-2"><Download className="w-4 h-4" /> Export PDF</Button>
      </div>

      <MatchSwitcher />

      {!activeMatch ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih pertandingan</Card>
      ) : (
        <>
          <LiveScoreHeader />

          {/* Referee Details */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Match Officials</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Referee</p>
                <p className="text-sm font-medium">{activeMatch.referee}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assistant Referee 1</p>
                <p className="text-sm font-medium">Ahmad Fauzi</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assistant Referee 2</p>
                <p className="text-sm font-medium">Budi Hartono</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fourth Official</p>
                <p className="text-sm font-medium">Candra Wijaya</p>
              </div>
            </div>
          </Card>

          {/* Event Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <p className="text-3xl font-black text-primary tabular-nums">{goals.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Goals</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-black tabular-nums" style={{ color: 'hsl(var(--chart-4))' }}>{yellows.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Yellow Cards</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-black text-destructive tabular-nums">{reds.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Red Cards</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-black tabular-nums">{subs.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Substitutions</p>
            </Card>
          </div>

          {/* Disciplinary Actions */}
          {(yellows.length > 0 || reds.length > 0) && (
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Disciplinary Actions</h2>
              <div className="space-y-2">
                {[...yellows, ...reds].sort((a, b) => a.minute - b.minute).map((card) => (
                  <div key={card.id} className="flex items-center gap-3 p-3 rounded-lg border">
                    <Badge variant="outline" className="font-mono">{card.minute}'</Badge>
                    <span>{card.type === 'Yellow Card' ? '🟨' : '🟥'}</span>
                    <span className="text-sm font-medium">{card.player}</span>
                    <Badge variant="secondary">
                      {card.team === 'home' ? activeMatch.homeTeam : activeMatch.awayTeam}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Referee Notes */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Referee Notes</h2>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-32 font-mono text-sm"
              placeholder="Add referee observations and notes..."
            />
            <div className="flex gap-2 mt-4">
              <Button>Save Report</Button>
              <Button variant="outline">Submit Final</Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
