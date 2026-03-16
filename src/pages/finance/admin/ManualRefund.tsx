import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const refunds = [
  { id: 'REF-ADM-001', original: 'PAY-001', amount: 500000, reason: 'User Request - Duplicate', date: '2026-03-15', status: 'processed', method: 'Bank Transfer' },
  { id: 'REF-ADM-002', original: 'PAY-002', amount: 1000000, reason: 'Service Issue', date: '2026-03-14', status: 'processed', method: 'Card Reversal' },
  { id: 'REF-ADM-003', original: 'PAY-003', amount: 750000, reason: 'Technical Problem', date: '2026-03-13', status: 'pending', method: 'E-Wallet' },
];

export default function ManualRefund() {
  return (
    <main role="main" aria-label="Manual refunds processing">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Manual Refunds</h1>
        <p className="text-muted-foreground mt-1">Process and manage manual refund transactions</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Manual Refund Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Refunds Processed</p>
            <p className="text-2xl font-bold">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Refunded</p>
            <p className="text-2xl font-bold">Rp 2.45M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Refund Time</p>
            <p className="text-2xl font-bold">2.1 days</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="manual-refunds-section">Recent Refunds</CardTitle>
            <Button size="sm">Process Refund</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Refund ID</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Original Payment</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Reason</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Method</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund) => (
                  <tr key={refund.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{refund.id}</td>
                    <td className="py-3 px-2 font-medium">{refund.original}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(refund.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-sm">{refund.reason}</td>
                    <td className="py-3 px-2 text-center text-sm">{refund.method}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className={refund.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {refund.status === 'processed' ? '✓ Done' : '⏳ Processing'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button size="sm" variant="ghost">View</Button>
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
            <CardTitle className="text-base">Refund Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Processed</p>
              <p className="text-xs text-muted-foreground">40 refunds (Rp 2.25M)</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <p className="font-medium">In Progress</p>
              <p className="text-xs text-muted-foreground">2 refunds (Rp 200K)</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Success Rate</p>
              <p className="text-xs text-muted-foreground">95.2% completion rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Common Refund Reasons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Duplicate Charge</span>
              <span className="font-semibold">28 (66.7%)</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Service Issue</span>
              <span className="font-semibold">10 (23.8%)</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>User Request</span>
              <span className="font-semibold">4 (9.5%)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
