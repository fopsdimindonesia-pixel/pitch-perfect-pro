import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const complianceItems = [
  { id: 'COMP-001', requirement: 'KYC Verification', status: 'completed', dueDate: '2026-03-31', checkedDate: '2026-03-10', evidence: 'KYC doc verified' },
  { id: 'COMP-002', requirement: 'PCI DSS Compliance', status: 'completed', dueDate: '2026-06-30', checkedDate: '2026-02-15', evidence: 'Annual audit passed' },
  { id: 'COMP-003', requirement: 'AML Screening', status: 'completed', dueDate: '2026-04-30', checkedDate: '2026-03-05', evidence: 'Monthly screening done' },
  { id: 'COMP-004', requirement: 'Transaction Reporting', status: 'in-progress', dueDate: '2026-04-15', checkedDate: '-', evidence: 'Monthly report in progress' },
  { id: 'COMP-005', requirement: 'Data Residency Check', status: 'completed', dueDate: '2026-12-31', checkedDate: '2026-03-01', evidence: 'Verified in Indonesia' },
];

export default function FinancialCompliance() {
  return (
    <main role="main" aria-label="Financial compliance monitoring">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Financial Compliance</h1>
        <p className="text-muted-foreground mt-1">Monitor compliance requirements and regulatory obligations</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Compliance Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Requirements</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">4</p>
            <p className="text-xs text-green-600 mt-1">80%</p>
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
            <p className="text-2xl font-bold text-green-600">96%</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="compliance-checklist">Compliance Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {complianceItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{item.requirement}</p>
                    <p className="text-sm text-muted-foreground">{item.id}</p>
                  </div>
                </div>
                <Badge className={item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                  {item.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p className="font-medium">{item.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Checked Date</p>
                  <p className="font-medium">{item.checkedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Evidence</p>
                  <p className="font-medium">{item.evidence}</p>
                </div>
              </div>

              <Button size="sm" variant="outline">View Details</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="font-semibold text-green-900">Fully Compliant</p>
              <p className="text-xs text-green-700 mt-1">4/5 requirements completed</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="font-semibold text-blue-900">On Track</p>
              <p className="text-xs text-blue-700 mt-1">All deadlines being met</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Next Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">Complete Transaction Reporting</Button>
            <Button variant="outline" size="sm" className="w-full">Schedule Q2 Audit</Button>
            <Button variant="outline" size="sm" className="w-full">Download Compliance Report</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
