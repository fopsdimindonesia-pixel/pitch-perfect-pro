import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const registrationPayments = [
  { id: 1, competition: 'Premier League 2026', club: 'SSB Garuda Muda', amount: 50000, method: 'Bank Transfer', status: 'paid', date: '2026-03-15' },
  { id: 2, competition: 'Cup Tournament', club: 'Persija Jakarta', amount: 45000, method: 'Credit Card', status: 'paid', date: '2026-03-14' },
  { id: 3, competition: 'Regional League', club: 'Bali United', amount: 35000, method: 'E-Wallet', status: 'pending', date: '2026-03-13' },
  { id: 4, competition: 'Youth Championship', club: 'Arema FC', amount: 25000, method: 'Bank Transfer', status: 'failed', date: '2026-03-12' },
  { id: 5, competition: 'Premier League 2026', club: 'PSM Makassar', amount: 50000, method: 'Credit Card', status: 'paid', date: '2026-03-11' },
  { id: 6, competition: 'Cup Tournament', club: 'Madura United', amount: 45000, method: 'Bank Transfer', status: 'paid', date: '2026-03-10' },
];

const statusConfig = {
  paid: { color: 'bg-green-100 text-green-800', icon: '✓ Paid' },
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: '⏳ Pending' },
  failed: { color: 'bg-red-100 text-red-800', icon: '✗ Failed' },
};

export default function CompetitionRegistrationPayment() {
  return (
    <main role="main" aria-label="Competition registration payments management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Competition Registration Payments</h1>
        <p className="text-muted-foreground mt-1">Manage club registration payments for competitions</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Payment Summary</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Registrations</p>
            <p className="text-2xl font-bold">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold text-green-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Failed</p>
            <p className="text-2xl font-bold text-red-600">1</p>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="payments-title">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle id="payments-title">Registration Payments</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search competition, club..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Competition</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Club</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Method</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {registrationPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{payment.competition}</td>
                    <td className="py-3 px-2">{payment.club}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(payment.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{payment.method}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge className={statusConfig[payment.status as keyof typeof statusConfig].color}>
                        {statusConfig[payment.status as keyof typeof statusConfig].icon}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{payment.date}</td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        </Card>
      </section>
    </main>
  );
}
