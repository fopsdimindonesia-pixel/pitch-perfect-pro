import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown } from 'lucide-react';

const mockTeams = [
  { rank: 1, team: 'Persija Jakarta', played: 22, gf: 52, ga: 18, gd: 34, trend: 'up' },
  { rank: 2, team: 'Bali United', played: 22, gf: 48, ga: 22, gd: 26, trend: 'up' },
  { rank: 3, team: 'PSM Makassar', played: 22, gf: 45, ga: 24, gd: 21, trend: 'down' },
  { rank: 4, team: 'Madura United', played: 22, gf: 42, ga: 28, gd: 14, trend: 'down' },
  { rank: 5, team: 'SSB Garuda Muda', played: 22, gf: 39, ga: 31, gd: 8, trend: 'up' },
  { rank: 6, team: 'Arema Malang', played: 22, gf: 38, ga: 35, gd: 3, trend: 'down' },
];

const maxGD = 34;

export default function GoalDifference() {
  const [sortBy, setSortBy] = useState('gd');

  const sorted = [...mockTeams].sort((a, b) => {
    if (sortBy === 'gd') return b.gd - a.gd;
    if (sortBy === 'gf') return b.gf - a.gf;
    return b.ga - a.ga;
  });

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Goal Difference Analysis</h1>
            <p className="text-muted-foreground mt-1">Goals scored vs goals conceded comparison</p>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40" aria-label="Sort by">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gd">By Goal Difference</SelectItem>
              <SelectItem value="gf">By Goals Scored</SelectItem>
              <SelectItem value="ga">By Goals Conceded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Overview Stats */}
      <section aria-label="Goal scoring overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{sorted.reduce((sum, t) => sum + t.gf, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Goals Scored</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{sorted.reduce((sum, t) => sum + t.ga, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Goals Conceded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{sorted.reduce((sum, t) => sum + t.gd, 0)}</div>
            <p className="text-sm text-muted-foreground">Aggregate GD</p>
          </CardContent>
        </Card>
      </section>

      {/* Goal Difference Chart */}
      <Card>
        <CardHeader>
          <CardTitle id="gd-chart">Goal Difference by Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" role="region" aria-labelledby="gd-chart">
          {sorted.map((team) => (
            <div key={team.team} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{team.team}</p>
                  <p className="text-xs text-muted-foreground">{team.gf}F • {team.ga}A</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={team.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {team.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {team.gd > 0 ? '+' : ''}{team.gd}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 h-6">
                <div className="relative flex-1 h-full bg-gray-100 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all ${team.gd > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${(Math.abs(team.gd) / maxGD) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold w-12 text-right">{team.gd > 0 ? '+' : ''}{team.gd}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Team</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">P</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold text-green-600">GF</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold text-red-600">GA</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold text-blue-600">GD</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Avg/Match</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((team) => (
                <tr key={team.team} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 font-medium">{team.team}</td>
                  <td className="py-2 px-2 text-center text-sm">{team.played}</td>
                  <td className="py-2 px-2 text-center text-sm font-semibold text-green-600">{team.gf}</td>
                  <td className="py-2 px-2 text-center text-sm font-semibold text-red-600">{team.ga}</td>
                  <td className="py-2 px-2 text-center text-sm font-semibold text-blue-600">{team.gd > 0 ? '+' : ''}{team.gd}</td>
                  <td className="py-2 px-2 text-center text-sm">{(team.gd / team.played).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}
