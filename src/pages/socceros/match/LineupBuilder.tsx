import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SoccerosDashboardLayout, PageHeader, PitchVisualization } from '@/components/socceros/DashboardLayout';
import { mockPlayers, type Player } from '@/lib/socceros/mockData';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

export default function LineupBuilder() {
  const [formation, setFormation] = useState('4-3-3');
  const [selectedPlayers, setSelectedPlayers] = useState(mockPlayers.slice(0, 11));
  const [bench, setBench] = useState(mockPlayers.slice(11));

  const formations = ['4-2-3-1', '4-3-3', '3-5-2', '5-3-2', '3-4-3', '4-1-4-1'];

  const fieldPositions = {
    '4-3-3': {
      GK: 1,
      DEF: 4,
      MID: 3,
      FWD: 3,
    },
    '4-2-3-1': {
      GK: 1,
      DEF: 4,
      MID: 5,
      FWD: 1,
    },
  };

  return (
    <SoccerosDashboardLayout role="CLUB">
      <PageHeader
        title="Lineup Builder"
        subtitle={`Setup starting XI and substitutes - ${formation} Formation`}
        icon="🏟️"
        action={<Button>💾 Save Lineup</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Formation Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Formation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {formations.map((f) => (
              <button
                key={f}
                onClick={() => setFormation(f)}
                className={`w-full px-4 py-2 rounded-lg font-medium border transition-colors ${
                  formation === f
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-200 text-gray-700 hover:border-blue-300'
                }`}
              >
                {f}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Pitch and Squad */}
        <div className="lg:col-span-3 space-y-6">
          {/* Pitch Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Pitch Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <PitchVisualization />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
                <p className="font-semibold mb-2">Squad on Field:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPlayers.map((player: Player) => (
                    <Badge key={player.id} className="bg-blue-100 text-blue-800">
                      #{player.number} {player.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Starting XI */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Starting XI (11 Players)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedPlayers.map((player: Player, idx: number) => (
              <div key={idx} className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-2xl font-bold">{player.number}</p>
                    <p className="font-semibold">{player.name}</p>
                  </div>
                  <button className="p-1 hover:bg-blue-200 rounded">
                    <GripVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>{player.position}</p>
                  <p>{player.nationality}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Substitutes Bench */}
      <Card>
        <CardHeader>
          <CardTitle>Substitutes Bench</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {bench.slice(0, 7).map((player: Player, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold w-8">{player.number}</p>
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-muted-foreground">{player.position}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" /> Add to XI
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </SoccerosDashboardLayout>
  );
}
