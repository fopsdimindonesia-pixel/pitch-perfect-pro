import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const payoutRequests = [
  { id: 'PAYOUT-001', requester: 'Club Management Indonesia', amount: 50000000, bank: 'BCA', date: '2026-03-15', status: 'pending' },
  { id: 'PAYOUT-002', requester: 'East Java Football', amount: 25000000, bank: 'Mandiri', date: '2026-03-14', status: 'approved' },
  { id: 'PAYOUT-003', requester: 'Event Organizer Jakarta', amount: 75000000, bank: 'BNI', date: '2026-03-13', status: 'pending' },
  { id: 'PAYOUT-004', requester: 'Sumatra Sports Club', amount: 40000000, bank: 'BCA', date: '2026-03-12', status: 'scheduled' },
];

export default function PayoutRequests() {
  return (
    <main role="main" aria-label="Payout requests management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payout Requests</h1>
        <p className="text-muted-foreground mt-1">Submit and track payout requests for earnings withdrawals</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Payout Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Requests</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending Requests</p>
            <p className="text-2xl font-bold text-yellow-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Pending Amount</p>
            <p className="text-2xl font-bold">Rp 125M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Processing Time</p>
            <p className="text-2xl font-bold">2-3 days</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle id="payout-table">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="text-left py-2 px-2 font-semibold">ID</th>
                      <th scope="col" className="text-left py-2 px-2 font-semibold">Requester</th>
                      <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                      <th scope="col" className="text-left py-2 px-2 font-semibold">Bank</th>
                      <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                      <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 font-mono text-xs">{request.id}</td>
                        <td className="py-3 px-2">{request.requester}</td>
                        <td className="py-3 px-2 text-right font-semibold">Rp {(request.amount).toLocaleString('id-ID')}</td>
                        <td className="py-3 px-2 text-sm">{request.bank}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge
                            className={
                              request.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : request.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                            }
                          >
                            {request.status === 'pending' && '⏳ Pending'}
                            {request.status === 'approved' && '✓ Approved'}
                            {request.status === 'scheduled' && '📅 Scheduled'}
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
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">New Payout Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization</label>
                <Input placeholder="Your organization name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (IDR)</label>
                <Input placeholder="50000000" type="number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank Name</label>
                <Input placeholder="BCA / Mandiri / BNI" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Number</label>
                <Input placeholder="Account number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea placeholder="Optional notes..." rows={3} />
              </div>
              <Button className="w-full">Submit Request</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
