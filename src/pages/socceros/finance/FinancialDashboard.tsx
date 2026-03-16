import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SoccerosDashboardLayout, PageHeader, StatCard } from '@/components/socceros/DashboardLayout';
import { mockFinancials, getChartData, type ChartDataPoint } from '@/lib/socceros/mockData';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Download } from 'lucide-react';

export default function FinancialDashboard() {
  const [period, setPeriod] = useState('Q1 2025');
  const currentData = mockFinancials[0];
  const chartData = getChartData('revenue');

  const expenses = [
    { category: 'Player Salaries', amount: 1200000, percentage: 60 },
    { category: 'Staff Compensation', amount: 400000, percentage: 20 },
    { category: 'Operations & Maintenance', amount: 300000, percentage: 15 },
    { category: 'Other', amount: 100000, percentage: 5 },
  ];

  const revenue = [
    { source: 'Ticket Sales', amount: 800000, percentage: 32 },
    { source: 'Sponsorship', amount: 1000000, percentage: 40 },
    { source: 'Merchandise', amount: 500000, percentage: 20 },
    { source: 'Broadcasting Rights', amount: 200000, percentage: 8 },
  ];

  return (
    <SoccerosDashboardLayout role="CLUB">
      <PageHeader
        title="Financial Management"
        subtitle="Track revenue, expenses, and budget allocation"
        icon="💰"
        action={<Button><Download className="w-4 h-4 mr-2" /> Export Report</Button>}
      />

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${(currentData.revenue / 1000000).toFixed(1)}M`}
          icon={<TrendingUp className="w-6 h-6" />}
          trend={{ value: 12.5, direction: 'up' }}
          color="green"
        />
        <StatCard
          title="Total Expenses"
          value={`$${(currentData.expenses / 1000000).toFixed(1)}M`}
          icon={<TrendingDown className="w-6 h-6" />}
          color="red"
        />
        <StatCard
          title="Net Profit"
          value={`$${(currentData.profit / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 66.7, direction: 'up' }}
          color="blue"
        />
        <StatCard
          title="Account Balance"
          value={`$${(currentData.balance / 1000000).toFixed(1)}M`}
          icon={<PieChart className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Financial Period</label>
        <div className="flex gap-2">
          {['Q1 2025', 'Q4 2024', 'Q3 2024', 'Q2 2024'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium border transition-colors ${
                period === p
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-200 text-gray-700 hover:border-blue-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue and Expense Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenue.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.source}</span>
                  <Badge variant="outline">${(item.amount / 1000000).toFixed(2)}M</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</p>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Total Revenue</span>
                <span>${(currentData.revenue / 1000000).toFixed(2)}M</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenses.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.category}</span>
                  <Badge variant="outline">${(item.amount / 1000000).toFixed(2)}M</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</p>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Total Expenses</span>
                <span>${(currentData.expenses / 1000000).toFixed(2)}M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Trend */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>6-Month Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.map((item: ChartDataPoint, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-12 font-medium">{item.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-8" style={{ width: '100%' }}>
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-all"
                    style={{ width: `${(item.value / 70) * 100}%` }}
                  >
                    ${item.value}M
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Alerts */}
      <div className="space-y-3">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-800">
            ⚠️ Sponsorship revenue 15% below budget target for Q1
          </AlertDescription>
        </Alert>
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            ✓ Overall profitability on track - 12.5% increase from Q4 2024
          </AlertDescription>
        </Alert>
      </div>
    </SoccerosDashboardLayout>
  );
}
