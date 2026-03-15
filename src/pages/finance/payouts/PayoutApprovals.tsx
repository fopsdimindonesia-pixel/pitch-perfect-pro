import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const approvals = [
  { id: 'PAYOUT-002', organization: 'East Java Football', amount: 25000000, requestDate: '2026-03-14', status: 'approved', approver: 'Admin System', approvalDate: '2026-03-14' },
  { id: 'PAYOUT-001', organization: 'Club Management Indonesia', amount: 50000000, requestDate: '2026-03-15', status: 'pending-review', approver: 'Awaiting Admin', approvalDate: '-' },
  { id: 'PAYOUT-003', organization: 'Event Organizer Jakarta', amount: 75000000, requestDate: '2026-03-13', status: 'pending-review', approver: 'Awaiting Admin', approvalDate: '-' },
];

export default function PayoutApprovals() {
  return (
    <main role="main" aria-label="Payout approvals management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Payout Approvals</h1>
        <p className="text-muted-foreground mt-1">Review and approve payout requests</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Approval Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600">2</p>
            <p className="text-xs text-yellow-600 mt-1">Rp 125M total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Approved Today</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Review Time</p>
            <p className="text-2xl font-bold">4 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Approval Rate</p>
            <p className="text-2xl font-bold text-green-600">98%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="approval-workflow">Approval Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {approvals.map((approval) => (
            <div key={approval.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{approval.organization}</p>
                  <p className="text-sm text-muted-foreground font-mono">{approval.id}</p>
                </div>
                <Badge
                  className={
                    approval.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {approval.status === 'approved' && '✓ Approved'}
                  {approval.status === 'pending-review' && '⏳ Pending Review'}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span>Request Amount:</span>
                <span className="font-semibold">Rp {(approval.amount).toLocaleString('id-ID')}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Request Date</p>
                  <p className="font-medium">{approval.requestDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Approval Date</p>
                  <p className="font-medium">{approval.approvalDate}</p>
                </div>
              </div>

              {approval.status === 'pending-review' && (
                <div className="flex gap-2 pt-3 border-t">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                  <Button size="sm" variant="outline">Request More Info</Button>
                  <Button size="sm" variant="destructive">Decline</Button>
                </div>
              )}

              {approval.status === 'approved' && (
                <div className="flex items-center gap-2 text-green-600 text-sm pt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Approved by {approval.approver}</span>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Requires Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium">High Value Payout</p>
              <p className="text-xs text-muted-foreground">Rp 75M from Event Organizer Jakarta - pending 2 days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Approval Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Under Rp 50M</p>
              <p className="text-muted-foreground">Auto-approved (30 min)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Rp 50M - Rp 200M</p>
              <p className="text-muted-foreground">Manual review (2-4 hrs)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Over Rp 200M</p>
              <p className="text-muted-foreground">Senior approval (1 day)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">PAYOUT-002 approved</p>
                <p className="text-xs text-muted-foreground">Today 2:15 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
