import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle } from 'lucide-react';

const transactions = [
  { id: 'TXN-001', reference: 'PAY-12345', type: 'Payment', amount: 5000000, account: 'Bank BCA', date: '2026-03-15 14:32', status: 'completed', riskScore: '1%' },
  { id: 'TXN-002', reference: 'REF-001', type: 'Refund', amount: -500000, account: 'Card 4532', date: '2026-03-15 11:15', status: 'completed', riskScore: '2%' },
  { id: 'TXN-003', reference: 'SUB-456', type: 'Subscription', amount: 150000, account: 'E-Wallet', date: '2026-03-14 22:45', status: 'completed', riskScore: '0.5%' },
  { id: 'TXN-004', reference: 'ADJ-789', type: 'Adjustment', amount: 2000000, account: 'Internal', date: '2026-03-14 16:20', status: 'flagged', riskScore: '18%' },
];

export default function TransactionMonitoring() {
  return (
    <main role="main" aria-label="Transaction monitoring">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Transaction Monitoring</h1>
        <p className="text-muted-foreground mt-1">Monitor all financial transactions in real-time</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Transaction Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Transactions Today</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">Rp 6.65M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Flagged</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="transaction-monitor-table">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search by reference or account..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Reference</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Type</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Account</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date/Time</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Risk</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{txn.reference}</td>
                    <td className="py-3 px-2 font-medium">{txn.type}</td>
                    <td className="py-3 px-2 text-right font-semibold">
                      {txn.amount >= 0 ? '+' : ''}Rp {(txn.amount).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{txn.account}</td>
                    <td className="py-3 px-2 text-center text-xs text-muted-foreground">{txn.date}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className={parseFloat(txn.riskScore) > 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {txn.riskScore}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge className={txn.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {txn.status}
                      </Badge>
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
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Low Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-xs text-muted-foreground mt-1">Amount: Rp 5.5M</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Medium Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-2xl font-bold text-yellow-600">0</p>
            <p className="text-xs text-muted-foreground mt-1">Amount: Rp 0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              High Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-2xl font-bold text-red-600">1</p>
            <p className="text-xs text-muted-foreground mt-1">Amount: Rp 2M</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
