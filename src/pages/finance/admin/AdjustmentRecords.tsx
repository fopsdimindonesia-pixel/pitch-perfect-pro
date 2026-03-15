import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const adjustments = [
  { id: 'ADJ-001', type: 'Revenue Adjustment', amount: 5000000, reason: 'Q1 Reconciliation', date: '2026-03-10', status: 'approved', approvedBy: 'Admin Sarah' },
  { id: 'ADJ-002', type: 'Expense Correction', amount: -2000000, reason: 'Overcharge Reversal', date: '2026-03-08', status: 'approved', approvedBy: 'Admin John' },
  { id: 'ADJ-003', type: 'Fee Waiver', amount: -500000, reason: 'Goodwill Gesture', date: '2026-03-05', status: 'approved', approvedBy: 'Admin Sarah' },
  { id: 'ADJ-004', type: 'Credit Memo', amount: 1500000, reason: 'Service Recovery', date: '2026-03-01', status: 'pending', approvedBy: 'Awaiting' },
];

export default function AdjustmentRecords() {
  return (
    <main role="main" aria-label="Financial adjustment records">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Adjustment Records</h1>
        <p className="text-muted-foreground mt-1">Manage financial adjustments, reversals, and corrections</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Adjustment Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Adjustments</p>
            <p className="text-2xl font-bold">127</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Net Adjustment</p>
            <p className="text-2xl font-bold text-green-600">Rp 4M</p>
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
            <CardTitle id="adjustment-records-table">Recent Adjustments</CardTitle>
            <Button size="sm">Create Adjustment</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {adjustments.map((adj) => (
              <div key={adj.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{adj.id} - {adj.type}</p>
                    <p className="text-sm text-muted-foreground">{adj.reason}</p>
                  </div>
                  <Badge className={adj.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {adj.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-semibold">{adj.amount >= 0 ? '+' : ''}Rp {(adj.amount).toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-semibold">{adj.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Approved By</p>
                    <p className="font-semibold text-sm">{adj.approvedBy}</p>
                  </div>
                </div>

                {adj.status === 'pending' && <Button size="sm">Review & Approve</Button>}
                {adj.status === 'approved' && <Button size="sm" variant="outline">View Details</Button>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Adjustment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Revenue Adjustments</span>
              <span className="font-semibold">+Rp 6.5M</span>
            </div>
            <div className="flex justify-between p-2 bg-red-50 rounded">
              <span>Expense Corrections</span>
              <span className="font-semibold">-Rp 2.5M</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded font-semibold">
              <span>Net Impact</span>
              <span>+Rp 4M</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create New Adjustment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="Reason for adjustment..." />
            <Input type="number" placeholder="Amount (Rp)" />
            <Button className="w-full">Submit for Review</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
