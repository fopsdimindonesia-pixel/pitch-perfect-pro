import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Calendar } from 'lucide-react';

const payments = [
  { id: 'PAY-001', type: 'Club Subscription', date: '2026-03-10', amount: 2500000, method: 'Bank Transfer', status: 'completed' },
  { id: 'PAY-002', type: 'EO Subscription', date: '2026-03-11', amount: 1800000, method: 'Credit Card', status: 'completed' },
  { id: 'PAY-003', type: 'Player Registration', date: '2026-03-12', amount: 500000, method: 'E-Wallet', status: 'completed' },
];

export default function PaymentExport() {
  return (
    <main role="main" aria-label="Payment export">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Export</h1>
        <p className="text-muted-foreground mt-1">Export payment transaction records and reconciliation data</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Payment Export Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold">683</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">Rp 920M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Reconciled</p>
            <p className="text-2xl font-bold text-green-600">99.7%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="payment-export-section">Payment Transaction Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input type="date" placeholder="From date" />
            <Input type="date" placeholder="To date" />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cc">Credit Card</SelectItem>
                <SelectItem value="wallet">E-Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Transaction ID</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Type</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Date</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Method</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Export</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{payment.id}</td>
                    <td className="py-3 px-2">{payment.type}</td>
                    <td className="py-3 px-2 text-muted-foreground">{payment.date}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(payment.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="outline">{payment.method}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bank Reconciliation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-2 bg-green-50 rounded">
              <p className="text-sm font-medium">Reconciled</p>
              <p className="text-xs text-muted-foreground">681 transactions</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <p className="text-sm font-medium">Pending</p>
              <p className="text-xs text-muted-foreground">2 transactions</p>
            </div>
            <Button size="sm" className="w-full mt-2">Export Reconciliation</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Method Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Bank Transfer</span>
              <span className="font-semibold">450M (49%)</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Credit Card</span>
              <span className="font-semibold">350M (38%)</span>
            </div>
            <div className="flex justify-between p-2 bg-purple-50 rounded">
              <span>E-Wallet</span>
              <span className="font-semibold">120M (13%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button size="sm" className="w-full" variant="outline">Export as CSV</Button>
            <Button size="sm" className="w-full" variant="outline">Export as Excel</Button>
            <Button size="sm" className="w-full" variant="outline">Export for Bank</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
