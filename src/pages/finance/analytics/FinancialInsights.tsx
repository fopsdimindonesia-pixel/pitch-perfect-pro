import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle } from 'lucide-react';

export default function FinancialInsights() {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Strong Revenue Growth',
      description: 'Revenue grew 24.3% Q/Q. EO subscriptions driving 44% of revenue with consistent growth.',
      trend: '+24.3%',
      trendType: 'positive',
    },
    {
      icon: TrendingUp,
      title: 'High Profit Margins',
      description: 'Maintaining 72%+ profit margins across all months. Operating efficiency improving.',
      trend: '72.4%',
      trendType: 'positive',
    },
    {
      icon: TrendingUp,
      title: 'Subscriber Growth',
      description: 'Pro tier growing 100% Y/Y. Total subscribers up 25% this quarter.',
      trend: '+25%',
      trendType: 'positive',
    },
    {
      icon: AlertCircle,
      title: 'Payment Success Rate',
      description: 'Maintained 97.2% success rate. Credit card failures declining with new processors.',
      trend: '97.2%',
      trendType: 'positive',
    },
    {
      icon: TrendingUp,
      title: 'Churn Analysis',
      description: 'Monthly churn rate at 2.2%. Enterprise tier showing best retention at 98.5%.',
      trend: '2.2%',
      trendType: 'warning',
    },
    {
      icon: TrendingUp,
      title: 'LTV:CAC Ratio',
      description: 'Strong unit economics with 4.2x LTV:CAC ratio. Sustainable growth model.',
      trend: '4.2x',
      trendType: 'positive',
    },
  ];

  return (
    <main role="main" aria-label="Financial insights and KPIs">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Financial Insights</h1>
        <p className="text-muted-foreground mt-1">Key performance indicators and actionable recommendations</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Insight Summary</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Financial Health</p>
            <p className="text-2xl font-bold text-green-600">Excellent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Growth Trajectory</p>
            <p className="text-2xl font-bold">Accelerating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Key Insights</p>
            <p className="text-2xl font-bold">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Action Items</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, idx) => {
          const IconComponent = insight.icon;
          return (
            <Card key={idx} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${insight.trendType === 'positive' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      <IconComponent className={`w-5 h-5 ${insight.trendType === 'positive' ? 'text-green-600' : 'text-yellow-600'}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                    </div>
                  </div>
                  <Badge className={insight.trendType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {insight.trend}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold">Expand Enterprise Tier Marketing</p>
              <Badge className="bg-blue-100 text-blue-800">Priority High</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Enterprise subscribers have 98.5% retention. Increase CAC for this segment to drive growth.</p>
            <Button size="sm" variant="outline" className="mt-3">Review Strategy</Button>
          </div>

          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold">Address Credit Card Failures</p>
              <Badge className="bg-yellow-100 text-yellow-800">Priority Medium</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Credit card success rate at 95.2%. Test additional payment processors to improve conversion.</p>
            <Button size="sm" variant="outline" className="mt-3">Take Action</Button>
          </div>

          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold">Optimize Pricing Strategy</p>
              <Badge className="bg-green-100 text-green-800">Priority Low</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Strong margins suggest room for price increases. Test 5-10% price increase on new customers.</p>
            <Button size="sm" variant="outline" className="mt-3">Explore Options</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs text-muted-foreground">4-Month Performance</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Revenue</span>
                  <span className="font-semibold">Rp 885M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Profit</span>
                  <span className="font-semibold">Rp 642M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Margin</span>
                  <span className="font-semibold">72.4%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded border border-green-200">
              <p className="text-xs text-muted-foreground">Growth Indicators</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subscriber Growth</span>
                  <span className="font-semibold">+25% QoQ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Revenue Growth</span>
                  <span className="font-semibold">+24.3% QoQ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>MRR Growth</span>
                  <span className="font-semibold">+280% YTD</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
