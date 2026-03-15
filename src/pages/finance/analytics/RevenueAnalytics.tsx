import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', clubSubs: 65000000, eoSubs: 80000000, playerReg: 40000000 },
  { month: 'Feb', clubSubs: 75000000, eoSubs: 95000000, playerReg: 50000000 },
  { month: 'Mar', clubSubs: 85000000, eoSubs: 110000000, playerReg: 55000000 },
  { month: 'Apr', clubSubs: 80000000, eoSubs: 105000000, playerReg: 45000000 },
];

const yearlyRevenue = [
  { year: '2024', revenue: 580000000 },
  { year: '2025', revenue: 750000000 },
  { year: '2026', revenue: 885000000 },
];

export default function RevenueAnalytics() {
  return (
    <main role="main" aria-label="Revenue analytics">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
        <p className="text-muted-foreground mt-1">Comprehensive revenue analysis and growth tracking</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Revenue Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Revenue (YTD)</p>
            <p className="text-2xl font-bold">Rp 885M</p>
            <p className="text-xs text-green-600 mt-1">↑ 18% vs last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Monthly Average</p>
            <p className="text-2xl font-bold">Rp 221.25M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Growth Rate</p>
            <p className="text-2xl font-bold text-green-600">24.3%</p>
            <p className="text-xs text-green-600 mt-1">Q1 vs Q4 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Largest Stream</p>
            <p className="text-2xl font-bold">EO Subs</p>
            <p className="text-xs text-muted-foreground mt-1">Rp 390M (44%)</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="monthly-detail">Monthly Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Legend />
                <Bar dataKey="clubSubs" fill="#3b82f6" name="Club Subscriptions" />
                <Bar dataKey="eoSubs" fill="#8b5cf6" name="EO Subscriptions" />
                <Bar dataKey="playerReg" fill="#ec4899" name="Player Registration" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="revenue-trend">Revenue Trend (Last 3 Years)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" name="Annual Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Stream</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span>Club Subscriptions</span>
                <span className="font-semibold">Rp 305M</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '34.4%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>EO Subscriptions</span>
                <span className="font-semibold">Rp 390M</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '44%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Player Registration</span>
                <span className="font-semibold">Rp 190M</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-pink-500" style={{ width: '21.4%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Growth Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">MoM Growth (Mar→Apr)</p>
              <p className="text-2xl font-bold text-red-600">-7.8%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">QoQ Growth (Q1→Q2 proj.)</p>
              <p className="text-2xl font-bold text-green-600">+8.5%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">YoY Growth</p>
              <p className="text-2xl font-bold text-green-600">+18%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Performing Months</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">March 2026</p>
              <p className="text-xs text-muted-foreground">Rp 250M (Peak)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">February 2026</p>
              <p className="text-xs text-muted-foreground">Rp 220M</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-medium">January 2026</p>
              <p className="text-xs text-muted-foreground">Rp 185M</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
