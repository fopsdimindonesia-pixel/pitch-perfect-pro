import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const homeVsAwayData = [
  { metric: 'Matches', home: 11, away: 11 },
  { metric: 'Wins', home: 7, away: 4 },
  { metric: 'Draws', home: 1, away: 2 },
  { metric: 'Losses', home: 3, away: 5 },
  { metric: 'Goals For', home: 24, away: 15 },
  { metric: 'Goals Against', home: 12, away: 19 },
];

const homeVsAwayStats = [
  { type: 'Home', matches: 11, wins: 7, draws: 1, losses: 3, gf: 24, ga: 12, gd: 12, points: 22, winPct: 64 },
  { type: 'Away', matches: 11, wins: 4, draws: 2, losses: 5, gf: 15, ga: 19, gd: -4, points: 14, winPct: 36 },
];

export default function HomeVsAwayPerformance() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home vs Away Performance</h1>
          <p className="text-muted-foreground mt-1">SSB Garuda Muda home and away match statistics</p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-label="Home vs away statistics">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Home Wins</p>
            <p className="text-2xl font-bold text-green-600">7</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Away Wins</p>
            <p className="text-2xl font-bold text-orange-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Home Points</p>
            <p className="text-2xl font-bold">22</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Away Points</p>
            <p className="text-2xl font-bold">14</p>
          </CardContent>
        </Card>
      </section>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle id="home-away-chart">Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={homeVsAwayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="home" fill="#3b82f6" name="Home" />
                <Bar dataKey="away" fill="#f97316" name="Away" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Venue</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">P</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">W</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">D</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">L</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GF</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GA</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GD</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {homeVsAwayStats.map((stat) => (
                <tr key={stat.type} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 font-medium">{stat.type}</td>
                  <td className="py-2 px-2 text-center">{stat.matches}</td>
                  <td className="py-2 px-2 text-center text-green-600 font-semibold">{stat.wins}</td>
                  <td className="py-2 px-2 text-center text-blue-600 font-semibold">{stat.draws}</td>
                  <td className="py-2 px-2 text-center text-red-600 font-semibold">{stat.losses}</td>
                  <td className="py-2 px-2 text-center font-semibold">{stat.gf}</td>
                  <td className="py-2 px-2 text-center">{stat.ga}</td>
                  <td className="py-2 px-2 text-center font-semibold">{stat.gd > 0 ? '+' : ''}{stat.gd}</td>
                  <td className="py-2 px-2 text-center font-bold">{stat.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-3 py-2">
            <p className="text-sm font-semibold">Strong Home Performance</p>
            <p className="text-xs text-muted-foreground">64% win rate at home vs 36% away</p>
          </div>
          <div className="border-l-4 border-red-500 pl-3 py-2">
            <p className="text-sm font-semibold">Away Weakness</p>
            <p className="text-xs text-muted-foreground">Conceding more goals away (1.7 per match)</p>
          </div>
          <div className="border-l-4 border-green-500 pl-3 py-2">
            <p className="text-sm font-semibold">Goal Difference Gap</p>
            <p className="text-xs text-muted-foreground">+12 GD home vs -4 GD away</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
