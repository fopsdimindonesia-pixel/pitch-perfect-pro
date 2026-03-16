import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const platformFees = [
  { id: 'FEE-001', description: 'Club Subscription Commission', type: 'Percentage', rate: '5%', amount: 16000000, status: 'active' },
  { id: 'FEE-002', description: 'EO Subscription Commission', type: 'Percentage', rate: '4%', amount: 15600000, status: 'active' },
  { id: 'FEE-003', description: 'Payment Gateway Fee', type: 'Percentage', rate: '2.9%', amount: 8750000, status: 'active' },
  { id: 'FEE-004', description: 'Manual Transaction Fee', type: 'Fixed', rate: 'Rp 50K', amount: 2000000, status: 'active' },
  { id: 'FEE-005', description: 'Early Refund Fee', type: 'Percentage', rate: '10%', amount: 1650000, status: 'active' },
];

export default function PlatformFees() {
  return (
    <main role="main" aria-label="Platform fees management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Platform Fees Management</h1>
        <p className="text-muted-foreground mt-1">Configure and monitor commission structures and fee rates</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Fee Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Fee Rules</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Fee Revenue</p>
            <p className="text-2xl font-bold text-green-600">Rp 44M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Commission Rate</p>
            <p className="text-2xl font-bold">4.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">% of Revenue</p>
            <p className="text-2xl font-bold">5.0%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="fees-table">Fee Configuration</CardTitle>
            <Button size="sm">Add New Fee Rule</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Fee Name</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Type</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Rate</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Monthly Revenue</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {platformFees.map((fee) => (
                  <tr key={fee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{fee.description}</td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary">{fee.type}</Badge>
                    </td>
                    <td className="py-3 px-2 font-semibold">{fee.rate}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(fee.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add New Fee Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fee Name</label>
              <Input placeholder="e.g., Refund Processing Fee" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fee Type</label>
              <div className="flex gap-2">
                <Button variant="outline" className="w-1/2">Percentage</Button>
                <Button variant="outline" className="w-1/2">Fixed Amount</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rate / Amount</label>
              <Input placeholder="5 or 50000" />
            </div>
            <Button className="w-full">Create Fee Rule</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fee Impact Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Total Platform Revenue</span>
                <span className="font-semibold">Rp 885M</span>
              </div>
              <div className="flex justify-between">
                <span>Total Fee Revenue</span>
                <span className="font-semibold text-green-600">Rp 44M (5.0%)</span>
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-2">Revenue Impact</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>With Current Fees</span>
                  <span>Rp 44M/month</span>
                </div>
                <div className="flex justify-between">
                  <span>If Fees Removed</span>
                  <span className="text-red-600">-Rp 44M/month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
