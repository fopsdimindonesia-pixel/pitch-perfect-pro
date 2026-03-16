import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const possessionTrends = [
  { matchday: 'MD1', possession: 55, opponentPossession: 45 },
  { matchday: 'MD2', possession: 48, opponentPossession: 52 },
  { matchday: 'MD3', possession: 62, opponentPossession: 38 },
  { matchday: 'MD4', possession: 58, opponentPossession: 42 },
  { matchday: 'MD5', possession: 51, opponentPossession: 49 },
  { matchday: 'MD6', possession: 65, opponentPossession: 35 },
];

const possessionStats = {
  averagePossession: 56.5,
  highestPossession: 65,
  lowestPossession: 48,
  possessionAbove50: 5,
  matchesBelow50: 1,
  homeAvg: 58,
  awayAvg: 54,
};

const possessionCorrelation = [
  { metric: 'Possession %', possession: 56.5, result: 'Mixed' },
  { metric: 'when > 50%', possession: 60, result: 'Strong' },
  { metric: 'when < 50%', possession: 45, result: 'Weak' },
];

export default function PossessionTrends() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Possession Trends</h1>
          <p className="text-muted-foreground mt-1">Ball possession and control analysis throughout the season</p>
        </div>
      </section>

      {/* Key Metrics */}
      <section aria-label="Possession key metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{possessionStats.averagePossession}%</p>
                <p className="text-xs text-muted-foreground">Avg Possession</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{possessionStats.highestPossession}%</p>
                <p className="text-xs text-muted-foreground">Highest</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{possessionStats.lowestPossession}%</p>
                <p className="text-xs text-muted-foreground">Lowest</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">83%</p>
                <p className="text-xs text-muted-foreground">Matches {'>'}50%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Team Possession Trend */}
      <Card>
        <CardHeader>
          <CardTitle id="possession-trend">Possession Trend by Matchday</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={possessionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="matchday" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Area type="monotone" dataKey="possession" fill="#3b82f6" stroke="#1e40af" name="Our Possession" />
                <Area type="monotone" dataKey="opponentPossession" fill="#ef4444" stroke="#b91c1c" name="Opponent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Match Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Match-by-Match Possession</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {possessionTrends.map((match) => (
            <div key={match.matchday} className="border rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{match.matchday}</span>
                <div className="flex gap-3">
                  <span className="text-sm font-bold text-blue-600">{match.possession}%</span>
                  <span className="text-sm text-muted-foreground">{match.opponentPossession}%</span>
                </div>
              </div>
              <div className="flex h-2 gap-1 rounded overflow-hidden">
                <div
                  className="bg-blue-500"
                  style={{ width: `${match.possession}%` }}
                  role="progressbar"
                  aria-valuenow={match.possession}
                  aria-valuetext={`${match.possession}% possession`}
                ></div>
                <div className="bg-red-500" style={{ width: `${match.opponentPossession}%` }}></div>
              </div>
            </div>
          ))}
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
              <p className="text-sm text-muted-foreground">Home Average</p>
              <p className="text-3xl font-bold text-blue-600">{possessionStats.homeAvg}%</p>
              <p className="text-xs text-muted-foreground mt-2">At home advantage</p>
            </div>
            <div className="border rounded p-4 text-center">
              <p className="text-sm text-muted-foreground">Away Average</p>
              <p className="text-3xl font-bold text-orange-600">{possessionStats.awayAvg}%</p>
              <p className="text-xs text-muted-foreground mt-2">On the road</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Possession & Performance Correlation */}
      <Card>
        <CardHeader>
          <CardTitle>Possession vs Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-green-500 pl-3 py-2">
            <p className="text-sm font-semibold">High Possession ({'>'}55%)</p>
            <p className="text-xs text-muted-foreground">Generally stronger performances with more control</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-3 py-2">
            <p className="text-sm font-semibold">Medium Possession (45-55%)</p>
            <p className="text-xs text-muted-foreground">Competitive matches balanced between teams</p>
          </div>
          <div className="border-l-4 border-red-500 pl-3 py-2">
            <p className="text-sm font-semibold">Low Possession (<45%)</p>
            <p className="text-xs text-muted-foreground">Only 1 match, tactical flexibility</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Team maintains possession control in majority of matches (83% above 50%)</p>
          <p>✓ Home possession advantage of 4% higher than away matches</p>
          <p>✓ Best performance at MD6 with 65% possession and strong result</p>
          <p>✓ Consistent possession levels indicate tactical stability</p>
        </CardContent>
      </Card>
    </main>
  );
}
