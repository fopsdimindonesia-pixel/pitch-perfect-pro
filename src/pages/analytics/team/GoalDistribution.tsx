import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const goalDistribution = [
  { minute: '0-15', goals: 4, pct: 10 },
  { minute: '16-30', goals: 5, pct: 13 },
  { minute: '31-45', goals: 6, pct: 15 },
  { minute: '46-60', goals: 8, pct: 21 },
  { minute: '61-75', goals: 9, pct: 23 },
  { minute: '76-90', goals: 7, pct: 18 },
];

const playerGoals = [
  { player: 'Bambang Pamungkas', goals: 12 },
  { player: 'Evan Dimas', goals: 8 },
  { player: 'Ilija Spasojevic', goals: 7 },
  { player: 'Saddil Ramdani', goals: 5 },
  { player: 'Others', goals: 7 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

export default function GoalDistribution() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goal Distribution</h1>
          <p className="text-muted-foreground mt-1">Goals by time period and player analysis</p>
        </div>
      </section>

      {/* Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Goal distribution overview">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold text-green-600">39</p>
            <p className="text-sm text-muted-foreground">Total Goals</p>
            <p className="text-xs text-muted-foreground mt-2">1.77 per match average</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold text-blue-600">5</p>
            <p className="text-sm text-muted-foreground">Top Scorers</p>
            <p className="text-xs text-muted-foreground mt-2">Multiple goal contributors</p>
          </CardContent>
        </Card>
      </section>

      {/* Goals by Time Period */}
      <Card>
        <CardHeader>
          <CardTitle id="time-distribution">Goals by Time Period</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="minute" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="goals" fill="#22c55e" name="Goals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Time Period Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Time Period Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {goalDistribution.map((period) => (
            <div key={period.minute} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{period.minute} min</span>
                <span className="text-sm font-bold">{period.goals} goals ({period.pct}%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${period.pct}%` }}></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Goals by Player */}
      <Card>
        <CardHeader>
          <CardTitle id="player-distribution">Goals by Player</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={playerGoals}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.player}: ${entry.goals}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="goals"
                  >
                    {playerGoals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {playerGoals.map((player, idx) => (
                <div key={player.player} className="border rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{player.player}</span>
                    <span className="font-bold" style={{ color: COLORS[idx % COLORS.length] }}>
                      {player.goals} goals
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${(player.goals / Math.max(...playerGoals.map((p) => p.goals))) * 100}%`,
                        backgroundColor: COLORS[idx % COLORS.length],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Peak Scoring Time</p>
            <p className="text-lg font-bold">61-75 min</p>
            <p className="text-xs text-muted-foreground">9 goals (23%)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lowest Scoring Time</p>
            <p className="text-lg font-bold">0-15 min</p>
            <p className="text-xs text-muted-foreground">4 goals (10%)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Top Scorer</p>
            <p className="text-lg font-bold">Bambang Pamungkas</p>
            <p className="text-xs text-muted-foreground">12 goals (31%)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Goal Spreads</p>
            <p className="text-lg font-bold">Balanced</p>
            <p className="text-xs text-muted-foreground">5 different scorers</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
