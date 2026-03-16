import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function InvoiceGenerator() {
  return (
    <main role="main" aria-label="Invoice generation">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Invoice Generator</h1>
        <p className="text-muted-foreground mt-1">Create and manage invoices for payments and fees</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssb">SSB Garuda Muda</SelectItem>
                    <SelectItem value="persija">Persija Jakarta</SelectItem>
                    <SelectItem value="bali">Bali United</SelectItem>
                    <SelectItem value="psi">PSI Semarang</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Invoice Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="registration">Registration</SelectItem>
                      <SelectItem value="fee">Service Fee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <Select defaultValue="idr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idr">IDR</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="sgd">SGD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input placeholder="Enter amount" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Invoice description..." rows={4} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <Input type="date" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Generate Invoice</Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Invoice Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="border-b pb-3">
                <p className="font-bold">Invoice #INV-2026-001</p>
                <p className="text-xs text-muted-foreground">Generated: 2026-03-16</p>
              </div>

              <div className="space-y-1">
                <p className="font-medium">Bill To</p>
                <p className="text-xs text-muted-foreground">SSB Garuda Muda</p>
                <p className="text-xs text-muted-foreground">Football Club Indonesia</p>
              </div>

              <div className="bg-gray-50 p-3 rounded space-y-1">
                <div className="flex justify-between">
                  <span>Subscription Fee</span>
                  <span className="font-semibold">Rp 5,000,000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Tax (5%)</span>
                  <span>Rp 250,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rp 5,250,000</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Due Date: 2026-04-16</p>
                <Badge className="bg-blue-100 text-blue-800">Draft</Badge>
              </div>

              <Button className="w-full" size="sm">Export PDF</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
