import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const upcomingRenewals = [
  { id: 'SUB-001', subscriber: 'SSB Garuda Muda', plan: 'Professional', renewalDate: '2026-03-20', amount: 150000, status: 'confirmed' },
  { id: 'SUB-002', subscriber: 'Persija Jakarta', plan: 'Enterprise', renewalDate: '2026-03-22', amount: 500000, status: 'confirmed' },
  { id: 'SUB-003', subscriber: 'Bali United', plan: 'Basic', renewalDate: '2026-03-25', amount: 50000, status: 'pending' },
  { id: 'SUB-004', subscriber: 'Arema FC', plan: 'Professional', renewalDate: '2026-03-28', amount: 150000, status: 'confirmed' },
  { id: 'SUB-005', subscriber: 'Madura United', plan: 'Enterprise', renewalDate: '2026-04-01', amount: 500000, status: 'at-risk' },
];

export default function SubscriptionRenewals() {
  return (
    <main role="main" aria-label="Subscription renewals management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Subscription Renewals</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage upcoming subscription renewals</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Renewal Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Upcoming Renewals (30 days)</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Renewal Value</p>
            <p className="text-2xl font-bold">Rp 1.35M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Confirmed Renewals</p>
            <p className="text-2xl font-bold text-green-600">4</p>
            <p className="text-xs text-green-600 mt-1">80%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">At Risk</p>
            <p className="text-2xl font-bold text-red-600">1</p>
            <p className="text-xs text-red-600 mt-1">20%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <CardTitle id="renewals-table">Upcoming Renewals</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingRenewals.map((renewal) => (
              <div key={renewal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{renewal.subscriber}</p>
                    <p className="text-sm text-muted-foreground">{renewal.plan} Plan</p>
                  </div>
                  <Badge
                    className={
                      renewal.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : renewal.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }
                  >
                    {renewal.status === 'confirmed' && '✓ Confirmed'}
                    {renewal.status === 'pending' && '⏳ Pending'}
                    {renewal.status === 'at-risk' && '⚠ At Risk'}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Renewal Date</p>
                    <p className="font-semibold text-sm">{renewal.renewalDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-semibold text-sm">Rp {(renewal.amount).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Days Until</p>
                    <p className="font-semibold text-sm text-blue-600">4 days</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {renewal.status === 'at-risk' && (
                    <>
                      <Button size="sm" variant="outline">Contact</Button>
                      <Button size="sm" variant="outline">Offer Incentive</Button>
                    </>
                  )}
                  {renewal.status === 'pending' && (
                    <Button size="sm" variant="outline">Send Reminder</Button>
                  )}
                  <Button size="sm" variant="ghost">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Renewal by Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
              <span className="font-semibold">Confirmed Renewals</span>
              <span className="font-bold">4 (80%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded">
              <span className="font-semibold">Pending Renewals</span>
              <span className="font-bold">0 (0%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded">
              <span className="font-semibold">At Risk Renewals</span>
              <span className="font-bold">1 (20%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Renewal Value by Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span>Professional</span>
                <span className="font-semibold">Rp 300K</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '22.2%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Enterprise</span>
                <span className="font-semibold">Rp 1M</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '74.1%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Basic</span>
                <span className="font-semibold">Rp 50K</span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-gray-500" style={{ width: '3.7%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
