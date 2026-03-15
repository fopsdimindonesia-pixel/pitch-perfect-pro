import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bell, CheckCircle } from 'lucide-react';

const alerts = [
  { id: 'ALT-001', type: 'High Transaction Value', threshold: '> Rp 50M', count: 1, severity: 'medium', timestamp: '2026-03-15 14:32', action: 'review' },
  { id: 'ALT-002', type: 'Unusual Pattern Detected', threshold: 'Multiple refunds', count: 2, severity: 'low', timestamp: '2026-03-14 10:15', action: 'monitor' },
  { id: 'ALT-003', type: 'Failed Payment Attempt', threshold: '> 3 failures', count: 1, severity: 'medium', timestamp: '2026-03-13 22:45', action: 'contact' },
];

export default function PaymentAlerts() {
  return (
    <main role="main" aria-label="Payment alerts monitoring">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Alerts</h1>
        <p className="text-muted-foreground mt-1">Monitor payment alerts and threshold violations</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Alert Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Alerts</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Resolved</p>
            <p className="text-2xl font-bold text-green-600">9</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending Action</p>
            <p className="text-2xl font-bold text-yellow-600">2</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="payment-alerts-table">Current Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <Bell className={`w-5 h-5 mt-0.5 ${alert.severity === 'high' ? 'text-red-600' : alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
                  <div>
                    <p className="font-semibold">{alert.type}</p>
                    <p className="text-sm text-muted-foreground">{alert.id}</p>
                  </div>
                </div>
                <Badge
                  className={
                    alert.severity === 'high'
                      ? 'bg-red-100 text-red-800'
                      : alert.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                  }
                >
                  {alert.severity}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Threshold</p>
                  <p className="font-medium">{alert.threshold}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Occurrences</p>
                  <p className="font-medium">{alert.count}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Triggered</p>
                  <p className="font-medium">{alert.timestamp}</p>
                </div>
              </div>

              <Button size="sm" variant="outline">
                {alert.action === 'review' ? 'Review' : alert.action === 'monitor' ? 'Monitor' : 'Contact'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Alert Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded flex justify-between">
              <span>High Value Transactions</span>
              <span className="font-semibold">&gt; Rp 50M</span>
            </div>
            <div className="p-2 bg-blue-50 rounded flex justify-between">
              <span>Failed Payment Attempts</span>
              <span className="font-semibold">&gt; 3</span>
            </div>
            <div className="p-2 bg-blue-50 rounded flex justify-between">
              <span>Unusual Patterns</span>
              <span className="font-semibold">Auto-detect</span>
            </div>
            <Button size="sm" className="w-full mt-2">Edit Thresholds</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Alert Trends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Today</span>
              <span className="font-semibold">0 new alerts</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-50 rounded">
              <span>This Week</span>
              <span className="font-semibold">3 alerts</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>This Month</span>
              <span className="font-semibold">12 alerts</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
