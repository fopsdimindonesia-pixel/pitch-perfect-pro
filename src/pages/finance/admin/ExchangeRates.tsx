import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp } from 'lucide-react';

const exchangeRates = [
  { id: 'RATE-001', pair: 'USD/IDR', currentRate: 15723, previousRate: 15680, change: '+0.27%', timestamp: '2026-03-15 14:30', status: 'updated' },
  { id: 'RATE-002', pair: 'SGD/IDR', currentRate: 11847, previousRate: 11812, change: '+0.30%', timestamp: '2026-03-15 14:00', status: 'updated' },
  { id: 'RATE-003', pair: 'EUR/IDR', currentRate: 17145, previousRate: 17089, change: '+0.33%', timestamp: '2026-03-15 13:30', status: 'updated' },
];

export default function ExchangeRates() {
  return (
    <main role="main" aria-label="Exchange rates management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Exchange Rates</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage currency exchange rates</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Exchange Rate Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Rates Tracked</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Last Update</p>
            <p className="text-2xl font-bold text-sm">14:30</p>
            <p className="text-xs text-green-600 mt-1">2 min ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg. Volatility</p>
            <p className="text-2xl font-bold">0.31%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Auto-Update</p>
            <p className="text-2xl font-bold text-green-600">Enabled</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="exchange-rates-table">Current Exchange Rates</CardTitle>
            <Button size="sm">Manual Update</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {exchangeRates.map((rate) => (
            <div key={rate.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-5 h-5 ${rate.change.includes('+') ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <p className="font-semibold">{rate.pair}</p>
                    <p className="text-sm text-muted-foreground">{rate.timestamp}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">✓ Updated</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Current Rate</p>
                  <p className="font-semibold text-lg">{rate.currentRate.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Previous Rate</p>
                  <p className="font-semibold">{rate.previousRate.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Change</p>
                  <p className={`font-semibold ${rate.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>{rate.change}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">Override Rate</Button>
                <Button size="sm" variant="outline">History</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rate Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Auto-Update Frequency</label>
              <Select defaultValue="30min">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="30min">Every 30 minutes</SelectItem>
                  <SelectItem value="hourly">Every hour</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rate Source</label>
              <Select defaultValue="api">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api">External API (Real-time)</SelectItem>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                  <SelectItem value="hybrid">Both Sources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">Save Configuration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rate Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Volatility Alert</p>
              <p className="text-xs text-muted-foreground">Trigger if change &gt; 1%</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Status</p>
              <p className="text-xs text-muted-foreground">✓ All rates within normal range</p>
            </div>
            <Button size="sm" className="w-full mt-2">View Alert Settings</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
