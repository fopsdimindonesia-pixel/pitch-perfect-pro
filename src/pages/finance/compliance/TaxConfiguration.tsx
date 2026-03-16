import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const taxConfigurations = [
  { id: 'TAX-CONFIG-001', name: 'Indonesia Corporate Tax (PPh)', rate: '12%', type: 'Primary', status: 'active', applicableTo: 'All Revenue' },
  { id: 'TAX-CONFIG-002', name: 'Value Added Tax (PPN)', rate: '10%', type: 'Secondary', status: 'active', applicableTo: 'Digital Services' },
  { id: 'TAX-CONFIG-003', name: 'Dividend Tax', rate: '15%', type: 'Deduction', status: 'active', applicableTo: 'Profit Distribution' },
  { id: 'TAX-CONFIG-004', name: 'Withholding Tax', rate: '1.5%', type: 'Payment', status: 'active', applicableTo: 'Freelancer Payments' },
];

export default function TaxConfiguration() {
  return (
    <main role="main" aria-label="Tax configuration settings">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Tax Configuration</h1>
        <p className="text-muted-foreground mt-1">Configure tax rates and calculation rules</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Tax Configuration Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Tax Rules</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Tax Rate</p>
            <p className="text-2xl font-bold">12%</p>
            <p className="text-xs text-muted-foreground mt-1">Primary rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-2xl font-bold">2026-01-01</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Jurisdiction</p>
            <p className="text-2xl font-bold">Indonesia</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="tax-config-table">Tax Rules Configuration</CardTitle>
            <Button size="sm">Add Tax Rule</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search tax rules..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rules</SelectItem>
                <SelectItem value="primary">Primary Taxes</SelectItem>
                <SelectItem value="deductions">Deductions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {taxConfigurations.map((tax) => (
              <div key={tax.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{tax.name}</p>
                    <p className="text-sm text-muted-foreground">{tax.id}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Rate</p>
                    <p className="font-semibold">{tax.rate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-semibold">{tax.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Applicable To</p>
                    <p className="font-semibold">{tax.applicableTo}</p>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tax Calculation Example</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Gross Revenue</span>
              <span className="font-semibold">Rp 1,000,000</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Corporate Tax (12%)</span>
              <span className="font-semibold">-Rp 120,000</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 border border-green-200 rounded">
              <span>Net Amount</span>
              <span className="font-semibold">Rp 880,000</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tax Exemptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Startup Relief</p>
              <p className="text-xs text-muted-foreground">50% tax reduction for first 2 years</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Reinvestment Credit</p>
              <p className="text-xs text-muted-foreground">Credit for amounts reinvested in platform</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
