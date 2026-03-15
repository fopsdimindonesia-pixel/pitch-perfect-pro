import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download } from 'lucide-react';

const yearlyReports = [
  { id: 'FY-2025', year: 2025, status: 'finalized', revenue: 2100000000, profit: 1512000000, subscribers: 390, audited: true },
  { id: 'FY-2024', year: 2024, status: 'finalized', revenue: 1500000000, profit: 975000000, subscribers: 285, audited: true },
  { id: 'FY-2023', year: 2023, status: 'finalized', revenue: 980000000, profit: 539000000, subscribers: 165, audited: true },
];

export default function YearlyReport() {
  return (
    <main role="main" aria-label="Yearly financial reports">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Yearly Reports</h1>
        <p className="text-muted-foreground mt-1">Annual financial statements and performance summaries</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Yearly Report Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">FY 2025 Revenue</p>
            <p className="text-2xl font-bold">Rp 2.1B</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">FY 2025 Profit</p>
            <p className="text-2xl font-bold">Rp 1.51B</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">YoY Growth</p>
            <p className="text-2xl font-bold text-green-600">+40%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Reports Available</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="yearly-reports-table">Annual Financial Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {yearlyReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Financial Year {report.year}</p>
                      <p className="text-sm text-muted-foreground">{report.id}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">✓ {report.status}</Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="font-semibold">Rp {(report.revenue).toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Net Profit</p>
                    <p className="font-semibold">Rp {(report.profit).toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Subscribers</p>
                    <p className="font-semibold">{report.subscribers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Audit Status</p>
                    <p className="font-semibold text-green-600">{report.audited ? '✓ Audited' : 'Pending'}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Full Report (PDF)
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Summary (PDF)
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">FY 2025 Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Revenue Growth</span>
              <span className="font-semibold">+40% YoY</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Net Margin</span>
              <span className="font-semibold">72%</span>
            </div>
            <div className="flex justify-between p-2 bg-purple-50 rounded">
              <span>Subscriber Growth</span>
              <span className="font-semibold">+37% YoY</span>
            </div>
            <Button size="sm" className="w-full mt-2">View Full Analysis</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Report Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button size="sm" className="w-full" variant="outline">Download Financial Statements (XLSX)</Button>
            <Button size="sm" className="w-full" variant="outline">Download Tax Returns (PDF)</Button>
            <Button size="sm" className="w-full" variant="outline">Download Audit Report (PDF)</Button>
            <Button size="sm" className="w-full" variant="outline">Download Investor Presentation</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Multi-Year Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Fiscal Year</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Revenue</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Profit</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Margin</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {yearlyReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-semibold">FY {report.year}</td>
                    <td className="py-3 px-2 text-right">Rp {(report.revenue).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-right">Rp {(report.profit).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-right">{((report.profit/report.revenue)*100).toFixed(1)}%</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className="bg-green-100 text-green-800">Finalized</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
