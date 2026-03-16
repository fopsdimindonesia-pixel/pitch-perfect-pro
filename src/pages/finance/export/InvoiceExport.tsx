import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, FileJson, FileCode } from 'lucide-react';

const invoices = [
  { id: 'INV-2026-001', organization: 'Persija Jakarta', date: '2026-03-10', amount: 5000000, status: 'completed', format: 'PDF' },
  { id: 'INV-2026-002', organization: 'Bali United', date: '2026-03-12', amount: 3500000, status: 'completed', format: 'PDF' },
  { id: 'INV-2026-003', organization: 'East Java FA', date: '2026-03-15', amount: 4200000, status: 'completed', format: 'PDF' },
];

export default function InvoiceExport() {
  return (
    <main role="main" aria-label="Invoice export">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Invoice Export</h1>
        <p className="text-muted-foreground mt-1">Export and manage invoice records in multiple formats</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Invoice Export Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Invoices</p>
            <p className="text-2xl font-bold">247</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">18</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">Rp 885M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Invoice Value</p>
            <p className="text-2xl font-bold">Rp 3.58M</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle id="invoice-export-table">Invoice Export Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search invoices..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Format</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="xlsx">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.organization} - {invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold">Rp {(invoice.amount).toLocaleString('id-ID')}</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">{invoice.status}</Badge>
                  </div>
                  <Button size="sm">Export</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Export as PDF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Standard invoice format with branding</p>
            <Button size="sm" className="w-full">Export All as PDF</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileJson className="w-5 h-5" />
              Export as Excel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Spreadsheet format for accounting</p>
            <Button size="sm" className="w-full">Export All as XLSX</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileCode className="w-5 h-5" />
              Export as CSV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Comma-separated values format</p>
            <Button size="sm" className="w-full">Export All as CSV</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
