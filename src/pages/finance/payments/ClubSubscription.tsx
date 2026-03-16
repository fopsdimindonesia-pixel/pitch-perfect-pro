import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const clubSubscriptions = [
  { id: 1, club: 'SSB Garuda Muda', plan: 'Premium', status: 'active', startDate: '2026-01-01', renewalDate: '2026-04-01', monthlyFee: 5000 },
  { id: 2, club: 'Persija Jakarta', plan: 'Professional', status: 'active', startDate: '2026-02-01', renewalDate: '2026-05-01', monthlyFee: 4000 },
  { id: 3, club: 'Bali United', plan: 'Premium', status: 'active', startDate: '2025-12-01', renewalDate: '2026-03-01', monthlyFee: 5000 },
  { id: 4, club: 'Arema FC', plan: 'Basic', status: 'inactive', startDate: '2025-11-01', renewalDate: '2026-02-01', monthlyFee: 2000 },
];

const revenueData = [
  { month: 'Jan', revenue: 18000 },
  { month: 'Feb', revenue: 22000 },
  { month: 'Mar', revenue: 25000 },
  { month: 'Apr', revenue: 23000 },
];

export default function ClubSubscription() {
  return (
    <main role="main" aria-label="Club subscriptions management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Club Subscriptions</h1>
        <p className="text-muted-foreground mt-1">Manage club subscription plans and billing</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Subscription Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Clubs</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Subscription Plans</p>
            <p className="text-2xl font-bold">3 Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Monthly Revenue</p>
            <p className="text-2xl font-bold text-blue-600">Rp 25M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Inactive</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="revenue-chart">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${(value as number).toLocaleString('id-ID')}`} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Monthly Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="subscriptions-table">Club Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left py-2 px-2 font-semibold">Club</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Plan</th>
                <th scope="col" className="text-right py-2 px-2 font-semibold">Monthly Fee</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Renewal Date</th>
                <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {clubSubscriptions.map((sub) => (
                <tr key={sub.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">{sub.club}</td>
                  <td className="py-3 px-2 text-center">
                    <Badge variant="outline">{sub.plan}</Badge>
                  </td>
                  <td className="py-3 px-2 text-right font-semibold">Rp {(sub.monthlyFee).toLocaleString('id-ID')}</td>
                  <td className="py-3 px-2 text-center">
                    <Badge className={sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {sub.status === 'active' ? '✓ Active' : '✗ Inactive'}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-center text-sm">{sub.renewalDate}</td>
                  <td className="py-3 px-2 text-center">
                    <Button variant="ghost" size="sm">Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}
