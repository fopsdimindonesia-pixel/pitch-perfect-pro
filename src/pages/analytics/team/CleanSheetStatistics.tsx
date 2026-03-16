import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield } from 'lucide-react';

const cleanSheetData = [
  { week: 'W1', matchesWithCS: 1, totalMatches: 2, percentage: 50 },
  { week: 'W2', matchesWithCS: 1, totalMatches: 2, percentage: 50 },
  { week: 'W3', matchesWithCS: 0, totalMatches: 2, percentage: 0 },
  { week: 'W4', matchesWithCS: 2, totalMatches: 2, percentage: 100 },
  { week: 'W5', matchesWithCS: 1, totalMatches: 2, percentage: 50 },
];

const cleanSheetStats = {
  totalCS: 7,
  matches: 22,
  percentage: 32,
  homeCS: 5,
  awayCS: 2,
  goalsAgainst: 31,
  avgGoalsPerMatch: 1.41,
};

const topDefenders = [
  { number: 3, name: 'Toni Kusuma', position: 'CB', appearances: 22, cleanSheets: 7 },
  { number: 2, name: 'Asnawi Mangkualam', position: 'RB', appearances: 20, cleanSheets: 6 },
  { number: 5, name: 'Andik Vermansah', position: 'LB', appearances: 18, cleanSheets: 6 },
  { number: 1, name: 'I Made Wirawan', position: 'GK', appearances: 22, cleanSheets: 7 },
];

export default function CleanSheetStatistics() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clean Sheet Statistics</h1>
          <p className="text-muted-foreground mt-1">Defensive performance and shutout analysis</p>
        </div>
      </section>

      {/* Key Metrics */}
      <section aria-label="Clean sheet key metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{cleanSheetStats.totalCS}</p>
                <p className="text-xs text-muted-foreground">Clean Sheets Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{cleanSheetStats.percentage}%</p>
                <p className="text-xs text-muted-foreground">CS Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{cleanSheetStats.homeCS}</p>
                <p className="text-xs text-muted-foreground">Home CS</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{cleanSheetStats.awayCS}</p>
                <p className="text-xs text-muted-foreground">Away CS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Weekly Trend */}
      <Card>
        <CardHeader>
          <CardTitle id="cs-trend">Clean Sheet Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cleanSheetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="percentage" stroke="#22c55e" name="CS %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Clean Sheet Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {cleanSheetData.map((week) => (
            <div key={week.week} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <span className="font-medium">{week.week}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {week.matchesWithCS} of {week.totalMatches} matches
                </span>
                <Badge className={week.percentage > 50 ? 'bg-green-100 text-green-800' : week.percentage > 0 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}>
                  {week.percentage}%
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Defensive Players */}
      <Card>
        <CardHeader>
          <CardTitle>Top Defenders (Clean Sheets)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">#</th>
                <th scope="col" className="text-left py-2 px-2 font-semibold">Player</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Position</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">App</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">CS</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">CS %</th>
              </tr>
            </thead>
            <tbody>
              {topDefenders.map((player) => (
                <tr key={player.number} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 font-bold">{player.number}</td>
                  <td className="py-2 px-2 font-medium">{player.name}</td>
                  <td className="py-2 px-2 text-center text-muted-foreground">{player.position}</td>
                  <td className="py-2 px-2 text-center">{player.appearances}</td>
                  <td className="py-2 px-2 text-center font-bold text-green-600">{player.cleanSheets}</td>
                  <td className="py-2 px-2 text-center font-bold">{((player.cleanSheets / player.appearances) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Defensive Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Defensive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Goals Conceded</p>
            <p className="text-2xl font-bold text-red-600">{cleanSheetStats.goalsAgainst}</p>
            <p className="text-xs text-muted-foreground">{cleanSheetStats.avgGoalsPerMatch} goals per match</p>
          </div>
          <div className="pt-3 border-t space-y-1">
            <p className="text-sm text-muted-foreground">Goal Concession Rate</p>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <p className="text-sm">Home</p>
                <p className="text-lg font-bold">0.7/match</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-sm">Away</p>
                <p className="text-lg font-bold">1.7/match</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
