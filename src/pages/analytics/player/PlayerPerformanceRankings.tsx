import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const playerRankings = [
  { rank: 1, number: 9, name: 'Bambang Pamungkas', team: 'SSB Garuda Muda', rating: 8.2, position: 'FW', matches: 20, goals: 12, assists: 3, recovery: 45, dribble: 38, pass: 82 },
  { rank: 2, number: 7, name: 'Andik Vermansah', team: 'Madura United', rating: 8.0, position: 'LW', matches: 18, goals: 2, assists: 8, recovery: 68, dribble: 72, pass: 88 },
  { rank: 3, number: 10, name: 'Ilija Spasojevic', team: 'Persija Jakarta', rating: 7.8, position: 'ST', matches: 15, goals: 7, assists: 1, recovery: 32, dribble: 65, pass: 79 },
  { rank: 4, number: 8, name: 'Evan Dimas', team: 'SSB Garuda Muda', rating: 7.6, position: 'MF', matches: 18, goals: 8, assists: 5, recovery: 72, dribble: 58, pass: 86 },
  { rank: 5, number: 1, name: 'I Made Wirawan', team: 'PSM Makassar', rating: 7.5, position: 'GK', matches: 22, goals: 0, assists: 0, recovery: 95, dribble: 0, pass: 45 },
  { rank: 6, number: 3, name: 'Toni Kusuma', team: 'SSB Garuda Muda', rating: 7.4, position: 'CB', matches: 22, goals: 2, assists: 0, recovery: 88, dribble: 22, pass: 91 },
  { rank: 7, number: 11, name: 'Saddil Ramdani', team: 'Bali United', rating: 7.3, position: 'LW', matches: 15, goals: 5, assists: 6, recovery: 55, dribble: 68, pass: 81 },
  { rank: 8, number: 4, name: 'Paulo Sergio', team: 'Arema FC', rating: 7.1, position: 'CB', matches: 19, goals: 1, assists: 1, recovery: 82, dribble: 25, pass: 89 },
  { rank: 9, number: 6, name: 'Zaenuri', team: 'Persija Jakarta', rating: 6.9, position: 'RB', matches: 16, goals: 0, assists: 2, recovery: 78, dribble: 48, pass: 85 },
  { rank: 10, number: 14, name: 'Menyerah Siaheuw', team: 'PSM Makassar', rating: 6.8, position: 'MF', matches: 16, goals: 3, assists: 7, recovery: 65, dribble: 62, pass: 83 },
];

export default function PlayerPerformanceRankings() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Player Performance Rankings</h1>
          <p className="text-muted-foreground mt-1">Rating-based player performance evaluation and comparison</p>
        </div>
      </section>

      {/* Top Player Highlight */}
      <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                <h3 className="text-lg font-semibold">Top Rated Player</h3>
              </div>
              <p className="text-3xl font-bold">Bambang Pamungkas</p>
              <p className="text-sm text-muted-foreground">Forward | SSB Garuda Muda</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <p className="text-5xl font-bold text-yellow-600">8.2</p>
                <p className="text-sm text-muted-foreground">/10</p>
              </div>
              <p className="text-xs text-muted-foreground">Match Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <section aria-label="Performance rankings summary" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Rating (Top 10)</p>
            <p className="text-2xl font-bold">7.5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Players Rated 8+</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Highest Rating</p>
            <p className="text-2xl font-bold text-green-600">8.2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Players Ranked</p>
            <p className="text-2xl font-bold">22</p>
          </CardContent>
        </Card>
      </section>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle id="rankings-table">Performance Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-center py-2 px-2 font-semibold w-8">Rank</th>
                <th scope="col" className="text-left py-2 px-2 font-semibold">#</th>
                <th scope="col" className="text-left py-2 px-2 font-semibold">Player</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Pos</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">M</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">G+A</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {playerRankings.map((player) => (
                <tr key={player.rank} className="border-b hover:bg-gray-50">
                  <td className="text-center py-3 px-2">
                    {player.rank <= 3 ? (
                      <Star className="w-4 h-4 mx-auto text-yellow-600 fill-yellow-600" />
                    ) : (
                      <span className="font-semibold text-gray-500">{player.rank}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 font-bold">{player.number}</td>
                  <td className="py-3 px-2 font-semibold">{player.name}</td>
                  <td className="text-center py-3 px-2">
                    <Badge variant="outline" className="text-xs">{player.position}</Badge>
                  </td>
                  <td className="text-center py-3 px-2">{player.matches}</td>
                  <td className="text-center py-3 px-2 font-semibold">{player.goals + player.assists}</td>
                  <td className="text-center py-3 px-2">
                    <span className={`font-bold ${player.rating >= 8 ? 'text-green-600' : player.rating >= 7 ? 'text-blue-600' : 'text-gray-600'}`}>
                      {player.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Top Performers by Category */}
      <section aria-label="Performance categories" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Defensive Strength</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {playerRankings.filter(p => ['GK', 'CB', 'RB', 'LB'].includes(p.position)).slice(0, 3).map(p => (
              <div key={p.rank} className="flex items-center justify-between p-2 border rounded">
                <span className="font-medium text-sm">{p.name}</span>
                <Badge className="bg-green-100 text-green-800">{p.recovery}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attacking Prowess</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {playerRankings.filter(p => ['FW', 'ST'].includes(p.position)).slice(0, 3).map(p => (
              <div key={p.rank} className="flex items-center justify-between p-2 border rounded">
                <span className="font-medium text-sm">{p.name}</span>
                <Badge className="bg-blue-100 text-blue-800">{p.dribble}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Passing Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {playerRankings.filter(p => ['MF', 'CB'].includes(p.position)).slice(0, 3).map(p => (
              <div key={p.rank} className="flex items-center justify-between p-2 border rounded">
                <span className="font-medium text-sm">{p.name}</span>
                <Badge className="bg-purple-100 text-purple-800">{p.pass}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">8.0 - 10.0</span>
              <span className="text-sm font-bold">3 players</span>
            </div>
            <div className="h-3 bg-green-500 rounded" style={{ width: '30%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">7.0 - 7.9</span>
              <span className="text-sm font-bold">6 players</span>
            </div>
            <div className="h-3 bg-blue-500 rounded" style={{ width: '60%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">6.0 - 6.9</span>
              <span className="text-sm font-bold">1 player</span>
            </div>
            <div className="h-3 bg-orange-500 rounded" style={{ width: '10%' }}></div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
