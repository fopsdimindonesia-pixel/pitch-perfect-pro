import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';

const regulatoryReports = [
  { id: 'REG-001', report: 'Financial Statement (OJK)', status: 'completed', submittedDate: '2026-03-31', deadline: '2026-04-15', authority: 'OJK' },
  { id: 'REG-002', report: 'Tax Compliance Report (DJP)', status: 'completed', submittedDate: '2026-03-15', deadline: '2026-03-31', authority: 'DJP' },
  { id: 'REG-003', report: 'Anti-Money Laundering (PPATK)', status: 'completed', submittedDate: '2026-02-28', deadline: '2026-03-31', authority: 'PPATK' },
  { id: 'REG-004', report: 'Data Protection (GDPR/Indonesia)', status: 'in-progress', submittedDate: '-', deadline: '2026-06-30', authority: 'GDPR/DPA' },
  { id: 'REG-005', report: 'Annual Audit Report', status: 'pending', submittedDate: '-', deadline: '2026-12-31', authority: 'BPK' },
];

export default function RegulatoryReports() {
  return (
    <main role="main" aria-label="Regulatory compliance reports">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Regulatory Reports</h1>
        <p className="text-muted-foreground mt-1">Monitor compliance with government and regulatory agencies</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Regulatory Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Compliance Score</p>
            <p className="text-2xl font-bold text-green-600">94%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="regulatory-reports-table">Regulatory Reports Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {regulatoryReports.map((report) => (
            <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{report.report}</p>
                  <p className="text-sm text-muted-foreground">Authority: {report.authority}</p>
                </div>
                <Badge
                  className={
                    report.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {report.status === 'completed' && '✓ Completed'}
                  {report.status === 'in-progress' && '⏳ In Progress'}
                  {report.status === 'pending' && '📅 Pending'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="font-medium">{report.deadline}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Submitted Date</p>
                  <p className="font-medium">{report.submittedDate}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Details</Button>
                {report.status === 'completed' && (
                  <Button size="sm" variant="ghost">Download</Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Key Regulatory Bodies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">OJK (Financial Services Authority)</p>
              <p className="text-xs text-muted-foreground">Q1 Report - Submitted</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium">DJP (Tax Authority)</p>
              <p className="text-xs text-muted-foreground">Monthly Reports - Submitted</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <p className="font-medium">PPATK (AML Authority)</p>
              <p className="text-xs text-muted-foreground">Quarterly Reports - Submitted</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium">Data Protection Report</p>
              <p className="text-xs text-muted-foreground">Due: 2026-06-30 (106 days)</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-medium">Annual Audit Report</p>
              <p className="text-xs text-muted-foreground">Due: 2026-12-31 (291 days)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
