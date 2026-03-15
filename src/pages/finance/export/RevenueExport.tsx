import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const revenueBreakdown = [
  { source: 'Club Subscriptions', amount: 305000000, date: '2026-03-15', format: 'CSV/PDF/Excel' },
  { source: 'EO Subscriptions', amount: 390000000, date: '2026-03-15', format: 'CSV/PDF/Excel' },
  { source: 'Player Registrations', amount: 190000000, date: '2026-03-15', format: 'CSV/PDF/Excel' },
];

export default function RevenueExport() {
  return (
    <main role="main" aria-label="Revenue export">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Revenue Export</h1>
        <p className="text-muted-foreground mt-1">Export revenue reports and stream analysis data</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Revenue Export Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">Rp 885M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">Rp 245M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Growth Rate</p>
            <p className="text-2xl font-bold text-green-600">+24.3%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Top Stream</p>
            <p className="text-2xl font-bold">EO Subs</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="revenue-export-table">Revenue Stream Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Streams</SelectItem>
                <SelectItem value="clubs">Club Subscriptions</SelectItem>
                <SelectItem value="eos">EO Subscriptions</SelectItem>
                <SelectItem value="players">Player Registrations</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="ytd">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {revenueBreakdown.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{item.source}</p>
                    <p className="text-sm text-muted-foreground">Amount: Rp {(item.amount).toLocaleString('id-ID')}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{((item.amount/885000000)*100).toFixed(1)}%</Badge>
                </div>

                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Last Updated: {item.date}</span>
                  <span className="text-muted-foreground">Formats: {item.format}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Export CSV</Button>
                  <Button size="sm" variant="outline">Export PDF</Button>
                  <Button size="sm" variant="outline">Export Excel</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quarterly Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Q1 2026</p>
              <p className="text-xs text-muted-foreground">Rp 655M (Jan-Mar)</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-medium">Q4 2025</p>
              <p className="text-xs text-muted-foreground">Rp 485M (Oct-Dec)</p>
            </div>
            <Button size="sm" className="w-full mt-2">Export Quarterly</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Annual Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">2026 YTD</p>
              <p className="text-xs text-muted-foreground">Rp 885M (3 months)</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">2025 Total</p>
              <p className="text-xs text-muted-foreground">Rp 2.1B (Full year)</p>
            </div>
            <Button size="sm" className="w-full mt-2">Export Annual</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button size="sm" className="w-full" variant="outline">Export Trend Analysis</Button>
            <Button size="sm" className="w-full" variant="outline">Export Growth Report</Button>
            <Button size="sm" className="w-full" variant="outline">Export Forecast</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
