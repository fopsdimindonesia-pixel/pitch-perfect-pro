import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const payments = [
  { id: 'TRX-001', payer: 'SSB Garuda Muda', amount: 5000000, type: 'Subscription', date: '2026-03-15', status: 'completed' },
  { id: 'TRX-002', payer: 'Persija Jakarta', amount: 4500000, type: 'Registration', date: '2026-03-14', status: 'completed' },
  { id: 'TRX-003', payer: 'Bali United', amount: 3500000, type: 'Subscription', date: '2026-03-13', status: 'processing' },
  { id: 'TRX-004', payer: 'Arema FC', amount: 2500000, type: 'Fee', date: '2026-03-12', status: 'completed' },
  { id: 'TRX-005', payer: 'PSM Makassar', amount: 5000000, type: 'Subscription', date: '2026-03-11', status: 'failed' },
];

export default function PaymentTracking() {
  return (
    <main role="main" aria-label="Payment tracking and monitoring">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Tracking</h1>
        <p className="text-muted-foreground mt-1">Track all incoming payments and transactions</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Payment Summary</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-green-600">Rp 20.5M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Processing</p>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="transactions-table">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transaction ID or payer..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Transaction ID</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Payer</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Type</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs font-semibold">{payment.id}</td>
                    <td className="py-3 px-2">{payment.payer}</td>
                    <td className="py-3 px-2 text-sm">{payment.type}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(payment.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{payment.date}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        className={
                          payment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                        }
                      >
                        {payment.status === 'completed' && '✓ Completed'}
                        {payment.status === 'processing' && '⏳ Processing'}
                        {payment.status === 'failed' && '✗ Failed'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm">View</Button>
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
