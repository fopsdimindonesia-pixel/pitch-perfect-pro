import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const shotAccuracyData = [
  { matchday: 'MD1', shots: 12, onsTarget: 7, goals: 2, accuracy: 58 },
  { matchday: 'MD2', shots: 8, onsTarget: 3, goals: 1, accuracy: 38 },
  { matchday: 'MD3', shots: 15, onsTarget: 9, goals: 3, accuracy: 60 },
  { matchday: 'MD4', shots: 11, onsTarget: 6, goals: 2, accuracy: 55 },
  { matchday: 'MD5', shots: 10, onsTarget: 4, goals: 1, accuracy: 40 },
  { matchday: 'MD6', shots: 14, onsTarget: 8, goals: 2, accuracy: 57 },
  { matchday: 'MD7', shots: 16, onsTarget: 11, goals: 4, accuracy: 69 },
  { matchday: 'MD8', shots: 5, onsTarget: 1, goals: 0, accuracy: 20 },
];

const shootingStats = {
  totalShots: 91,
  onTarget: 49,
  goals: 15,
  avgAccuracy: 54,
  conversionRate: 31,
  bestAccuracy: 69,
  highestShotCount: 16,
};

export default function ShotAccuracy() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shot Accuracy</h1>
          <p className="text-muted-foreground mt-1">Shooting statistics and shot quality analysis</p>
        </div>
      </section>

      {/* Key Metrics */}
      <section aria-label="Shooting statistics" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Shots</p>
            <p className="text-2xl font-bold">91</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Shots On Target</p>
            <p className="text-2xl font-bold text-blue-600">49</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Accuracy</p>
            <p className="text-2xl font-bold text-green-600">{shootingStats.avgAccuracy}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            <p className="text-2xl font-bold">{shootingStats.conversionRate}%</p>
          </CardContent>
        </Card>
      </section>

      {/* Shot Accuracy Trend */}
      <Card>
        <CardHeader>
          <CardTitle id="accuracy-trend">Shot Accuracy by Matchday</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shotAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="matchday" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Shot Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Shot Distribution</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="border rounded p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Off Target</p>
            <p className="text-3xl font-bold text-red-600">42</p>
            <p className="text-xs text-muted-foreground mt-1">46% of shots</p>
          </div>
          <div className="border rounded p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">On Target</p>
            <p className="text-3xl font-bold text-orange-600">34</p>
            <p className="text-xs text-muted-foreground mt-1">37% of shots</p>
          </div>
          <div className="border rounded p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Goals</p>
            <p className="text-3xl font-bold text-green-600">15</p>
            <p className="text-xs text-muted-foreground mt-1">16% conversion</p>
          </div>
        </CardContent>
      </Card>

      {/* Shot Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Match Shooting Statistics</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Match</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Shots</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">On Target</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Goals</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Accuracy</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">PoM</th>
              </tr>
            </thead>
            <tbody>
              {shotAccuracyData.map((match) => {
                const isHighAccuracy = match.accuracy >= 60;
                return (
                  <tr key={match.matchday} className={`border-b hover:bg-gray-50 ${isHighAccuracy ? 'bg-green-50' : ''}`}>
                    <td className="py-3 px-2 font-semibold">{match.matchday}</td>
                    <td className="text-center py-3 px-2">{match.shots}</td>
                    <td className="text-center py-3 px-2 font-semibold text-blue-600">{match.onsTarget}</td>
                    <td className="text-center py-3 px-2 font-bold text-green-600">{match.goals}</td>
                    <td className="text-center py-3 px-2 font-bold">{match.accuracy}%</td>
                    <td className="text-center py-3 px-2 text-yellow-600">
                      {isHighAccuracy ? '⭐' : match.goals > 2 ? '✓' : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Accuracy Ranges */}
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Performance Levels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Excellent (60%+)</span>
              <span className="text-sm font-bold text-green-600">3 matches</span>
            </div>
            <div className="h-3 bg-green-500 rounded" style={{ width: '37%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Good (50-59%)</span>
              <span className="text-sm font-bold text-blue-600">3 matches</span>
            </div>
            <div className="h-3 bg-blue-500 rounded" style={{ width: '37%' }}></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Needs Improvement ({'<'}50%)</span>
              <span className="text-sm font-bold text-orange-600">2 matches</span>
            </div>
            <div className="h-3 bg-orange-500 rounded" style={{ width: '25%' }}></div>
          </div>
        </CardContent>
      </Card>

      {/* Best & Worst Performances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Best Shooting Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="border-l-4 border-green-500 pl-3 py-2">
              <p className="font-semibold">MD7</p>
              <p className="text-sm text-muted-foreground">16 shots, 11 on target</p>
              <p className="text-lg font-bold text-green-600">69% accuracy, 4 goals</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Needs Improvement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="border-l-4 border-red-500 pl-3 py-2">
              <p className="font-semibold">MD8</p>
              <p className="text-sm text-muted-foreground">5 shots, 1 on target</p>
              <p className="text-lg font-bold text-red-600">20% accuracy, 0 goals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shot Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Shot Quality Indicators</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="border rounded p-3">
            <p className="text-sm text-muted-foreground">Shots Per Goal</p>
            <p className="text-2xl font-bold">6.1</p>
            <p className="text-xs text-muted-foreground">Average shots needed</p>
          </div>
          <div className="border rounded p-3">
            <p className="text-sm text-muted-foreground">On Target per Goal</p>
            <p className="text-2xl font-bold">3.3</p>
            <p className="text-xs text-muted-foreground">Good finishing quality</p>
          </div>
          <div className="border rounded p-3">
            <p className="text-sm text-muted-foreground">Best Match Accuracy</p>
            <p className="text-2xl font-bold text-green-600">69%</p>
            <p className="text-xs text-muted-foreground">MD7 peak performance</p>
          </div>
          <div className="border rounded p-3">
            <p className="text-sm text-muted-foreground">Shot Consistency</p>
            <p className="text-2xl font-bold">11.4</p>
            <p className="text-xs text-muted-foreground">Average per match</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ 54% average accuracy is solid for competitive football</p>
          <p>✓ 31% conversion rate shows good finishing in final third</p>
          <p>✓ MD7 performance (69% accuracy, 4 goals) demonstrates peak form</p>
          <p>⚠ Consistency varies - MD8 poor control with only 20% accuracy</p>
        </CardContent>
      </Card>
    </main>
  );
}
