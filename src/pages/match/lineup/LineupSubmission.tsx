import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PitchVisualization } from '@/components/match/PitchVisualization';

const mockLineup = {
  startingXI: [
    { number: 1, name: 'I Made Wirawan', position: 'GK', rating: 7.5 },
    { number: 2, name: 'Asnawi Mangkualam', position: 'RB', rating: 7.2 },
    { number: 3, name: 'Toni Kusuma', position: 'CB', rating: 7.4 },
    { number: 4, name: 'Joko Susilo', position: 'CB', rating: 7.1 },
    { number: 5, name: 'Andik Vermansah', position: 'LB', rating: 7.3 },
    { number: 6, name: 'Erik Riyanto', position: 'CM', rating: 7.2 },
    { number: 7, name: 'Saddil Ramdani', position: 'CM', rating: 7.4 },
    { number: 8, name: 'Miod Izin', position: 'RW', rating: 7.6 },
    { number: 9, name: 'Bambang Pamungkas', position: 'CF', rating: 8.1 },
    { number: 10, name: 'Evan Dimas', position: 'LW', rating: 7.8 },
    { number: 11, name: 'Ilija Spasojevic', position: 'ST', rating: 8.0 },
  ],
  bench: [
    { number: 12, name: 'Kurniawan Dwi Yulianto', position: 'GK', rating: 6.8 },
    { number: 13, name: 'Riko Simanjuntak', position: 'DF', rating: 6.9 },
    { number: 14, name: 'Rizki Pora', position: 'MF', rating: 6.7 },
    { number: 15, name: 'Stefano Lilipaly', position: 'FW', rating: 7.1 },
  ],
};

export default function LineupSubmission() {
  const [formation, setFormation] = useState('4-3-3');
  const [captain, setCaptain] = useState(9);
  const [status, setStatus] = useState('draft');

  const formations = ['4-3-3', '4-2-3-1', '3-5-2', '5-3-2', '5-4-1'];

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lineup Submission</h1>
            <p className="text-muted-foreground mt-1">SSB Garuda Muda vs Persikabo</p>
          </div>
          <div className="flex gap-2">
            <Badge className={status === 'draft' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
              {status === 'draft' ? 'Draft' : 'Submitted'}
            </Badge>
          </div>
        </div>
      </section>

      {/* Formation Selector */}
      <Card>
        <CardContent className="pt-6">
          <fieldset className="grid grid-cols-2 gap-4">
            <legend className="text-sm font-medium mb-2">Formation Selection</legend>
            <div>
              <label className="text-sm font-medium">Formation</label>
              <Select value={formation} onValueChange={setFormation}>
                <SelectTrigger aria-label="Select team formation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formations.map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" aria-label="Preview selected formation">Preview</Button>
              <Button aria-label="Save the selected formation">Save Formation</Button>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      {/* Pitch Visualization */}
      <PitchVisualization
        homeTeam="SSB Garuda Muda"
        awayTeam="Persikabo"
        homeFormation={formation}
        homeLineup={mockLineup.startingXI}
        readOnly={false}
      />

      {/* Starting XI */}
      <Card>
        <CardHeader>
          <CardTitle id="starting-xi-title">Starting XI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2" role="region" aria-labelledby="starting-xi-title">
            {mockLineup.startingXI.map((player) => (
              <button
                key={player.number}
                className={`p-3 rounded-lg text-center cursor-pointer transition focus:outline-offset-2 focus:outline-2 focus:outline-blue-600 ${  
                  captain === player.number
                    ? 'bg-blue-100 border-2 border-blue-600'
                    : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                }`}
                onClick={() => setCaptain(player.number)}
                aria-label={`${player.name}, ${player.position}, number ${player.number}${captain === player.number ? ', selected as captain' : ''}`}
                aria-pressed={captain === player.number}
              >
                <div className="font-bold text-lg">{player.number}</div>
                <div className="text-xs font-medium truncate">{player.name.split(' ')[0]}</div>
                <div className="text-xs text-muted-foreground">{player.position}</div>
                {captain === player.number && <div className="text-xs mt-1">⭐ Captain</div>}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bench */}
      <Card>
        <CardHeader>
          <CardTitle>Bench Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mockLineup.bench.map((player) => (
              <div key={player.number} className="p-3 bg-gray-50 rounded-lg border">
                <div className="font-bold">{player.number}</div>
                <div className="text-sm font-medium">{player.name}</div>
                <div className="text-xs text-muted-foreground">{player.position}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setStatus('draft')}
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => setStatus('submitted')}
        >
          Submit Lineup
        </Button>
      </div>
    </main>
  );
}
