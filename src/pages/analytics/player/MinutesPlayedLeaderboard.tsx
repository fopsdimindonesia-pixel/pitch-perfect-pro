import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const minutesLeaderboard = [
  { rank: 1, number: 1, name: 'I Made Wirawan', team: 'PSM Makassar', position: 'GK', matches: 22, minutes: 1980, avgMin: 90, percent: 100 },
  { rank: 2, number: 3, name: 'Toni Kusuma', team: 'SSB Garuda Muda', position: 'CB', matches: 22, minutes: 1890, avgMin: 86, percent: 95 },
  { rank: 3, number: 4, name: 'Paulo Sergio', team: 'Arema FC', position: 'CB', matches: 19, minutes: 1710, avgMin: 90, percent: 98 },
  { rank: 4, number: 9, name: 'Bambang Pamungkas', team: 'SSB Garuda Muda', position: 'FW', matches: 20, minutes: 1620, avgMin: 81, percent: 92 },
  { rank: 5, number: 7, name: 'Andik Vermansah', team: 'Madura United', position: 'LW', matches: 18, minutes: 1530, avgMin: 85, percent: 97 },
  { rank: 6, number: 8, name: 'Evan Dimas', team: 'SSB Garuda Muda', position: 'MF', matches: 18, minutes: 1485, avgMin: 82, percent: 94 },
  { rank: 7, number: 10, name: 'Ilija Spasojevic', team: 'Persija Jakarta', position: 'ST', matches: 15, minutes: 1350, avgMin: 90, percent: 100 },
  { rank: 8, number: 2, name: 'Asnawi Mangkualam', team: 'PSM Makassar', position: 'RB', matches: 20, minutes: 1710, avgMin: 86, percent: 96 },
  { rank: 9, number: 6, name: 'Zaenuri', team: 'Persija Jakarta', position: 'RB', matches: 16, minutes: 1350, avgMin: 84, percent: 95 },
  { rank: 10, number: 11, name: 'Saddil Ramdani', team: 'Bali United', position: 'LW', matches: 15, minutes: 1215, avgMin: 81, percent: 90 },
];

export default function MinutesPlayedLeaderboard() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minutes Played Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Playing time rankings and consistency analysis</p>
        </div>
      </section>

      {/* Top Player Highlight */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Most Minutes Played</h3>
              </div>
              <p className="text-3xl font-bold">I Made Wirawan</p>
              <p className="text-sm text-muted-foreground">Goalkeeper | PSM Makassar</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold text-blue-600">1,980</p>
              <p className="text-sm text-muted-foreground">Minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <section aria-label="Minutes summary" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Minutes</p>
            <p className="text-2xl font-bold">1,584</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Season Minutes</p>
            <p className="text-2xl font-bold">15,840</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Ever-Present Players</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Matches Season</p>
            <p className="text-2xl font-bold">22</p>
          </CardContent>
        </Card>
      </section>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle id="minutes-table">Minutes Played Ranking</CardTitle>
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
                <th scope="col" className="text-center py-2 px-2 font-semibold">Minutes</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Avg</th>
              </tr>
            </thead>
            <tbody>
              {minutesLeaderboard.map((player) => (
                <tr key={player.rank} className="border-b hover:bg-gray-50">
                  <td className="text-center py-3 px-2 font-semibold text-gray-500">{player.rank}</td>
                  <td className="py-3 px-2 font-bold">{player.number}</td>
                  <td className="py-3 px-2 font-semibold">{player.name}</td>
                  <td className="text-center py-3 px-2">
                    <Badge variant="outline" className="text-xs">{player.position}</Badge>
                  </td>
                  <td className="text-center py-3 px-2">{player.matches}</td>
                  <td className="text-center py-3 px-2 font-bold text-blue-600">{player.minutes}</td>
                  <td className="text-center py-3 px-2">{player.avgMin}′</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Playing Time Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Playing Time Consistency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Regular Starters ({'>'}1500 min)</span>
              <span className="text-sm font-bold text-green-600">5 players</span>
            </div>
            <div className="h-3 bg-green-500 rounded" style={{ width: '50%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Regular Subs (1000-1500 min)</span>
              <span className="text-sm font-bold text-blue-600">3 players</span>
            </div>
            <div className="h-3 bg-blue-500 rounded" style={{ width: '30%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Rotation Players (<1000 min)</span>
              <span className="text-sm font-bold text-orange-600">2 players</span>
            </div>
            <div className="h-3 bg-orange-500 rounded" style={{ width: '20%' }}></div>
          </div>
        </CardContent>
      </Card>

      {/* Position Based Minutes */}
      <Card>
        <CardHeader>
          <CardTitle>Minutes by Position</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <p className="font-semibold mb-3">Goalkeepers</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">I Made Wirawan (GK)</span>
                <span className="font-bold">1,980′</span>
              </div>
            </div>
          </div>
          <div className="border rounded p-4">
            <p className="font-semibold mb-3">Defenders</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Toni Kusuma (CB)</span>
                <span className="font-bold">1,890′</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Paulo Sergio (CB)</span>
                <span className="font-bold">1,710′</span>
              </div>
            </div>
          </div>
          <div className="border rounded p-4">
            <p className="font-semibold mb-3">Midfielders</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Evan Dimas (MF)</span>
                <span className="font-bold">1,485′</span>
              </div>
            </div>
          </div>
          <div className="border rounded p-4">
            <p className="font-semibold mb-3">Forwards</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Bambang Pamungkas (FW)</span>
                <span className="font-bold">1,620′</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Ilija Spasojevic (ST)</span>
                <span className="font-bold">1,350′</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Injury Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ I Made Wirawan: Ever-present, all 22 matches, 1,980 minutes (100%)</p>
          <p>✓ Toni Kusuma: Reliable starter, 22 matches, only 90 minutes rotation</p>
          <p>⚠ Ilija Spasojevic: Competitive selection, 15 matches but high intensity</p>
          <p>⚠ Limited rotation in defense indicates stability but squad depth concerns</p>
        </CardContent>
      </Card>
    </main>
  );
}
