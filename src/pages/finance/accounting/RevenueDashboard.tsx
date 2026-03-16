import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const revenueData = [
  { month: 'Jan', income: 185000000, expenses: 30000000, profit: 155000000 },
  { month: 'Feb', income: 220000000, expenses: 32000000, profit: 188000000 },
  { month: 'Mar', income: 250000000, expenses: 35000000, profit: 215000000 },
  { month: 'Apr', income: 230000000, expenses: 31000000, profit: 199000000 },
];

export default function RevenueDashboard() {
  return (
    <main role="main" aria-label="Revenue dashboard">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Revenue Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform revenue, expenses, and profitability tracking</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Revenue Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">Rp 885M</p>
            <p className="text-xs text-green-600 mt-1">↑ 24.3% this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">Rp 128M</p>
            <p className="text-xs text-red-600 mt-1">↑ 3.3% this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Net Profit</p>
            <p className="text-2xl font-bold text-green-600">Rp 757M</p>
            <p className="text-xs text-green-600 mt-1">85.5% margin</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Monthly Profit</p>
            <p className="text-2xl font-bold">Rp 189.25M</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-xs text-green-600">Consistent growth</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="revenue-trend">Revenue vs. Expenses Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#22c55e" name="Income" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="profit-trend">Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Area type="monotone" dataKey="profit" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProfit)" name="Net Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Infrastructure</span>
              <span className="font-semibold">Rp 45M (35%)</span>
            </div>
            <div className="flex justify-between">
              <span>Operations</span>
              <span className="font-semibold">Rp 35M (27%)</span>
            </div>
            <div className="flex justify-between">
              <span>Marketing</span>
              <span className="font-semibold">Rp 28M (22%)</span>
            </div>
            <div className="flex justify-between">
              <span>Support</span>
              <span className="font-semibold">Rp 20M (16%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Club Subscriptions</span>
              <span className="font-semibold">Rp 320M (36%)</span>
            </div>
            <div className="flex justify-between">
              <span>EO Subscriptions</span>
              <span className="font-semibold">Rp 390M (44%)</span>
            </div>
            <div className="flex justify-between">
              <span>Player Registration</span>
              <span className="font-semibold">Rp 175M (20%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profitability Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Gross Margin</p>
              <p className="text-lg font-bold text-green-600">85.5%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Operating Efficiency</p>
              <p className="text-lg font-bold">88.2%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ROI</p>
              <p className="text-lg font-bold text-blue-600">215%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
