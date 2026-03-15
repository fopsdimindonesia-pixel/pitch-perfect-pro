import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp } from 'lucide-react';

const budgetData = [
  { month: 'Monitor', category: 'Infrastructure', allocated: 50000000, spent: 45000000, status: 'on-track' },
  { month: 'Monitor', category: 'Operations', allocated: 35000000, spent: 32000000, status: 'on-track' },
  { month: 'Monitor', category: 'Marketing', allocated: 30000000, spent: 28000000, status: 'on-track' },
  { month: 'Monitor', category: 'Support', allocated: 25000000, spent: 23000000, status: 'on-track' },
];

const budgetHistory = [
  { month: 'Jan', allocated: 140000000, spent: 125000000 },
  { month: 'Feb', allocated: 140000000, spent: 128000000 },
  { month: 'Mar', allocated: 140000000, spent: 135000000 },
  { month: 'Apr', allocated: 140000000, spent: 131000000 },
];

export default function BudgetTracking() {
  return (
    <main role="main" aria-label="Budget management and tracking">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Budget Management & Tracking</h1>
        <p className="text-muted-foreground mt-1">Monitor budget allocation and spending across departments</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Budget Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Budget Allocated</p>
            <p className="text-2xl font-bold">Rp 140M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold">Rp 131M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Budget Remaining</p>
            <p className="text-2xl font-bold text-green-600">Rp 9M</p>
            <p className="text-xs text-green-600 mt-1">6.4% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Budget Utilization</p>
            <p className="text-2xl font-bold">93.6%</p>
            <p className="text-xs text-yellow-600 mt-1">⚠ Approaching limit</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="budget-chart">Budget vs Actual Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number / 1000000).toFixed(0)}M`} />
                <Legend />
                <Bar dataKey="allocated" fill="#3b82f6" name="Allocated Budget" />
                <Bar dataKey="spent" fill="#ef4444" name="Actual Spending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="category-budget">Budget by Category (Current Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetData.map((budget) => {
              const utilization = (budget.spent / budget.allocated) * 100;
              const remaining = budget.allocated - budget.spent;
              return (
                <div key={budget.category} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{budget.category}</p>
                      <p className="text-xs text-muted-foreground">Rp {(budget.spent).toLocaleString('id-ID')} / Rp {(budget.allocated).toLocaleString('id-ID')}</p>
                    </div>
                    <Badge className={budget.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {budget.status === 'on-track' ? '✓ On Track' : '⚠ Over Budget'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${utilization}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{utilization.toFixed(1)}% utilized</span>
                      <span>Rp {(remaining).toLocaleString('id-ID')} remaining</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Budget Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium">High Utilization</p>
              <p className="text-xs text-muted-foreground mt-1">Marketing budget is at 93%, approaching limit</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="font-medium">Trend Alert</p>
              <p className="text-xs text-muted-foreground mt-1">Infrastructure spending increased 8% month-over-month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Spending Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Avg Monthly Spending</span>
              <span className="font-semibold">Rp 131.25M</span>
            </div>
            <div className="flex justify-between">
              <span>Variance from Budget</span>
              <span className="font-semibold text-green-600">-6.4% (Under)</span>
            </div>
            <div className="flex justify-between">
              <span>Highest Category</span>
              <span className="font-semibold">Infrastructure (32%)</span>
            </div>
            <Button variant="outline" className="w-full mt-2" size="sm">Download Budget Report</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
