import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Medal } from 'lucide-react';

const topScorers = [
  { rank: 1, number: 9, name: 'Bambang Pamungkas', team: 'SSB Garuda Muda', goals: 12, matches: 20, assists: 3, efficiency: 60 },
  { rank: 2, number: 21, name: 'Evan Dimas', team: 'SSB Garuda Muda', goals: 8, matches: 18, assists: 2, efficiency: 44 },
  { rank: 3, number: 10, name: 'Ilija Spasojevic', team: 'Persija Jakarta', goals: 7, matches: 15, assists: 1, efficiency: 47 },
  { rank: 4, number: 11, name: 'Saddil Ramdani', team: 'Bali United', goals: 5, matches: 14, assists: 4, efficiency: 36 },
  { rank: 5, number: 14, name: 'Menyerah Siaheuw', team: 'PSM Makassar', goals: 5, matches: 13, assists: 3, efficiency: 38 },
  { rank: 6, number: 7, name: 'Andik Vermansah', team: 'Madura United', goals: 4, matches: 12, assists: 5, efficiency: 33 },
  { rank: 7, number: 22, name: 'Nguyen Cong Phuong', team: 'PSIS Semarang', goals: 4, matches: 11, assists: 2, efficiency: 36 },
  { rank: 8, number: 17, name: 'Rizky Rana Marasabessy', team: 'Arema FC', goals: 3, matches: 10, assists: 1, efficiency: 30 },
  { rank: 9, number: 19, name: 'Dani Alves', team: 'Kalimantan FC', goals: 3, matches: 9, assists: 2, efficiency: 33 },
  { rank: 10, number: 13, name: 'Toni Kusuma', team: 'SSB Garuda Muda', goals: 2, matches: 22, assists: 0, efficiency: 9 },
];

export default function TopScorers() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Top Scorers</h1>
          <p className="text-muted-foreground mt-1">Goal-scoring leaderboard and efficiency analysis</p>
        </div>
      </section>

      {/* Top Scorer Highlight */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold">Golden Boot Leader</h3>
              </div>
              <p className="text-3xl font-bold">Bambang Pamungkas</p>
              <p className="text-sm text-muted-foreground">SSB Garuda Muda</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-muted-foreground">Goals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <section aria-label="Top scorers summary" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Goals (Top 10)</p>
            <p className="text-2xl font-bold">53</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Goals/Player</p>
            <p className="text-2xl font-bold">5.3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Best Efficiency</p>
            <p className="text-2xl font-bold text-green-600">60%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Goal Spread</p>
            <p className="text-2xl font-bold">10 players</p>
          </CardContent>
        </Card>
      </section>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle id="scorers-table">Scoring Leaderboard</CardTitle>
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
                <th scope="col" className="text-center py-2 px-2 font-semibold">G</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">A</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Eff %</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((player) => (
                <tr key={player.rank} className="border-b hover:bg-gray-50">
                  <td className="text-center py-3 px-2">
                    {player.rank <= 3 && <Medal className="w-4 h-4 mx-auto text-yellow-600" />}
                    {!([1, 2, 3].includes(player.rank)) && <span className="font-semibold text-gray-500">{player.rank}</span>}
                  </td>
                  <td className="py-3 px-2 font-bold">{player.number}</td>
                  <td className="py-3 px-2 font-semibold">{player.name}</td>
                  <td className="py-3 px-2 text-muted-foreground text-xs">{player.team}</td>
                  <td className="text-center py-3 px-2">{player.matches}</td>
                  <td className="text-center py-3 px-2 font-bold text-green-600">{player.goals}</td>
                  <td className="text-center py-3 px-2">{player.assists}</td>
                  <td className="text-center py-3 px-2 text-blue-600 font-semibold">{player.efficiency}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Top 3 Breakdown */}
      <section aria-label="Top three scorers detail" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topScorers.slice(0, 3).map((player) => (
          <Card key={player.rank} className={player.rank === 1 ? 'border-yellow-300 border-2' : ''}>
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
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-xs text-muted-foreground">Goals</p>
                  <p className="text-2xl font-bold text-green-600">{player.goals}</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-xs text-muted-foreground">Assists</p>
                  <p className="text-2xl font-bold text-blue-600">{player.assists}</p>
                </div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded">
                <p className="text-xs text-muted-foreground">Goal/Match Ratio</p>
                <p className="text-xl font-bold text-purple-600">{(player.goals / player.matches).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Efficiency Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Efficiency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topScorers.slice(0, 5).map((player) => (
            <div key={player.rank} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{player.rank}. {player.name}</span>
                <span className="text-sm font-bold">{player.efficiency}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className={`h-full ${player.efficiency >= 50 ? 'bg-green-500' : player.efficiency >= 40 ? 'bg-blue-500' : 'bg-orange-500'}`}
                  style={{ width: `${player.efficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
