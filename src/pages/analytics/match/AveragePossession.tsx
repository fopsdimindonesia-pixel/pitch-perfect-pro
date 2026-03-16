import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const possessionTrendData = [
  { matchday: 'MD1', possession: 55, result: 'W', opponent: 'Team A' },
  { matchday: 'MD2', possession: 48, result: 'L', opponent: 'Team B' },
  { matchday: 'MD3', possession: 62, result: 'W', opponent: 'Team C' },
  { matchday: 'MD4', possession: 58, result: 'W', opponent: 'Team D' },
  { matchday: 'MD5', possession: 51, result: 'D', opponent: 'Team E' },
  { matchday: 'MD6', possession: 65, result: 'W', opponent: 'Team F' },
  { matchday: 'MD7', possession: 54, result: 'W', opponent: 'Team G' },
  { matchday: 'MD8', possession: 49, result: 'D', opponent: 'Team H' },
];

const possessionStats = {
  average: 56.5,
  highest: 65,
  lowest: 48,
  homeAvg: 58,
  awayAvg: 54,
  winWith50Plus: 5,
  lossBelow50: 1,
};

export default function AveragePossession() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Average Possession</h1>
          <p className="text-muted-foreground mt-1">Ball possession trends and tactical control analysis</p>
        </div>
      </section>

      {/* Key Stats */}
      <section aria-label="Possession statistics" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Possession</p>
            <p className="text-2xl font-bold text-blue-600">{possessionStats.average}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Highest Possession</p>
            <p className="text-2xl font-bold">{possessionStats.highest}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Lowest Possession</p>
            <p className="text-2xl font-bold">{possessionStats.lowest}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Control Rate</p>
            <p className="text-2xl font-bold text-green-600">56%</p>
          </CardContent>
        </Card>
      </section>

      {/* Possession Trend */}
      <Card>
        <CardHeader>
          <CardTitle id="possession-trend">Possession Trend (Last 8 Matches)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={possessionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="matchday" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Area type="monotone" dataKey="possession" fill="#3b82f6" stroke="#1e40af" name="Possession %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Possession vs Result */}
      <Card>
        <CardHeader>
          <CardTitle>Possession by Match Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">When Winning</p>
              <p className="text-3xl font-bold text-green-600">59%</p>
              <p className="text-xs text-muted-foreground">Average possession in wins</p>
            </div>
            <div className="border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">When Drawing</p>
              <p className="text-3xl font-bold text-blue-600">50%</p>
              <p className="text-xs text-muted-foreground">Average possession in draws</p>
            </div>
            <div className="border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">When Losing</p>
              <p className="text-3xl font-bold text-red-600">45%</p>
              <p className="text-xs text-muted-foreground">Average possession in losses</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Details */}
      <Card>
        <CardHeader>
          <CardTitle>Match Possession Details (Last 8)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Match</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Possession</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Result</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Opponent</th>
              </tr>
            </thead>
            <tbody>
              {possessionTrendData.map((match) => (
                <tr key={match.matchday} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-semibold">{match.matchday}</td>
                  <td className="text-center py-3 px-2">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-full max-w-xs bg-gray-200 rounded overflow-hidden h-2">
                        <div className="bg-blue-500 h-full" style={{ width: `${match.possession}%` }}></div>
                      </div>
                      <span className="font-bold text-sm w-10">{match.possession}%</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-2">
                    <span
                      className={`font-semibold ${match.result === 'W' ? 'text-green-600' : match.result === 'D' ? 'text-blue-600' : 'text-red-600'}`}
                    >
                      {match.result}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2 text-muted-foreground text-xs">{match.opponent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Possession Ranges */}
      <Card>
        <CardHeader>
          <CardTitle>Possession Control Levels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Dominant (60%+)</span>
              <span className="text-sm font-bold">2 matches</span>
            </div>
            <div className="h-3 bg-green-500 rounded" style={{ width: '25%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Balanced (50-60%)</span>
              <span className="text-sm font-bold">5 matches</span>
            </div>
            <div className="h-3 bg-blue-500 rounded" style={{ width: '62%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Defensive ({'<'}50%)</span>
              <span className="text-sm font-bold">1 match</span>
            </div>
            <div className="h-3 bg-orange-500 rounded" style={{ width: '12%' }}></div>
          </div>
        </CardContent>
      </Card>

      {/* Home vs Away */}
      <Card>
        <CardHeader>
          <CardTitle>Home vs Away Possession</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Home Matches</p>
              <p className="text-3xl font-bold text-blue-600">{possessionStats.homeAvg}%</p>
              <p className="text-xs text-muted-foreground mt-2">Higher control at home</p>
            </div>
            <div className="border rounded p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Away Matches</p>
              <p className="text-3xl font-bold text-orange-600">{possessionStats.awayAvg}%</p>
              <p className="text-xs text-muted-foreground mt-2">More defensive approach</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Average possession of 56.5% indicates attacking-minded approach</p>
          <p>✓ 4% difference between home (58%) and away (54%) possession</p>
          <p>✓ Stronger wins correlate with higher possession (59% avg)</p>
          <p>⚠ Can adapt tactically - shown by successful 48% possession win</p>
        </CardContent>
      </Card>
    </main>
  );
}
