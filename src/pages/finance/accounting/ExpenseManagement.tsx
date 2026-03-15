import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const expenses = [
  { id: 'EXP-001', category: 'Infrastructure', description: 'Cloud Server Hosting', amount: 15000000, date: '2026-03-15', status: 'approved' },
  { id: 'EXP-002', category: 'Operations', description: 'Software Licenses', amount: 8500000, date: '2026-03-14', status: 'approved' },
  { id: 'EXP-003', category: 'Marketing', description: 'Social Media Campaign', amount: 12000000, date: '2026-03-13', status: 'pending' },
  { id: 'EXP-004', category: 'Support', description: 'Customer Support Team', amount: 6000000, date: '2026-03-12', status: 'approved' },
];

export default function ExpenseManagement() {
  return (
    <main role="main" aria-label="Expense management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Expense Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage operational expenses</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Expense Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">Rp 128M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">Rp 31M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Highest Category</p>
            <p className="text-2xl font-bold">Infrastructure</p>
            <p className="text-xs text-muted-foreground mt-1">Rp 45M (35%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="expenses-table">Expense Records</CardTitle>
            <Button size="sm">New Expense</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search expense..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">ID</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Category</th>
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Description</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Amount</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Date</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Status</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs font-semibold">{expense.id}</td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary">{expense.category}</Badge>
                    </td>
                    <td className="py-3 px-2">{expense.description}</td>
                    <td className="py-3 px-2 text-right font-semibold">Rp {(expense.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center text-sm text-muted-foreground">{expense.date}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        className={
                          expense.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {expense.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button variant="ghost" size="sm">
                        {expense.status === 'pending' ? 'Approve' : 'View'}
                      </Button>
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
