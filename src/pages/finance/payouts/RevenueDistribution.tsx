import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueDistribution = [
  { category: 'Club Subscriptions', amount: 320000000, percentage: 36, color: '#3b82f6' },
  { category: 'EO Subscriptions', amount: 390000000, percentage: 44, color: '#8b5cf6' },
  { category: 'Player Registration', amount: 175000000, percentage: 20, color: '#ec4899' },
];

const payoutByCategory = [
  { month: 'Jan', clubs: 28000000, eos: 35000000, players: 7000000 },
  { month: 'Feb', clubs: 45000000, eos: 42000000, players: 13000000 },
  { month: 'Mar', clubs: 20000000, eos: 25000000, players: 5000000 },
];

export default function RevenueDistribution() {
  return (
    <main role="main" aria-label="Revenue distribution tracking">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Revenue Distribution</h1>
        <p className="text-muted-foreground mt-1">Track how platform revenue is distributed to stakeholders</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Distribution Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Distributed</p>
            <p className="text-2xl font-bold">Rp 220M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Available for Distribution</p>
            <p className="text-2xl font-bold">Rp 125M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Platform Retained</p>
            <p className="text-2xl font-bold text-blue-600">Rp 560M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Retention Rate</p>
            <p className="text-2xl font-bold">63.2%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="revenue-sources">Revenue Sources Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueDistribution} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.category}: ${entry.percentage}%`} outerRadius={80} fill="#8884d8" dataKey="amount">
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="payout-trends">Payout Trends by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payoutByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Legend />
                <Bar dataKey="clubs" fill="#3b82f6" name="Club Payouts" />
                <Bar dataKey="eos" fill="#8b5cf6" name="EO Payouts" />
                <Bar dataKey="players" fill="#ec4899" name="Player Registration Dist." />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribution Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Club Subscriptions</span>
                <span className="font-semibold">Rp 93M (42.3%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '42.3%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">EO Subscriptions</span>
                <span className="font-semibold">Rp 102M (46.4%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '46.4%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Player Registration</span>
                <span className="font-semibold">Rp 25M (11.3%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-pink-500" style={{ width: '11.3%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform Economics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="text-xs text-muted-foreground">Gross Revenue</p>
              <p className="font-semibold">Rp 885M</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="text-xs text-muted-foreground">Stakeholder Payouts</p>
              <p className="font-semibold">Rp 220M (24.85%)</p>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <p className="text-xs text-muted-foreground">Platform Retention</p>
              <p className="font-semibold">Rp 665M (75.15%)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribution Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium">Next Payout Cycle</p>
              <p className="text-xs text-muted-foreground">2026-03-31 (16 days)</p>
            </div>
            <div className="p-2 bg-blue-50 border border-blue-200 rounded">
              <p className="font-medium">Frequency</p>
              <p className="text-xs text-muted-foreground">Monthly, on last day</p>
            </div>
            <div className="p-2 bg-green-50 border border-green-200 rounded">
              <p className="font-medium">Min Threshold</p>
              <p className="text-xs text-muted-foreground">Rp 100K to qualify</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
