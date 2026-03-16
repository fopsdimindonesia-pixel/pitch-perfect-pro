import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Zap } from 'lucide-react';

const disbursements = [
  { id: 'DISB-001', payout: 'PAYOUT-004', organization: 'Sumatra Sports Club', amount: 40000000, bank: 'BCA', method: 'Transfer', disbursedDate: '2026-03-12', expectedDate: '2026-03-13', status: 'completed', confirmationRef: 'TRF-987654321' },
  { id: 'DISB-002', payout: 'PAYOUT-002', organization: 'East Java Football', amount: 25000000, bank: 'Mandiri', method: 'Transfer', disbursedDate: '2026-03-14', expectedDate: '2026-03-15', status: 'in-transit', confirmationRef: 'TRF-987654322' },
  { id: 'DISB-003', payout: 'PAYOUT-001', organization: 'Club Management Indonesia', amount: 50000000, bank: 'BCA', method: 'Transfer', disbursedDate: '2026-03-15', expectedDate: '2026-03-16', status: 'scheduled', confirmationRef: '-' },
];

export default function PaymentDisbursement() {
  return (
    <main role="main" aria-label="Payment disbursement tracking">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payment Disbursement</h1>
        <p className="text-muted-foreground mt-1">Track payout transfers and disbursement status</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Disbursement Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Disbursed</p>
            <p className="text-2xl font-bold">Rp 115M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">In Transit</p>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Scheduled</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="disbursement-timeline">Disbursement Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {disbursements.map((disb) => (
            <div key={disb.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{disb.organization}</p>
                  <p className="text-sm text-muted-foreground">{disb.payout}</p>
                </div>
                <Badge
                  className={
                    disb.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : disb.status === 'in-transit'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {disb.status === 'completed' && '✓ Completed'}
                  {disb.status === 'in-transit' && '→ In Transit'}
                  {disb.status === 'scheduled' && '📅 Scheduled'}
                </Badge>
              </div>

              <div className="bg-gray-50 p-3 rounded space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Amount</span>
                  <span className="font-semibold">Rp {(disb.amount).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Destination</span>
                  <span className="font-semibold">{disb.bank} {disb.method}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Disbursed</p>
                  <p className="font-medium">{disb.disbursedDate}</p>
                  <Zap className="w-3 h-3 text-yellow-600 mt-1" />
                </div>
                <div>
                  <p className="text-muted-foreground">Expected</p>
                  <p className="font-medium">{disb.expectedDate}</p>
                  <Clock className="w-3 h-3 text-blue-600 mt-1" />
                </div>
                <div>
                  <p className="text-muted-foreground">Reference</p>
                  <p className="font-mono text-xs">{disb.confirmationRef}</p>
                </div>
              </div>

              {disb.status !== 'completed' && (
                <Button size="sm" variant="outline" className="w-full">Track Transfer</Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Disbursement Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 border border-blue-200 rounded">
              <p className="font-semibold">Bank Transfer</p>
              <p className="text-xs text-muted-foreground">1-2 days processing</p>
            </div>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded">
              <p className="font-semibold">Instant Transfer</p>
              <p className="text-xs text-muted-foreground">Same day (upcoming)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Processing Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Avg Processing</span>
              <span className="font-semibold">18 hours</span>
            </div>
            <div className="flex justify-between">
              <span>This Month</span>
              <span className="font-semibold">3 disbursements</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-semibold text-green-600">100%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Transfers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium">Rp 40M</p>
              <p className="text-xs text-muted-foreground">In transit (1 day remaining)</p>
            </div>
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium">Rp 50M</p>
              <p className="text-xs text-muted-foreground">Scheduled for tomorrow</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
