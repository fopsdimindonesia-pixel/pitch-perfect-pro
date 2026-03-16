import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const refunds = [
  { id: 'REF-001', transaction: 'TRX-045', amount: 500000, reason: 'Duplicate Payment', status: 'approved', date: '2026-03-15' },
  { id: 'REF-002', transaction: 'TRX-042', amount: 1000000, reason: 'Service Issue', status: 'pending', date: '2026-03-14' },
  { id: 'REF-003', transaction: 'TRX-038', amount: 750000, reason: 'Wrong Amount', status: 'approved', date: '2026-03-13' },
  { id: 'REF-004', transaction: 'TRX-035', amount: 300000, reason: 'Cancelled Subscription', status: 'rejected', date: '2026-03-12' },
];

export default function RefundManagement() {
  return (
    <main role="main" aria-label="Refund management and processing">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Refund Management</h1>
        <p className="text-muted-foreground mt-1">Process and track refund requests</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Refund Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Requests</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold text-green-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Refunded</p>
            <p className="text-2xl font-bold">Rp 2.25M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="refunds-table">Refund Requests</CardTitle>
            <Button size="sm">New Refund Request</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search refund ID or transaction..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Refund ID</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Transaction</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Reason</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund) => (
                  <tr key={refund.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs font-semibold">{refund.id}</td>
                    <td className="py-3 px-2 font-mono text-xs">{refund.transaction}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(refund.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-sm">{refund.reason}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        className={
                          refund.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : refund.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }
                      >
                        {refund.status === 'approved' && '✓ Approved'}
                        {refund.status === 'pending' && '⏳ Pending'}
                        {refund.status === 'rejected' && '✗ Rejected'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{refund.date}</td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm">
                        {refund.status === 'pending' ? 'Review' : 'View'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
