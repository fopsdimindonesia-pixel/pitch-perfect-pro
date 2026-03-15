import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

const manualPayments = [
  { id: 'MAN-001', recipient: 'Persija Jakarta', amount: 25000000, reason: 'Emergency Payout', date: '2026-03-15', status: 'completed', approvedBy: 'Admin Sarah' },
  { id: 'MAN-002', recipient: 'Bali United', amount: 15000000, reason: 'Adjustment', date: '2026-03-14', status: 'completed', approvedBy: 'Admin John' },
  { id: 'MAN-003', recipient: 'East Java FA', amount: 20000000, reason: 'Correction', date: '2026-03-13', status: 'pending', approvedBy: 'Awaiting' },
];

export default function ManualPayment() {
  return (
    <main role="main" aria-label="Manual payments processing">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Manual Payments</h1>
        <p className="text-muted-foreground mt-1">Process and manage manual payment transactions</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Manual Payment Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Manual Payments</p>
            <p className="text-2xl font-bold">18</p>
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
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">Rp 310M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="manual-payments-section">Recent Manual Payments</CardTitle>
            <Button size="sm">Create Manual Payment</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">ID</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Recipient</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Reason</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {manualPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{payment.id}</td>
                    <td className="py-3 px-2 font-medium">{payment.recipient}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(payment.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-sm">{payment.reason}</td>
                    <td className="py-3 px-2 text-center text-muted-foreground">{payment.date}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        className={payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {payment.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {payment.status === 'pending' ? (
                        <Button size="sm" variant="ghost">Approve</Button>
                      ) : (
                        <Button size="sm" variant="ghost">View</Button>
                      )}
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
            <CardTitle className="text-base">Create Manual Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Recipient</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="persija">Persija Jakarta</SelectItem>
                  <SelectItem value="bali">Bali United</SelectItem>
                  <SelectItem value="eastjava">East Java FA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount (Rp)</label>
              <Input type="number" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reason</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency Payout</SelectItem>
                  <SelectItem value="adjustment">Adjustment/Correction</SelectItem>
                  <SelectItem value="special">Special Distribution</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Submit for Approval</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Approval Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium">Pending Approval</p>
              <p className="text-xs text-muted-foreground">1 payment (Rp 20M)</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Approved This Month</p>
              <p className="text-xs text-muted-foreground">2 payments (Rp 40M)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Approval Level</p>
              <p className="text-xs text-muted-foreground">Admin Only</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
