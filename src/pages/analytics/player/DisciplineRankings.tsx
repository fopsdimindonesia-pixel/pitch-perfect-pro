import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

const disciplineLeaderboard = [
  { rank: 1, number: 4, name: 'Paulo Sergio', team: 'Arema FC', position: 'CB', matches: 19, yellowCards: 7, redCards: 0, suspensions: 0, fpPoints: 45 },
  { rank: 2, number: 14, name: 'Menyerah Siaheuw', team: 'PSM Makassar', position: 'MF', matches: 16, yellowCards: 5, redCards: 1, suspensions: 2, fpPoints: 32 },
  { rank: 3, number: 6, name: 'Zaenuri', team: 'Persija Jakarta', position: 'RB', matches: 16, yellowCards: 6, redCards: 0, suspensions: 0, fpPoints: 42 },
  { rank: 4, number: 2, name: 'Asnawi Mangkualam', team: 'PSM Makassar', position: 'RB', matches: 20, yellowCards: 4, redCards: 0, suspensions: 0, fpPoints: 48 },
  { rank: 5, number: 5, name: 'Irfan Bachdim', team: 'Bali United', position: 'CM', matches: 14, yellowCards: 5, redCards: 1, suspensions: 1, fpPoints: 35 },
  { rank: 6, number: 7, name: 'Andik Vermansah', team: 'Madura United', position: 'LW', matches: 18, yellowCards: 3, redCards: 0, suspensions: 0, fpPoints: 51 },
  { rank: 7, number: 11, name: 'Saddil Ramdani', team: 'Bali United', position: 'LW', matches: 15, yellowCards: 4, redCards: 0, suspensions: 0, fpPoints: 50 },
  { rank: 8, number: 8, name: 'Evan Dimas', team: 'SSB Garuda Muda', position: 'MF', matches: 18, yellowCards: 2, redCards: 0, suspensions: 0, fpPoints: 54 },
  { rank: 9, number: 9, name: 'Bambang Pamungkas', team: 'SSB Garuda Muda', position: 'FW', matches: 20, yellowCards: 3, redCards: 0, suspensions: 0, fpPoints: 53 },
  { rank: 10, number: 3, name: 'Toni Kusuma', team: 'SSB Garuda Muda', position: 'CB', matches: 22, yellowCards: 2, redCards: 0, suspensions: 0, fpPoints: 56 },
];

export default function DisciplineRankings() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discipline Rankings</h1>
          <p className="text-muted-foreground mt-1">Cards, suspensions, and fair play scoring</p>
        </div>
      </section>

      {/* Most Disciplined Highlight */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Most Disciplined Player</h3>
              <p className="text-3xl font-bold">Toni Kusuma</p>
              <p className="text-sm text-muted-foreground">Center Back | SSB Garuda Muda</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold text-green-600">56</p>
              <p className="text-sm text-muted-foreground">Fair Play Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <section aria-label="Discipline summary" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Yellow Cards</p>
            <p className="text-2xl font-bold text-yellow-600">41</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Red Cards</p>
            <p className="text-2xl font-bold text-red-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Suspensions</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg FP Points</p>
            <p className="text-2xl font-bold text-green-600">46.6</p>
          </CardContent>
        </Card>
      </section>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle id="discipline-table">Discipline Leaderboard</CardTitle>
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
                <th scope="col" className="text-center py-2 px-2 font-semibold">Y</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">R</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">FP</th>
              </tr>
            </thead>
            <tbody>
              {disciplineLeaderboard.map((player) => (
                <tr key={player.rank} className="border-b hover:bg-gray-50">
                  <td className="text-center py-3 px-2 font-semibold text-gray-500">{player.rank}</td>
                  <td className="py-3 px-2 font-bold">{player.number}</td>
                  <td className="py-3 px-2 font-semibold">{player.name}</td>
                  <td className="text-center py-3 px-2">
                    <Badge variant="outline" className="text-xs">{player.position}</Badge>
                  </td>
                  <td className="text-center py-3 px-2">{player.matches}</td>
                  <td className="text-center py-3 px-2">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{player.yellowCards}</Badge>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge className={player.redCards > 0 ? 'bg-red-100 text-red-800 hover:bg-red-100' : 'bg-gray-100 text-gray-800'}>{player.redCards}</Badge>
                  </td>
                  <td className="text-center py-3 px-2 font-bold text-green-600">{player.fpPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Card Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded"></span>
              Yellow Card Leaders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {disciplineLeaderboard.filter(p => p.yellowCards > 0).slice(0, 5).map(p => (
              <div key={p.rank} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm font-medium">{p.name}</span>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{p.yellowCards}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Risk Players (Red Cards)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {disciplineLeaderboard.filter(p => p.redCards > 0).map(p => (
              <div key={p.rank} className="flex items-center justify-between p-2 border rounded border-red-200 bg-red-50">
                <div className="text-sm">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.position} | {p.suspensions} suspension(s)</p>
                </div>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{p.redCards}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fair Play Scoring System */}
      <Card>
        <CardHeader>
          <CardTitle>Fair Play Scoring System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-green-500 pl-3 py-2">
            <p className="text-sm font-semibold">Perfect Discipline</p>
            <p className="text-xs text-muted-foreground">No cards = 60 points base + 2 bonus per match</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-3 py-2">
            <p className="text-sm font-semibold">Yellow Card Penalty</p>
            <p className="text-xs text-muted-foreground">-2 points per yellow card</p>
          </div>
          <div className="border-l-4 border-red-500 pl-3 py-2">
            <p className="text-sm font-semibold">Red Card Penalty</p>
            <p className="text-xs text-muted-foreground">-10 points per red card + match suspension</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-3 py-2">
            <p className="text-sm font-semibold">Accumulation Rule</p>
            <p className="text-xs text-muted-foreground">5 yellow cards in a season = automatic 1-match suspension</p>
          </div>
        </CardContent>
      </Card>

      {/* Position-based Discipline */}
      <Card>
        <CardHeader>
          <CardTitle>Discipline by Position</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="border rounded p-3">
            <p className="text-sm font-semibold mb-2">Defenders</p>
            <p className="text-2xl font-bold text-yellow-600">17</p>
            <p className="text-xs text-muted-foreground">yellow cards (41%)</p>
          </div>
          <div className="border rounded p-3">
            <p className="text-sm font-semibold mb-2">Midfielders</p>
            <p className="text-2xl font-bold text-yellow-600">14</p>
            <p className="text-xs text-muted-foreground">yellow cards (34%)</p>
          </div>
          <div className="border rounded p-3">
            <p className="text-sm font-semibold mb-2">Forwards</p>
            <p className="text-2xl font-bold text-yellow-600">10</p>
            <p className="text-xs text-muted-foreground">yellow cards (24%)</p>
          </div>
          <div className="border rounded p-3">
            <p className="text-sm font-semibold mb-2">Goalkeepers</p>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-xs text-muted-foreground">yellow cards (0%)</p>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Defenders accumulate most cards as expected (41% of total)</p>
          <p>✓ 2 red cards resulted in suspensions - both midfielders</p>
          <p>✓ Evan Dimas and Bambang Pamungkas show excellent discipline for their positions</p>
          <p>⚠ Paulo Sergio needs to improve - 7 yellows in 19 matches</p>
        </CardContent>
      </Card>
    </main>
  );
}
