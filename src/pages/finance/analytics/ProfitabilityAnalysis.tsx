import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const profitabilityData = [
  { month: 'Jan', revenue: 185000000, cogs: 25000000, expenses: 30000000, profit: 130000000, margin: '70.3%' },
  { month: 'Feb', revenue: 220000000, cogs: 28000000, expenses: 32000000, profit: 160000000, margin: '72.7%' },
  { month: 'Mar', revenue: 250000000, cogs: 32000000, expenses: 35000000, profit: 183000000, margin: '73.2%' },
  { month: 'Apr', revenue: 230000000, cogs: 30000000, expenses: 31000000, profit: 169000000, margin: '73.5%' },
];

export default function ProfitabilityAnalysis() {
  return (
    <main role="main" aria-label="Profitability analysis">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Profitability Analysis</h1>
        <p className="text-muted-foreground mt-1">Profit margins, costs, and operational efficiency</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Profitability Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Profit (YTD)</p>
            <p className="text-2xl font-bold">Rp 642M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Profit Margin</p>
            <p className="text-2xl font-bold text-green-600">72.4%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Operating Costs</p>
            <p className="text-2xl font-bold">Rp 128M</p>
            <p className="text-xs text-muted-foreground mt-1">14.5% of revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Best Month</p>
            <p className="text-2xl font-bold">April</p>
            <p className="text-xs text-green-600 mt-1">73.5% margin</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="profit-breakdown">Profit Components Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Legend />
                <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
                <Bar dataKey="cogs" fill="#ef4444" name="COGS" />
                <Bar dataKey="expenses" fill="#f59e0b" name="Operating Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="margin-trend">Profit Margin Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#10b981" name="Net Profit" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span>COGS (12.3%)</span>
                <span className="font-semibold">Rp 109M</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '12.3%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Operations (14.5%)</span>
                <span className="font-semibold">Rp 128M</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: '14.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Profit (73.2%)</span>
                <span className="font-semibold">Rp 648M</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '73.2%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-2 bg-green-50 rounded">
              <p className="text-xs text-muted-foreground">Gross Profit</p>
              <p className="font-semibold">Rp 776M (87.7%)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="text-xs text-muted-foreground">Operating Profit</p>
              <p className="font-semibold">Rp 648M (73.2%)</p>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <p className="text-xs text-muted-foreground">Net Profit Margin</p>
              <p className="font-semibold">72.4% (4-month avg)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Efficiency Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>COGS Ratio</span>
              <span className="font-semibold">12.3%</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>OpEx Ratio</span>
              <span className="font-semibold">14.5%</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Profit Ratio</span>
              <span className="font-semibold">72.4%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
