import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const weeklyBreakdown = [
  { week: 'W1', matches: 2, wins: 1, draws: 0, losses: 1, gf: 3, ga: 3, points: 3 },
  { week: 'W2', matches: 2, wins: 1, draws: 1, losses: 0, gf: 3, ga: 2, points: 4 },
  { week: 'W3', matches: 2, wins: 1, draws: 0, losses: 1, gf: 4, ga: 3, points: 3 },
  { week: 'W4', matches: 2, wins: 2, draws: 0, losses: 0, gf: 5, ga: 1, points: 6 },
  { week: 'W5', matches: 2, wins: 1, draws: 1, losses: 0, gf: 3, ga: 2, points: 4 },
];

const monthlyStats = [
  { month: 'January', matches: 5, gf: 10, ga: 8, points: 10, trend: 'up' },
  { month: 'February', matches: 6, gf: 12, ga: 10, points: 13, trend: 'stable' },
  { month: 'March', matches: 5, gf: 9, ga: 7, points: 10, trend: 'down' },
  { month: 'April', matches: 6, gf: 8, ga: 6, points: 13, trend: 'up' },
];

export default function WeeklyBreakdown() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weekly & Monthly Breakdown</h1>
          <p className="text-muted-foreground mt-1">Temporal performance analysis across seasons</p>
        </div>
      </section>

      {/* Summary */}
      <section aria-label="Temporal statistics" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Weeks</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Months</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Best Month</p>
            <p className="text-2xl font-bold">February</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Best Week</p>
            <p className="text-2xl font-bold">W4</p>
          </CardContent>
        </Card>
      </section>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle id="weekly-breakdown">Weekly Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Week</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">M</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">W</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">D</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">L</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GF</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GA</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {weeklyBreakdown.map((week) => (
                <tr key={week.week} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-semibold">{week.week}</td>
                  <td className="text-center py-3 px-2">{week.matches}</td>
                  <td className="text-center py-3 px-2 text-green-600 font-semibold">{week.wins}</td>
                  <td className="text-center py-3 px-2 text-blue-600 font-semibold">{week.draws}</td>
                  <td className="text-center py-3 px-2 text-red-600 font-semibold">{week.losses}</td>
                  <td className="text-center py-3 px-2 font-semibold">{week.gf}</td>
                  <td className="text-center py-3 px-2">{week.ga}</td>
                  <td className="text-center py-3 px-2 font-bold">{week.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Weekly Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {weeklyBreakdown.map((week) => (
          <Card key={week.week} className={week.points >= 6 ? 'border-green-200 border-2' : week.points >= 4 ? 'border-blue-200' : ''}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{week.week}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex gap-1">
                {Array(week.wins)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`w${i}`} className="w-5 h-5 bg-green-500 rounded text-xs text-white flex items-center justify-center font-bold">
                      W
                    </div>
                  ))}
                {Array(week.draws)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`d${i}`} className="w-5 h-5 bg-blue-500 rounded text-xs text-white flex items-center justify-center font-bold">
                      D
                    </div>
                  ))}
                {Array(week.losses)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`l${i}`} className="w-5 h-5 bg-red-500 rounded text-xs text-white flex items-center justify-center font-bold">
                      L
                    </div>
                  ))}
              </div>
              <div className="border-t pt-2">
                <p className="text-xs text-muted-foreground">Goals: {week.gf}-{week.ga}</p>
                <p className="font-bold">{week.points} pts</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle id="monthly-table">Monthly Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Month</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">M</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GF</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">GA</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Pts</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Trend</th>
              </tr>
            </thead>
            <tbody>
              {monthlyStats.map((month) => (
                <tr key={month.month} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-semibold">{month.month}</td>
                  <td className="text-center py-3 px-2">{month.matches}</td>
                  <td className="text-center py-3 px-2 font-semibold text-green-600">{month.gf}</td>
                  <td className="text-center py-3 px-2">{month.ga}</td>
                  <td className="text-center py-3 px-2 font-bold">{month.points}</td>
                  <td className="text-center py-3 px-2">
                    {month.trend === 'up' && <span className="text-green-600">↗ Up</span>}
                    {month.trend === 'stable' && <span className="text-blue-600">→ Stable</span>}
                    {month.trend === 'down' && <span className="text-orange-600">↘ Down</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Month Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monthlyStats.map((month) => (
          <Card key={month.month}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{month.month}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Matches</p>
                  <p className="text-lg font-bold">{month.matches}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Points</p>
                  <p className="text-lg font-bold">{month.points}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-xs text-muted-foreground">GF</p>
                  <p className="text-lg font-bold text-green-600">{month.gf}</p>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <p className="text-xs text-muted-foreground">GA</p>
                  <p className="text-lg font-bold text-red-600">{month.ga}</p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <Badge
                  className={
                    month.trend === 'up'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : month.trend === 'stable'
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                        : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
                  }
                >
                  {month.trend === 'up' ? '📈 Improving' : month.trend === 'stable' ? '➡️ Consistent' : '📉 Declining'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-green-500 pl-3 py-2">
            <p className="text-sm font-semibold">Best Performance Week</p>
            <p className="text-xs text-muted-foreground">Week 4: 2 wins, 5 goals scored, only 1 conceded</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-3 py-2">
            <p className="text-sm font-semibold">Most Consistent Month</p>
            <p className="text-xs text-muted-foreground">February: 13 points from 6 matches (2.17 avg)</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-3 py-2">
            <p className="text-sm font-semibold">Scoring Evolution</p>
            <p className="text-xs text-muted-foreground">January 2.0 GF/M → February 2.0 → March 1.8 → April 1.3</p>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Key Observations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Strong start with 10 points in first month (January)</p>
          <p>✓ Peak performance in February with 13 points and 12 goals</p>
          <p>⚠ Slight decline in March - only 10 points with 9 goals</p>
          <p>✓ April comeback with strong defensive record (6 GA)</p>
        </CardContent>
      </Card>
    </main>
  );
}
