import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const auditLogs = [
  { id: 'AUDIT-001', user: 'Admin System', action: 'Payout Approved', target: 'PAYOUT-002', amount: 25000000, timestamp: '2026-03-14 14:32', status: 'completed', changes: 'Status changed from pending to approved' },
  { id: 'AUDIT-002', user: 'Finance Manager', action: 'Invoice Created', target: 'INV-2026-001', amount: 5000000, timestamp: '2026-03-15 09:15', status: 'completed', changes: 'New invoice generated' },
  { id: 'AUDIT-003', user: 'Admin System', action: 'Refund Processed', target: 'REF-001', amount: 500000, timestamp: '2026-03-15 10:45', status: 'completed', changes: 'Refund transferred to account' },
  { id: 'AUDIT-004', user: 'Finance Manager', action: 'Fee Updated', target: 'FEE-002', amount: 0, timestamp: '2026-03-14 16:20', status: 'completed', changes: 'Commission rate updated from 4% to 4.5%' },
  { id: 'AUDIT-005', user: 'System Bot', action: 'Subscription Renewed', target: 'SUB-001', amount: 150000, timestamp: '2026-03-13 00:01', status: 'completed', changes: 'Auto-renewal processed' },
];

export default function TransactionAudit() {
  return (
    <main role="main" aria-label="Transaction audit logs">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Transaction Audit Log</h1>
        <p className="text-muted-foreground mt-1">Complete audit trail of all financial transactions and system changes</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Audit Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Audit Records</p>
            <p className="text-2xl font-bold">4,256</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">287</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Approved by Admins</p>
            <p className="text-2xl font-bold text-green-600">285</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Compliance Status</p>
            <p className="text-2xl font-bold text-green-600">100%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="audit-log-table">Audit Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search by user, action, or target..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="approval">Approvals</SelectItem>
                <SelectItem value="changes">Changes</SelectItem>
                <SelectItem value="refunds">Refunds</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">User</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Action</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Target</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Timestamp</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">View</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">{log.user}</td>
                    <td className="py-3 px-2 font-medium text-sm">{log.action}</td>
                    <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{log.target}</td>
                    <td className="py-3 px-2 text-right text-sm">
                      {log.amount > 0 ? `Rp ${(log.amount).toLocaleString('id-ID')}` : '-'}
                    </td>
                    <td className="py-3 px-2 text-center text-xs text-muted-foreground">{log.timestamp}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className="bg-green-100 text-green-800">✓ {log.status}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Actions by Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Approvals</span>
              <span className="font-semibold">285 (99.3%)</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Payments</span>
              <span className="font-semibold">2 (0.7%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Retention Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Audit Logs</p>
              <p className="text-xs text-muted-foreground">Retained for 7 years</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Access Logs</p>
              <p className="text-xs text-muted-foreground">Retained for 5 years</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
