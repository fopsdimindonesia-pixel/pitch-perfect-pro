import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

const topAssisters = [
  { rank: 1, number: 7, name: 'Andik Vermansah', team: 'Madura United', assists: 8, matches: 18, goals: 2, chances: 24, ratio: 0.44 },
  { rank: 2, number: 14, name: 'Menyerah Siaheuw', team: 'PSM Makassar', assists: 7, matches: 16, goals: 3, chances: 21, ratio: 0.33 },
  { rank: 3, number: 11, name: 'Saddil Ramdani', team: 'Bali United', assists: 6, matches: 15, goals: 4, chances: 18, ratio: 0.33 },
  { rank: 4, number: 8, name: 'Evan Dimas', team: 'SSB Garuda Muda', assists: 5, matches: 18, goals: 8, chances: 16, ratio: 0.31 },
  { rank: 5, number: 19, name: 'Dani Alves', team: 'Kalimantan FC', assists: 4, matches: 12, goals: 3, chances: 14, ratio: 0.29 },
  { rank: 6, number: 16, name: 'Ricky Fajrin', team: 'Arema FC', assists: 3, matches: 10, goals: 1, chances: 10, ratio: 0.30 },
  { rank: 7, number: 24, name: 'Asnawi Mangkualam', team: 'PSM Makassar', assists: 3, matches: 14, goals: 0, chances: 9, ratio: 0.21 },
  { rank: 8, number: 6, name: 'Bambio Safari', team: 'Persija Jakarta', assists: 2, matches: 11, goals: 2, chances: 8, ratio: 0.25 },
  { rank: 9, number: 23, name: 'Getafe Ramos', team: 'PSIS Semarang', assists: 2, matches: 9, goals: 1, chances: 7, ratio: 0.29 },
  { rank: 10, number: 12, name: 'Melvin Platje', team: 'Sulawesi United', assists: 1, matches: 8, goals: 1, chances: 5, ratio: 0.20 },
];

export default function TopAssists() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Top Assists</h1>
          <p className="text-muted-foreground mt-1">Assist leaders and chance creation analysis</p>
        </div>
      </section>

      {/* Assist Leader Highlight */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Assist Leader</h3>
              </div>
              <p className="text-3xl font-bold">Andik Vermansah</p>
              <p className="text-sm text-muted-foreground">Madura United</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold text-purple-600">8</p>
              <p className="text-sm text-muted-foreground">Assists</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <section aria-label="Top assists summary" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Assists (Top 10)</p>
            <p className="text-2xl font-bold">41</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Assists/Player</p>
            <p className="text-2xl font-bold">4.1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Chances Created</p>
            <p className="text-2xl font-bold">132</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            <p className="text-2xl font-bold text-green-600">31%</p>
          </CardContent>
        </Card>
      </section>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle id="assists-table">Assist Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-center py-2 px-2 font-semibold w-8">Rank</th>
                <th scope="col" className="text-left py-2 px-2 font-semibold">#</th>
                <th scope="col" className="text-left py-2 px-2 font-semibold">Player</th>
                <th scope="col" className="text-left py-2 px-2 font-semibold">Team</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">M</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">A</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">G</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Chances</th>
              </tr>
            </thead>
            <tbody>
              {topAssisters.map((player) => (
                <tr key={player.rank} className="border-b hover:bg-gray-50">
                  <td className="text-center py-3 px-2 font-semibold text-gray-500">{player.rank}</td>
                  <td className="py-3 px-2 font-bold">{player.number}</td>
                  <td className="py-3 px-2 font-semibold">{player.name}</td>
                  <td className="py-3 px-2 text-muted-foreground text-xs">{player.team}</td>
                  <td className="text-center py-3 px-2">{player.matches}</td>
                  <td className="text-center py-3 px-2 font-bold text-purple-600">{player.assists}</td>
                  <td className="text-center py-3 px-2 text-green-600">{player.goals}</td>
                  <td className="text-center py-3 px-2 text-gray-600">{player.chances}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Top 3 Breakdown */}
      <section aria-label="Top three assisters detail" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topAssisters.slice(0, 3).map((player) => (
          <Card key={player.rank} className={player.rank === 1 ? 'border-purple-300 border-2' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{player.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{player.team}</p>
                </div>
                <Badge variant="outline">#{player.number}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-purple-50 rounded">
                  <p className="text-xs text-muted-foreground">Assists</p>
                  <p className="text-2xl font-bold text-purple-600">{player.assists}</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-xs text-muted-foreground">Goals</p>
                  <p className="text-2xl font-bold text-green-600">{player.goals}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-xs text-muted-foreground">Chances</p>
                  <p className="text-xl font-bold text-blue-600">{player.chances}</p>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <p className="text-xs text-muted-foreground">Conv. %</p>
                  <p className="text-xl font-bold text-orange-600">{Math.round((player.assists / player.chances) * 100)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Chance Conversion */}
      <Card>
        <CardHeader>
          <CardTitle>Chance Conversion Efficiency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topAssisters.slice(0, 5).map((player) => {
            const conversion = Math.round((player.assists / player.chances) * 100);
            return (
              <div key={player.rank} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{player.rank}. {player.name}</span>
                  <span className="text-sm font-bold">{conversion}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className={`h-full ${conversion >= 35 ? 'bg-green-500' : conversion >= 25 ? 'bg-blue-500' : 'bg-orange-500'}`}
                    style={{ width: `${conversion * 2}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Andik Vermansah leads with 8 assists from 24 chances created (33%)</p>
          <p>✓ Wide defenders are major contributors to team play</p>
          <p>✓ Total 41 assists from top 10 creative players over the season</p>
          <p>✓ Good balance between assist creators and goal scorers</p>
        </CardContent>
      </Card>
    </main>
  );
}
