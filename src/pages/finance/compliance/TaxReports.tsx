import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const taxReports = [
  { id: 'TAX-001', period: 'Q1 2026 (Jan-Mar)', status: 'completed', revenue: 655000000, expenses: 128000000, tax: 78600000, deadline: '2026-04-15', submittedDate: '2026-04-10' },
  { id: 'TAX-002', period: 'December 2025', status: 'completed', revenue: 175000000, expenses: 28000000, tax: 21000000, deadline: '2026-01-31', submittedDate: '2026-01-25' },
  { id: 'TAX-003', period: 'November 2025', status: 'completed', revenue: 165000000, expenses: 26000000, tax: 19800000, deadline: '2025-12-31', submittedDate: '2025-12-26' },
  { id: 'TAX-004', period: 'October 2025', status: 'completed', revenue: 145000000, expenses: 24000000, tax: 17400000, deadline: '2025-11-30', submittedDate: '2025-11-24' },
];

export default function TaxReports() {
  return (
    <main role="main" aria-label="Tax compliance reports">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Tax Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and manage tax compliance reports</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Tax Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">YTD Tax Amount</p>
            <p className="text-2xl font-bold">Rp 136.8M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Effective Tax Rate</p>
            <p className="text-2xl font-bold">12%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Reports Submitted</p>
            <p className="text-2xl font-bold text-green-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Compliance Status</p>
            <p className="text-2xl font-bold text-green-600">100%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="tax-reports-table">Tax Reports</CardTitle>
            <Button size="sm">Generate New Report</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search period or status..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Period</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Revenue</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Expenses</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Tax</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Deadline</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {taxReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{report.period}</td>
                    <td className="py-3 px-2 text-right">Rp {(report.revenue).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-right">Rp {(report.expenses).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(report.tax).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{report.deadline}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className="bg-green-100 text-green-800">✓ {report.status}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm">Download</Button>
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
            <CardTitle className="text-base">Tax Breakdown (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Q1 2026 Tax</span>
              <span className="font-semibold">Rp 78.6M</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Q4 2025 Tax</span>
              <span className="font-semibold">Rp 58.2M</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filing Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button size="sm" variant="outline" className="w-full">Next Quarterly Filing: 2026-07-15</Button>
            <Button size="sm" variant="outline" className="w-full">Annual Filing: 2027-03-31</Button>
            <Button size="sm" variant="outline" className="w-full">Schedule Audit Review</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
