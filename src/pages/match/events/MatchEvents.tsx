import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Goal, AlertCircle, Users } from 'lucide-react';

const mockGoals = [
  { id: 1, min: 12, player: 'Bambang Pamungkas', assist: 'Evan Dimas', team: 'home' },
  { id: 2, min: 31, player: 'Marko Milic', assist: null, team: 'away' },
  { id: 3, min: 77, player: 'Ilija Spasojevic', assist: 'Bambang Pamungkas', team: 'home' },
];

const mockCards = [
  { id: 1, min: 24, player: 'Toni Kusuma', team: 'away', type: 'yellow' as const },
  { id: 2, min: 68, player: 'Andik Vermansah', team: 'home', type: 'yellow' as const },
];

const mockSubs = [
  { id: 1, min: 52, playerOut: 'Rizki Pora', playerIn: 'Saddil Ramdani', team: 'home' },
];

export default function MatchEvents() {
  const [activeTab, setActiveTab] = useState('goals');

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Match Events</h1>
            <p className="text-muted-foreground mt-1">SSB Garuda Muda vs Persikabo</p>
          </div>
          <Button aria-label="Record a new match event">Record Event</Button>
        </div>
      </section>

      {/* Live Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-red-50">
        <CardContent className="p-8">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">SSB Garuda Muda</p>
              <p className="text-5xl font-black text-blue-600 mt-2">2</p>
            </div>
            <div className="text-center">
              <Badge className="mb-2">LIVE</Badge>
              <p className="text-lg font-semibold">45+2'</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Persikabo</p>
              <p className="text-5xl font-black text-red-600 mt-2">1</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3" role="tablist" aria-label="Match events categories">
          <TabsTrigger value="goals" className="gap-2" role="tab" aria-selected={activeTab === 'goals'} aria-controls="goals-panel">
            <Goal className="w-4 h-4" />
            Goals ({mockGoals.length})
          </TabsTrigger>
          <TabsTrigger value="cards" className="gap-2" role="tab" aria-selected={activeTab === 'cards'} aria-controls="cards-panel">
            <AlertCircle className="w-4 h-4" />
            Cards ({mockCards.length})
          </TabsTrigger>
          <TabsTrigger value="subs" className="gap-2" role="tab" aria-selected={activeTab === 'subs'} aria-controls="subs-panel">
            <Users className="w-4 h-4" />
            Subs ({mockSubs.length})
          </TabsTrigger>
        </TabsList>

        {/* Goals */}
        <TabsContent value="goals" id="goals-panel" role="tabpanel" aria-labelledby="goals-tab">
          <Card>
            <CardHeader>
              <CardTitle>Goals Recorded</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockGoals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={goal.team === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}>
                      {goal.min}'
                    </Badge>
                    <div>
                      <p className="font-semibold">{goal.player}</p>
                      {goal.assist && <p className="text-xs text-muted-foreground">Assist: {goal.assist}</p>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" aria-label={`Edit goal by ${goal.player}`}>Edit</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cards */}
        <TabsContent value="cards" id="cards-panel" role="tabpanel" aria-labelledby="cards-tab">
          <Card>
            <CardHeader>
              <CardTitle>Disciplinary Cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCards.map((card) => (
                <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={card.team === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}>
                      {card.min}'
                    </Badge>
                    <div>
                      <p className="font-semibold">{card.player}</p>
                      <p className="text-xs text-muted-foreground" role="img" aria-label={`${card.type === 'yellow' ? 'Yellow' : 'Red'} card`}>{card.type === 'yellow' ? '🟨 Yellow Card' : '🟥 Red Card'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" aria-label={`Edit ${card.type} card for ${card.player}`}>Edit</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Substitutions */}
        <TabsContent value="subs" id="subs-panel" role="tabpanel" aria-labelledby="subs-tab">
          <Card>
            <CardHeader>
              <CardTitle>Substitutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSubs.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={sub.team === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}>
                      {sub.min}'
                    </Badge>
                    <div>
                      <p className="font-semibold">{sub.playerOut} → {sub.playerIn}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" aria-label={`Edit substitution: ${sub.playerOut} replaced by ${sub.playerIn}`}>Edit</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
