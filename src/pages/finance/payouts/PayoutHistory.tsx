import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const payoutHistory = [
  { id: 'PAYOUT-001', organization: 'Club Management Indonesia', amount: 50000000, month: '2026-03-01', method: 'Bank Transfer', status: 'completed', date: '2026-03-14' },
  { id: 'PAYOUT-ARCHIVE-001', organization: 'East Java Football', amount: 25000000, month: '2026-02-01', method: 'Bank Transfer', status: 'completed', date: '2026-02-28' },
  { id: 'PAYOUT-ARCHIVE-002', organization: 'Persija Jakarta', amount: 75000000, month: '2026-02-01', method: 'Bank Transfer', status: 'completed', date: '2026-02-27' },
  { id: 'PAYOUT-ARCHIVE-003', organization: 'Bali United', amount: 30000000, month: '2026-01-01', method: 'Bank Transfer', status: 'completed', date: '2026-01-31' },
  { id: 'PAYOUT-ARCHIVE-004', organization: 'Arema FC', amount: 40000000, month: '2026-01-01', method: 'Bank Transfer', status: 'completed', date: '2026-01-30' },
];

export default function PayoutHistory() {
  return (
    <main role="main" aria-label="Payout history records">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payout History</h1>
        <p className="text-muted-foreground mt-1">Historical records of all payout transactions</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">History Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Payouts</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Amount Paid</p>
            <p className="text-2xl font-bold">Rp 220M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Payout</p>
            <p className="text-2xl font-bold">Rp 44M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Completion Rate</p>
            <p className="text-2xl font-bold text-green-600">100%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="history-table">Payout Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search payout ID or organization..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="march">This Month</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="january">January</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Payout ID</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Organization</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Method</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((payout) => (
                  <tr key={payout.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs font-semibold">{payout.id}</td>
                    <td className="py-3 px-2">{payout.organization}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(payout.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-sm">{payout.method}</td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{payout.date}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className="bg-green-100 text-green-800">✓ Completed</Badge>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span>March 2026</span>
              <span className="font-semibold">Rp 50M</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span>February 2026</span>
              <span className="font-semibold">Rp 100M</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span>January 2026</span>
              <span className="font-semibold">Rp 70M</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Recipients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Persija Jakarta</span>
              <span className="font-semibold">Rp 75M</span>
            </div>
            <div className="flex justify-between">
              <span>Club Management IN</span>
              <span className="font-semibold">Rp 50M</span>
            </div>
            <div className="flex justify-between">
              <span>East Java Football</span>
              <span className="font-semibold">Rp 25M</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Export & Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">Download CSV</Button>
            <Button variant="outline" size="sm" className="w-full">Export PDF</Button>
            <Button variant="outline" size="sm" className="w-full">Tax Report</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
