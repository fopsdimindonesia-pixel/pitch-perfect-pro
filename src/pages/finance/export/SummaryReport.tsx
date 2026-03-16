import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, TrendingUp } from 'lucide-react';

const summaryReports = [
  { id: 'RPT-001', name: 'Monthly Financial Summary - March 2026', date: 'Generated: 2026-03-31', pages: 12, format: 'PDF' },
  { id: 'RPT-002', name: 'Q1 2026 Performance Report', date: 'Generated: 2026-03-31', pages: 24, format: 'PDF/Excel' },
  { id: 'RPT-003', name: 'Executive Dashboard - FY2025', date: 'Generated: 2025-12-31', pages: 8, format: 'PDF' },
];

export default function SummaryReport() {
  return (
    <main role="main" aria-label="Summary reports">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Summary Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and download comprehensive financial summary reports</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Summary Report Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Reports Generated</p>
            <p className="text-2xl font-bold">47</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Quarter</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Downloads</p>
            <p className="text-2xl font-bold">342</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Last Generated</p>
            <p className="text-2xl font-bold text-sm">2026-03-31</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="summary-reports-table">Available Reports</CardTitle>
            <Button size="sm">Generate New Report</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {summaryReports.map((report) => (
            <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">{report.pages} pages</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Format: {report.format}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Preview</Button>
                  <Button size="sm">Download</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generate New Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="quarterly">Quarterly Summary</SelectItem>
                  <SelectItem value="annual">Annual Summary</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="lastmonth">Last Month</SelectItem>
                  <SelectItem value="thisquarter">This Quarter</SelectItem>
                  <SelectItem value="thisyear">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Report Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">Revenue Trend</p>
              <p className="text-xs text-muted-foreground">+24.3% YoY Growth</p>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Subscriber Growth</p>
              <p className="text-xs text-muted-foreground">+25% quarterly increase</p>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <p className="font-medium">Profitability</p>
              <p className="text-xs text-muted-foreground">72.4% net margin</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
