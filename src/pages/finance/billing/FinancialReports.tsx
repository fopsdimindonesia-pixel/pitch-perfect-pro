import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 185000000 },
  { month: 'Feb', revenue: 220000000 },
  { month: 'Mar', revenue: 250000000 },
  { month: 'Apr', revenue: 230000000 },
];

const paymentTypeData = [
  { name: 'Bank Transfer', value: 450000000, color: '#3b82f6' },
  { name: 'Credit Card', value: 200000000, color: '#ef4444' },
  { name: 'E-Wallet', value: 135000000, color: '#22c55e' },
];

const monthlyIncomeData = [
  { month: 'Jan', clubs: 60000000, eos: 80000000, players: 45000000 },
  { month: 'Feb', clubs: 75000000, eos: 95000000, players: 50000000 },
  { month: 'Mar', clubs: 85000000, eos: 110000000, players: 55000000 },
  { month: 'Apr', clubs: 80000000, eos: 105000000, players: 45000000 },
];

export default function FinancialReports() {
  return (
    <main role="main" aria-label="Financial reports and analysis">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Financial Reports</h1>
        <p className="text-muted-foreground mt-1">Revenue growth, payment methods, and income analysis</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Financial Summary</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Revenue (4 months)</p>
            <p className="text-2xl font-bold">Rp 885M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Monthly</p>
            <p className="text-2xl font-bold text-blue-600">Rp 221.25M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Growth (Jan-Apr)</p>
            <p className="text-2xl font-bold text-green-600">+24.3%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Highest Month</p>
            <p className="text-2xl font-bold">March: Rp 250M</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="revenue-growth">Revenue Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Overall Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle id="payment-methods">Payments by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={paymentTypeData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: Rp ${(entry.value / 1000000).toFixed(0)}M`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {paymentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentTypeData.map((type) => {
              const percentage = ((type.value / 785000000) * 100).toFixed(1);
              return (
                <div key={type.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{type.name}</span>
                    <span className="text-sm font-bold">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full" style={{ width: `${percentage}%`, backgroundColor: type.color }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Rp {(type.value / 1000000).toFixed(0)}M</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle id="income-source">Monthly Income by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Legend />
                <Bar dataKey="clubs" fill="#3b82f6" name="Club Subscriptions" />
                <Bar dataKey="eos" fill="#8b5cf6" name="EO Subscriptions" />
                <Bar dataKey="players" fill="#ec4899" name="Player Registration" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
