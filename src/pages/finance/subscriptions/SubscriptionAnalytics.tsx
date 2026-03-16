import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const subscriptionTrend = [
  { month: 'Jan', basic: 80, professional: 120, enterprise: 25 },
  { month: 'Feb', basic: 95, professional: 145, enterprise: 30 },
  { month: 'Mar', basic: 120, professional: 240, enterprise: 40 },
  { month: 'Apr', basic: 120, professional: 240, enterprise: 45 },
];

const churnData = [
  { month: 'Jan', acquired: 35, churned: 2 },
  { month: 'Feb', acquired: 42, churned: 1 },
  { month: 'Mar', basic: 45, professional: 8, churned: 2 },
  { month: 'Apr', acquired: 28, churned: 3 },
];

const mrrrData = [
  { month: 'Jan', mrr: 18500000 },
  { month: 'Feb', mrr: 22000000 },
  { month: 'Mar', mrr: 52000000 },
  { month: 'Apr', mrr: 70500000 },
];

export default function SubscriptionAnalytics() {
  return (
    <main role="main" aria-label="Subscription analytics">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Subscription Analytics</h1>
        <p className="text-muted-foreground mt-1">Track subscription growth, retention, and revenue metrics</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Subscription Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Subscribers</p>
            <p className="text-2xl font-bold">490</p>
            <p className="text-xs text-green-600 mt-1">↑ 25% this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Monthly Recurring Revenue</p>
            <p className="text-2xl font-bold">Rp 70.5M</p>
            <p className="text-xs text-green-600 mt-1">↑ 281% growth</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Churn Rate</p>
            <p className="text-2xl font-bold">2.2%</p>
            <p className="text-xs text-red-600 mt-1">Monthly average</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Retention Rate</p>
            <p className="text-2xl font-bold text-green-600">97.8%</p>
            <p className="text-xs text-green-600 mt-1">High stability</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="subscriber-growth">Subscriber Growth by Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={subscriptionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="basic" stroke="#6b7280" name="Basic" />
                <Line type="monotone" dataKey="professional" stroke="#3b82f6" name="Professional" />
                <Line type="monotone" dataKey="enterprise" stroke="#f59e0b" name="Enterprise" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="mrr-trend">Monthly Recurring Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mrrrData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(1)}M`} />
                <Bar dataKey="mrr" fill="#10b981" name="MRR" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscriber Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Basic</span>
                <span className="font-semibold">120 (24.5%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-gray-500" style={{ width: '24.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Professional</span>
                <span className="font-semibold">325 (66.3%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '66.3%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Enterprise</span>
                <span className="font-semibold">45 (9.2%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '9.2%' }}></div>
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
              <p className="text-xs text-muted-foreground">New Subscriptions</p>
              <p className="text-2xl font-bold text-green-600">+115</p>
              <p className="text-xs text-muted-foreground mt-1">Last month</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Customer Lifetime</p>
              <p className="text-2xl font-bold">8.5 months</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">LTV:CAC Ratio</p>
              <p className="text-2xl font-bold text-blue-600">4.2x</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="font-semibold text-green-900">Healthy Growth</p>
              <p className="text-xs text-green-700 mt-1">280% quarterly MRR increase</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="font-semibold text-blue-900">High Retention</p>
              <p className="text-xs text-blue-700 mt-1">97.8% monthly retention rate</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
