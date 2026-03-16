import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function TacticalAnalysis() {
  const [activeTab, setActiveTab] = useState('formation');

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tactical Analysis</h1>
            <p className="text-muted-foreground mt-1">SSB Garuda Muda vs Persikabo</p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Key match metrics">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">58%</div>
            <p className="text-sm text-muted-foreground">Possession</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">82%</div>
            <p className="text-sm text-muted-foreground">Pass Accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">7.8/10</div>
            <p className="text-sm text-muted-foreground">Avg Pressure</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">↗</div>
            <p className="text-sm text-muted-foreground text-green-600">Momentum</p>
          </CardContent>
        </Card>
      </section>

      {/* Tactics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4" role="tablist" aria-label="Tactical analysis tabs">
          <TabsTrigger value="formation" role="tab" aria-selected={activeTab === 'formation'} aria-controls="formation-panel">Formation</TabsTrigger>
          <TabsTrigger value="pressure" role="tab" aria-selected={activeTab === 'pressure'} aria-controls="pressure-panel">Pressure</TabsTrigger>
          <TabsTrigger value="passing" role="tab" aria-selected={activeTab === 'passing'} aria-controls="passing-panel">Passing</TabsTrigger>
          <TabsTrigger value="heatmap" role="tab" aria-selected={activeTab === 'heatmap'} aria-controls="heatmap-panel">Heatmap</TabsTrigger>
        </TabsList>

        {/* Formation */}
        <TabsContent value="formation" id="formation-panel" role="tabpanel" aria-labelledby="formation-tab">
          <Card>
            <CardHeader>
              <CardTitle>Formation Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">SSB Garuda Muda - 4-3-3</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Defensive formation with balanced midfield supporting attacking wings. Central defenders maintain high line.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Persikabo - 4-2-3-1</h3>
                <p className="text-sm text-muted-foreground">
                  Defensive setup protecting back line with double pivot. Limited pressing in attacking third.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pressure Map */}
        <TabsContent value="pressure" id="pressure-panel" role="tabpanel" aria-labelledby="pressure-tab">
          <Card>
            <CardHeader>
              <CardTitle>Pressure Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg opacity-50"></div>
              <p className="text-xs text-muted-foreground mt-2">Intensity visualization: Green (low) to Red (high)</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Passing Network */}
        <TabsContent value="passing" id="passing-panel" role="tabpanel" aria-labelledby="passing-tab">
          <Card>
            <CardHeader>
              <CardTitle>Pass Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg opacity-50"></div>
              <p className="text-xs text-muted-foreground mt-2">Player connections show passing patterns</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Heatmap */}
        <TabsContent value="heatmap" id="heatmap-panel" role="tabpanel" aria-labelledby="heatmap-tab">
          <Card>
            <CardHeader>
              <CardTitle>Activity Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-b from-amber-100 via-orange-300 to-red-400 rounded-lg opacity-50"></div>
              <p className="text-xs text-muted-foreground mt-2">Player activity density across the pitch</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tactical Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Tactical Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
            <Badge className="mb-2 bg-blue-100 text-blue-800">Possession</Badge>
            <p className="text-sm">Home team dominated possession with 58%, controlling the game tempo</p>
          </div>
          <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
            <Badge className="mb-2 bg-green-100 text-green-800">Efficiency</Badge>
            <p className="text-sm">82% pass accuracy indicates good ball control and precise distribution</p>
          </div>
          <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
            <Badge className="mb-2 bg-amber-100 text-amber-800">Vulnerability</Badge>
            <p className="text-sm">Away team exploited defensive transitions, scoring on counterattacks</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
