import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const currencies = [
  { id: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', status: 'active', rate: 1, decimals: 0 },
  { id: 'USD', name: 'US Dollar', symbol: '$', status: 'active', rate: 0.0000636, decimals: 2 },
  { id: 'SGD', name: 'Singapore Dollar', symbol: 'S$', status: 'active', rate: 0.0000845, decimals: 2 },
];

export default function CurrencySettings() {
  return (
    <main role="main" aria-label="Currency settings">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Currency Settings</h1>
        <p className="text-muted-foreground mt-1">Manage supported currencies and decimal places</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Currency Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Primary Currency</p>
            <p className="text-2xl font-bold">IDR</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Supported Currencies</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Conv. Rate (USD/IDR)</p>
            <p className="text-2xl font-bold">15,723</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-2xl font-bold text-sm">2026-03-15</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="currency-settings-table">Active Currencies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currencies.map((curr) => (
            <div key={curr.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">{curr.name}</p>
                  <p className="text-sm text-muted-foreground">{curr.id}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Symbol</p>
                  <p className="font-semibold">{curr.symbol}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Exchange Rate</p>
                  <p className="font-semibold">{curr.rate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Decimals</p>
                  <p className="font-semibold">{curr.decimals}</p>
                </div>
              </div>

              <Button size="sm" variant="outline">Edit Settings</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Formatting Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Default Currency Format</label>
              <Select defaultValue="idr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idr">Rp 1,000,000.00</SelectItem>
                  <SelectItem value="usd">$1,000,000.00</SelectItem>
                  <SelectItem value="eur">€1,000,000.00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Thousand Separator</label>
              <Select defaultValue="comma">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comma">Comma (1,000)</SelectItem>
                  <SelectItem value="period">Period (1.000)</SelectItem>
                  <SelectItem value="space">Space (1 000)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">Save Formatting</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exchange Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">USD/IDR</p>
              <p className="text-xs text-muted-foreground">Rate: 15,723 (Updated 2h ago)</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">SGD/IDR</p>
              <p className="text-xs text-muted-foreground">Rate: 11,847 (Updated 2h ago)</p>
            </div>
            <Button size="sm" className="w-full mt-2">Update Rates Now</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
