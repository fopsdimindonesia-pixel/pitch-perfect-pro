import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const logs = [
  { id: 'LOG-001', level: 'INFO', message: 'Payment batch processed successfully', service: 'payment.service', timestamp: '2026-03-15 14:32:45', duration: '1.2s' },
  { id: 'LOG-002', level: 'WARNING', message: 'High latency detected in refund processing', service: 'refund.service', timestamp: '2026-03-15 14:30:12', duration: '5.8s' },
  { id: 'LOG-003', level: 'ERROR', message: 'Failed connection to bank gateway (retry 2/3)', service: 'gateway.service', timestamp: '2026-03-15 14:28:33', duration: 'N/A' },
  { id: 'LOG-004', level: 'INFO', message: 'Exchange rate update completed', service: 'rate.service', timestamp: '2026-03-15 14:25:00', duration: '0.3s' },
];

export default function PaymentLogs() {
  return (
    <main role="main" aria-label="Payment system logs">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Logs</h1>
        <p className="text-muted-foreground mt-1">View detailed payment system logs and debugging information</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Log Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Logs (24h)</p>
            <p className="text-2xl font-bold">1,847</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Info Messages</p>
            <p className="text-2xl font-bold text-blue-600">1,645</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Warnings</p>
            <p className="text-2xl font-bold text-yellow-600">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Errors</p>
            <p className="text-2xl font-bold text-red-600">46</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="payment-logs-table">Recent Payment Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Search logs by message or service..." />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Timestamp</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Level</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Service</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Message</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-xs font-mono text-muted-foreground">{log.timestamp}</td>
                    <td className="py-3 px-2">
                      <Badge
                        className={
                          log.level === 'ERROR'
                            ? 'bg-red-100 text-red-800'
                            : log.level === 'WARNING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                        }
                      >
                        {log.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 font-mono text-xs">{log.service}</td>
                    <td className="py-3 px-2 text-sm max-w-md">{log.message}</td>
                    <td className="py-3 px-2 text-center text-sm">{log.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline">Clear Logs</Button>
            <Button size="sm" variant="outline">Export Logs</Button>
            <Button size="sm" variant="outline">Real-time View</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Log Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Info Logs</span>
              <span className="font-semibold">1,645 (89.2%)</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-50 rounded">
              <span>Warning Logs</span>
              <span className="font-semibold">156 (8.5%)</span>
            </div>
            <div className="flex justify-between p-2 bg-red-50 rounded">
              <span>Error Logs</span>
              <span className="font-semibold">46 (2.5%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Service Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Payment Service</p>
              <p className="text-xs text-muted-foreground">✓ Healthy (99.8% uptime)</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Refund Service</p>
              <p className="text-xs text-muted-foreground">✓ Healthy (99.5% uptime)</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <p className="font-medium">Gateway Service</p>
              <p className="text-xs text-muted-foreground">⚠ Degraded (98.2% uptime)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
