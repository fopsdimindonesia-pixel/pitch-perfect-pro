import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const matchResultsTrend = [
  { matchday: 'MD1', result: 'W', gf: 2, ga: 1, form: 1 },
  { matchday: 'MD2', result: 'L', gf: 1, ga: 2, form: 0 },
  { matchday: 'MD3', result: 'W', gf: 3, ga: 0, form: 1 },
  { matchday: 'MD4', result: 'W', gf: 2, ga: 1, form: 1 },
  { matchday: 'MD5', result: 'D', gf: 1, ga: 1, form: 0.5 },
  { matchday: 'MD6', result: 'W', gf: 2, ga: 0, form: 1 },
  { matchday: 'MD7', result: 'W', gf: 4, ga: 2, form: 1 },
  { matchday: 'MD8', result: 'D', gf: 0, ga: 0, form: 0.5 },
];

const winRecords = [
  { metric: 'Wins', value: 11, color: '#22c55e' },
  { metric: 'Draws', value: 3, color: '#3b82f6' },
  { metric: 'Losses', value: 8, color: '#ef4444' },
];

export default function MatchResultTrends() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Match Result Trends</h1>
          <p className="text-muted-foreground mt-1">Win/draw/loss patterns and team form analysis</p>
        </div>
      </section>

      {/* Overall Record */}
      <section aria-label="Match result summary" className="grid grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-600">11</p>
            <p className="text-sm text-muted-foreground">Wins</p>
            <p className="text-xs text-muted-foreground mt-1">50%</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-blue-600">3</p>
            <p className="text-sm text-muted-foreground">Draws</p>
            <p className="text-xs text-muted-foreground mt-1">14%</p>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-red-600">8</p>
            <p className="text-sm text-muted-foreground">Losses</p>
            <p className="text-xs text-muted-foreground mt-1">36%</p>
          </CardContent>
        </Card>
      </section>

      {/* Win Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle id="result-distribution">Result Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={winRecords}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" name="Matches" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Form Trend */}
      <Card>
        <CardHeader>
          <CardTitle id="form-trend">Recent Form (Last 8 Matches)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {matchResultsTrend.map((match) => (
              <div
                key={match.matchday}
                className={`flex-1 aspect-square rounded flex items-center justify-center font-bold text-white cursor-pointer hover:opacity-80 transition ${
                  match.result === 'W' ? 'bg-green-500' : match.result === 'D' ? 'bg-blue-500' : 'bg-red-500'
                }`}
                title={`${match.matchday}: ${match.result} (${match.gf}-${match.ga})`}
              >
                {match.result}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center">Current streak: 1 Win</p>
        </CardContent>
      </Card>

      {/* Match Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Match Results (Last 8)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Match</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Result</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Score</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GF</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GA</th>
              </tr>
            </thead>
            <tbody>
              {matchResultsTrend.map((match) => (
                <tr key={match.matchday} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-semibold">{match.matchday}</td>
                  <td className="text-center py-3 px-2">
                    <Badge
                      className={
                        match.result === 'W'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : match.result === 'D'
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {match.result === 'W' ? 'Win' : match.result === 'D' ? 'Draw' : 'Loss'}
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-2 font-bold">
                    {match.gf}-{match.ga}
                  </td>
                  <td className="text-center py-3 px-2 text-green-600 font-semibold">{match.gf}</td>
                  <td className="text-center py-3 px-2 text-red-600 font-semibold">{match.ga}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Win-Loss Streaks */}
      <Card>
        <CardHeader>
          <CardTitle>Streaks & Momentum</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <p className="text-sm text-muted-foreground">Longest Win Streak</p>
            <p className="text-3xl font-bold text-green-600">3 matches</p>
            <p className="text-xs text-muted-foreground">MD3-MD4-MD7</p>
          </div>
          <div className="border rounded p-4">
            <p className="text-sm text-muted-foreground">Current Form</p>
            <p className="text-3xl font-bold text-blue-600">Varied</p>
            <p className="text-xs text-muted-foreground">Mixed results recently</p>
          </div>
        </CardContent>
      </Card>

      {/* Points Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Points Accumulation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="text-sm font-semibold">Total Points (from 22 matches)</p>
              <p className="text-xs text-muted-foreground">11 wins × 3 + 3 draws × 1 = 36 points</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">36</p>
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="text-sm font-semibold">Points Per Match Average</p>
              <p className="text-xs text-muted-foreground">Over 22 matches played</p>
            </div>
            <p className="text-2xl font-bold">1.64</p>
          </div>
          <div className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="text-sm font-semibold">Win Percentage</p>
              <p className="text-xs text-muted-foreground">Wins / Total Matches</p>
            </div>
            <p className="text-2xl font-bold text-green-600">50%</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
