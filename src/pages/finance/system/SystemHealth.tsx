import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Server, AlertCircle, CheckCircle } from 'lucide-react';

export default function SystemHealth() {
  return (
    <main role="main" aria-label="Finance system health monitoring">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">System Health</h1>
        <p className="text-muted-foreground mt-1">Monitor finance system performance and infrastructure</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">System Health Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">System Status</p>
            <p className="text-2xl font-bold text-green-600">Operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Uptime (30d)</p>
            <p className="text-2xl font-bold">99.85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Response Time</p>
            <p className="text-2xl font-bold">145ms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Incidents</p>
            <p className="text-2xl font-bold text-yellow-600">0</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <span className="font-medium">Main DB (PostgreSQL)</span>
              <Badge className="bg-green-100 text-green-800">✓ Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <span className="font-medium">Cache (Redis)</span>
              <Badge className="bg-green-100 text-green-800">✓ Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <span className="font-medium">Backup Status</span>
              <Badge className="bg-green-100 text-green-800">✓ Latest 2h ago</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              API Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Request Rate</span>
              <span className="font-semibold">1,245 req/min</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Success Rate</span>
              <span className="font-semibold">99.8%</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Error Rate</span>
              <span className="font-semibold">0.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Service Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: 'Payment Service', uptime: '99.9%', status: 'healthy' },
              { name: 'Refund Service', uptime: '99.7%', status: 'healthy' },
              { name: 'Gateway Integration', uptime: '98.5%', status: 'degraded' },
              { name: 'Notification Service', uptime: '99.8%', status: 'healthy' },
              { name: 'Reporting Engine', uptime: '99.6%', status: 'healthy' },
              { name: 'Analytics Pipeline', uptime: '99.4%', status: 'healthy' },
            ].map((service, idx) => (
              <div key={idx} className="border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm">{service.name}</p>
                  <Badge
                    className={
                      service.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {service.status === 'healthy' ? '✓' : '⚠'} {service.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uptime 30d</span>
                  <span className="font-semibold">{service.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Recent Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-muted-foreground py-4">No incidents reported in the last 30 days</p>
            <Button size="sm" variant="outline" className="w-full">View History</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Maintenance Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Next Scheduled Maintenance</p>
              <p className="text-xs text-muted-foreground">2026-03-22 02:00 UTC (1 hour)</p>
            </div>
            <Button size="sm" variant="outline" className="w-full">View Schedule</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
