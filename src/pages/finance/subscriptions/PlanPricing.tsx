import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const pricingTiers = [
  { id: 'TIER-001', plan: 'Basic', monthlyPrice: 50000, annualPrice: 500000, discount: '17%', setupFee: 0, status: 'active' },
  { id: 'TIER-002', plan: 'Professional', monthlyPrice: 150000, annualPrice: 1500000, discount: '17%', setupFee: 100000, status: 'active' },
  { id: 'TIER-003', plan: 'Enterprise', monthlyPrice: 500000, annualPrice: 5000000, discount: '17%', setupFee: 500000, status: 'active' },
  { id: 'TIER-004', plan: 'Startup', monthlyPrice: 25000, annualPrice: 250000, discount: '17%', setupFee: 0, status: 'inactive' },
];

export default function PlanPricing() {
  return (
    <main role="main" aria-label="Pricing management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Pricing Management</h1>
        <p className="text-muted-foreground mt-1">Configure price tiers and billing options for all plans</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Pricing Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Price Tiers</p>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-green-600 mt-1">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Highest Tier</p>
            <p className="text-2xl font-bold">Rp 500K</p>
            <p className="text-xs text-muted-foreground mt-1">Enterprise/month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Annual Revenue</p>
            <p className="text-2xl font-bold">Rp 846M</p>
            <p className="text-xs text-green-600 mt-1">At full capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Annual Discount</p>
            <p className="text-2xl font-bold">17%</p>
            <p className="text-xs text-muted-foreground mt-1">Standard</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="pricing-table">Price Tier Configuration</CardTitle>
            <Button size="sm">Add New Tier</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Search pricing tiers..." />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Plan Name</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Monthly Price</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Annual Price</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Annual Discount</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Setup Fee</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((tier) => (
                  <tr key={tier.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-semibold">{tier.plan}</td>
                    <td className="py-3 px-2 text-right">Rp {(tier.monthlyPrice).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-right">Rp {(tier.annualPrice).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center">{tier.discount}</td>
                    <td className="py-3 px-2 text-right">
                      {tier.setupFee > 0 ? `Rp ${(tier.setupFee).toLocaleString('id-ID')}` : 'Free'}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge className={tier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {tier.status === 'active' ? '✓ Active' : 'Inactive'}
                      </Badge>
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
            <CardTitle className="text-base">Add New Price Tier</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Plan Name</label>
              <Input placeholder="e.g., Growth Plan" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Price (IDR)</label>
              <Input placeholder="250000" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Annual Price (IDR)</label>
              <Input placeholder="2500000" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Setup Fee (IDR)</label>
              <Input placeholder="0" type="number" />
            </div>
            <Button className="w-full">Create Tier</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pricing Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="font-semibold">Annual Incentive</p>
              <p className="text-xs text-muted-foreground mt-1">17% discount encourages yearly commitments, improving retention</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="font-semibold">Tiered Pricing</p>
              <p className="text-xs text-muted-foreground mt-1">Appeals to different customer segments from startups to enterprises</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-semibold">Setup Fees</p>
              <p className="text-xs text-muted-foreground mt-1">Professional+ tiers have setup fees to offset implementation costs</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
