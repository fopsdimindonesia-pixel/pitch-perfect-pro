import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const forecastData = [
  { month: 'Jan', actual: 185000000, forecast: 185000000, confidence: 100 },
  { month: 'Feb', actual: 220000000, forecast: 220000000, confidence: 100 },
  { month: 'Mar', actual: 250000000, forecast: 250000000, confidence: 100 },
  { month: 'Apr', actual: 230000000, forecast: 230000000, confidence: 100 },
  { month: 'May', actual: null, forecast: 245000000, confidence: 87 },
  { month: 'Jun', actual: null, forecast: 260000000, confidence: 82 },
  { month: 'Jul', actual: null, forecast: 275000000, confidence: 78 },
  { month: 'Aug', actual: null, forecast: 290000000, confidence: 75 },
];

export default function FinancialForecast() {
  return (
    <main role="main" aria-label="Financial forecasting">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Financial Forecast</h1>
        <p className="text-muted-foreground mt-1">Revenue projections and predictive analytics</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Forecast Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Q2 2026 Forecast</p>
            <p className="text-2xl font-bold">Rp 795M</p>
            <p className="text-xs text-green-600 mt-1">↑ 21% vs Q1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Next Month Projection</p>
            <p className="text-2xl font-bold">Rp 245M</p>
            <p className="text-xs text-blue-600 mt-1">87% confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">YoY Growth Projection</p>
            <p className="text-2xl font-bold text-green-600">+28%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Model Accuracy</p>
            <p className="text-2xl font-bold">92.3%</p>
            <p className="text-xs text-muted-foreground mt-1">Last 3 months</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="forecast-trend">Revenue Forecast (12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => value ? `Rp ${(value as number / 1000000).toFixed(0)}M` : '-'} />
                <Legend />
                <Area type="monotone" dataKey="actual" stroke="#22c55e" fill="url(#colorActual)" name="Actual" />
                <Area type="monotone" dataKey="forecast" stroke="#3b82f6" fillOpacity={0} strokeDasharray="5 5" name="Forecast" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Strong Uptrend</p>
              <p className="text-xs text-muted-foreground">+6.5% monthly growth expected</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Seasonal Peak</p>
              <p className="text-xs text-muted-foreground">August expected to be strongest</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Forecast Confidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span>May 2026</span>
                <span className="font-semibold">87%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>June 2026</span>
                <span className="font-semibold">82%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>August 2026</span>
                <span className="font-semibold">75%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: '75%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quarterly Projections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Q1 2026 (Final)</p>
              <p className="text-xs text-muted-foreground">Rp 655M (Actual)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Q2 2026</p>
              <p className="text-xs text-muted-foreground">Rp 795M (Forecast)</p>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <p className="font-medium">Q3 2026</p>
              <p className="text-xs text-muted-foreground">Rp 915M (Projection)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
