import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const eoSubscriptions = [
  { id: 1, eoName: 'Indonesia Football Association', plan: 'Enterprise', billingCycle: 'Annual', status: 'paid', amount: 500000 },
  { id: 2, eoName: 'Asian Football Federation', plan: 'Professional', billingCycle: 'Monthly', status: 'paid', amount: 50000 },
  { id: 3, eoName: 'Regional Sports Council', plan: 'Basic', billingCycle: 'Monthly', status: 'pending', amount: 20000 },
  { id: 4, eoName: 'District Tournament Board', plan: 'Professional', billingCycle: 'Annual', status: 'paid', amount: 300000 },
  { id: 5, eoName: 'Youth Championship Org', plan: 'Basic', billingCycle: 'Monthly', status: 'failed', amount: 20000 },
];

export default function EOSubscription() {
  return (
    <main role="main" aria-label="Event organizer subscriptions management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">EO (Event Organizer) Subscriptions</h1>
        <p className="text-muted-foreground mt-1">Manage event organizer subscription plans</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Subscription Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total EOs</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Subscriptions</p>
            <p className="text-2xl font-bold text-green-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending Payments</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Annual Recurring</p>
            <p className="text-2xl font-bold">Rp 800M</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="eo-subscriptions">All EO Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search EO name..." className="pl-8" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">EO Name</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Plan</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Billing Cycle</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {eoSubscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{sub.eoName}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="outline">{sub.plan}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center text-sm">{sub.billingCycle}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(sub.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        className={
                          sub.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : sub.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }
                      >
                        {sub.status === 'paid' ? '✓ Paid' : sub.status === 'pending' ? '⏳ Pending' : '✗ Failed'}
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
