import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const goalsPerMatch = [
  { matchday: 'MD1', goals: 2 },
  { matchday: 'MD2', goals: 1 },
  { matchday: 'MD3', goals: 3 },
  { matchday: 'MD4', goals: 2 },
  { matchday: 'MD5', goals: 1 },
  { matchday: 'MD6', goals: 2 },
  { matchday: 'MD7', goals: 4 },
  { matchday: 'MD8', goals: 0 },
  { matchday: 'MD9', goals: 2 },
  { matchday: 'MD10', goals: 2 },
  { matchday: 'MD11', goals: 3 },
  { matchday: 'MD12', goals: 1 },
];

const goalBreakdown = [
  { range: '0 goals', matches: 2, percentage: 9 },
  { range: '1 goal', matches: 5, percentage: 23 },
  { range: '2-3 goals', matches: 12, percentage: 55 },
  { range: '4+ goals', matches: 3, percentage: 14 },
];

export default function GoalsPerMatch() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals Per Match</h1>
          <p className="text-muted-foreground mt-1">Scoring patterns and offensive productivity analysis</p>
        </div>
      </section>

      {/* Key Stats */}
      <section aria-label="Goals per match metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Goals/Match</p>
            <p className="text-2xl font-bold text-green-600">1.77</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Highest Scoring</p>
            <p className="text-2xl font-bold">4 goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Blanks (0 Goals)</p>
            <p className="text-2xl font-bold text-red-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Goal Streak</p>
            <p className="text-2xl font-bold">39 goals</p>
          </CardContent>
        </Card>
      </section>

      {/* Goals per Match Trend */}
      <Card>
        <CardHeader>
          <CardTitle id="gpm-trend">Goals Trend (Last 12 Matches)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalsPerMatch}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="matchday" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="goals" fill="#22c55e" name="Goals Scored" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Goal Range Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Pattern Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {goalBreakdown.map((pattern) => (
            <div key={pattern.range} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{pattern.range}</span>
                <span className="text-sm font-bold">{pattern.matches} matches ({pattern.percentage}%)</span>
              </div>
              <div className="h-3 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${pattern.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Match Scoring Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Frequency</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="border rounded p-4 text-center">
            <p className="text-2xl font-bold text-green-600">20</p>
            <p className="text-xs text-muted-foreground">Matches with Goals</p>
            <p className="text-xs text-muted-foreground mt-1">91% scoring rate</p>
          </div>
          <div className="border rounded p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-xs text-muted-foreground">Matches without Goals</p>
            <p className="text-xs text-muted-foreground mt-1">9% blank matches</p>
          </div>
          <div className="border rounded p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">67%</p>
            <p className="text-xs text-muted-foreground">Matches 2+ Goals</p>
            <p className="text-xs text-muted-foreground mt-1">14 matches</p>
          </div>
          <div className="border rounded p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">14%</p>
            <p className="text-xs text-muted-foreground">High-Scoring Games</p>
            <p className="text-xs text-muted-foreground mt-1">4+ goals (3 matches)</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Goals Performance (Last 5)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {goalsPerMatch.slice(-5).map((match) => (
            <div key={match.matchday} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <span className="font-semibold">{match.matchday}</span>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array(match.goals)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        ⚽
                      </div>
                    ))}
                </div>
                <span className="font-bold text-lg">{match.goals}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Offensive Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Offensive Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded p-3">
              <p className="text-xs text-muted-foreground">Total Goals</p>
              <p className="text-2xl font-bold text-green-600">39</p>
            </div>
            <div className="border rounded p-3">
              <p className="text-xs text-muted-foreground">Matches Played</p>
              <p className="text-2xl font-bold">22</p>
            </div>
            <div className="border rounded p-3">
              <p className="text-xs text-muted-foreground">Goal Efficiency</p>
              <p className="text-2xl font-bold text-blue-600">177%</p>
            </div>
            <div className="border rounded p-3">
              <p className="text-xs text-muted-foreground">Best Performance</p>
              <p className="text-2xl font-bold">MD7</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trends & Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Strong offensive output with 1.77 goals per match average</p>
          <p>✓ 91% of matches have at least 1 goal - excellent finishing consistency</p>
          <p>✓ 67% of matches have 2+ goals - dominant attacking performance</p>
          <p>⚠ Only 2 blank performances in 22 matches - rare defensive issues</p>
        </CardContent>
      </Card>
    </main>
  );
}
