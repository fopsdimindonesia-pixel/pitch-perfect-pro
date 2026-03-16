import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMatch } from '../context/MatchContext';
import { useRole } from '@/context/RoleContext';

export default function LineupSubmission() {
  const { activeMatch, homeRoster, awayRoster } = useMatch();
  const { role } = useRole();
  const isClub = role === 'club';
  const isEO = role === 'eo';

  const [formation, setFormation] = useState('4-3-3');
  const [captain, setCaptain] = useState<number | null>(null);
  const [status, setStatus] = useState<'draft' | 'submitted'>('draft');

  const formations = ['4-3-3', '4-2-3-1', '3-5-2', '5-3-2', '5-4-1'];
  const starters = homeRoster.filter(p => p.starting);
  const bench = homeRoster.filter(p => !p.starting);

  const canEdit = isClub || isEO;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isClub ? 'Submission Lineup' : 'Lineup Pertandingan'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {activeMatch ? `${activeMatch.homeTeam} vs ${activeMatch.awayTeam}` : 'Pilih pertandingan terlebih dahulu'}
          </p>
        </div>
        <Badge className={status === 'draft' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
          {status === 'draft' ? 'Draft' : 'Submitted'}
        </Badge>
      </div>

      {/* Formation Selector */}
      {canEdit && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Formasi</label>
                <Select value={formation} onValueChange={setFormation}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {formations.map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button variant="outline">Preview</Button>
                <Button>Simpan Formasi</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Starting XI */}
      <Card>
        <CardHeader><CardTitle>Starting XI</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {starters.map(player => (
              <button
                key={player.id}
                className={`p-3 rounded-lg text-center transition border ${
                  captain === player.number
                    ? 'bg-primary/10 border-primary'
                    : 'bg-muted/50 border-border hover:bg-muted'
                } ${canEdit ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => canEdit && setCaptain(player.number)}
                disabled={!canEdit}
              >
                <div className="font-bold text-lg">{player.number}</div>
                <div className="text-xs font-medium truncate">{player.name.split(' ')[0]}</div>
                <div className="text-xs text-muted-foreground">{player.position}</div>
                {captain === player.number && <div className="text-xs mt-1">⭐ Kapten</div>}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bench */}
      <Card>
        <CardHeader><CardTitle>Pemain Cadangan</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {bench.map(player => (
              <div key={player.id} className="p-3 bg-muted/50 rounded-lg border">
                <div className="font-bold">{player.number}</div>
                <div className="text-sm font-medium">{player.name}</div>
                <div className="text-xs text-muted-foreground">{player.position}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {canEdit && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStatus('draft')}>Simpan Draft</Button>
          <Button onClick={() => setStatus('submitted')}>
            {isClub ? 'Submit Lineup' : 'Konfirmasi Lineup'}
          </Button>
        </div>
      )}
    </div>
  );
}
