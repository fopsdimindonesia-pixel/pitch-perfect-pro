import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 'CAT-001', name: 'Club Subscriptions', color: 'bg-blue-100 text-blue-800', transactions: 120, amount: 320000000 },
  { id: 'CAT-002', name: 'EO Subscriptions', color: 'bg-purple-100 text-purple-800', transactions: 95, amount: 390000000 },
  { id: 'CAT-003', name: 'Player Registration', color: 'bg-green-100 text-green-800', transactions: 280, amount: 175000000 },
  { id: 'CAT-004', name: 'Gateway Fees', color: 'bg-red-100 text-red-800', transactions: 150, amount: 25000000 },
  { id: 'CAT-005', name: 'Refunds', color: 'bg-orange-100 text-orange-800', transactions: 45, amount: 8000000 },
  { id: 'CAT-006', name: 'Other Income', color: 'bg-gray-100 text-gray-800', transactions: 20, amount: 3000000 },
];

export default function FinancialCategories() {
  return (
    <main role="main" aria-label="Financial categories management">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">Financial Categories</h1>
        <p className="text-muted-foreground mt-1">Manage transaction categories and organize financial records</p>
      </section>

      <section aria-labelledby="metrics-title" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <h2 id="metrics-title" className="sr-only">Category Metrics</h2>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Categories</p>
            <p className="text-2xl font-bold">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold">710</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">Rp 921M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Top Category</p>
            <p className="text-2xl font-bold">EO Subscriptions</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle id="categories-table">Category List</CardTitle>
            <Button size="sm">Create Category</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Search categories..." />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="text-left py-2 px-2 font-semibold">Category Name</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Transactions</th>
                  <th scope="col" className="text-right py-2 px-2 font-semibold">Total Amount</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Avg Transaction</th>
                  <th scope="col" className="text-center py-2 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const avgTransaction = category.amount / category.transactions;
                  return (
                    <tr key={category.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <Badge className={category.color}>{category.name}</Badge>
                      </td>
                      <td className="py-3 px-2 text-right">{category.transactions}</td>
                      <td className="py-3 px-2 text-right font-semibold">Rp {(category.amount).toLocaleString('id-ID')}</td>
                      <td className="py-3 px-2 text-center text-muted-foreground">Rp {(avgTransaction).toLocaleString('id-ID', { maximumFractionDigits: 0 })}</td>
                      <td className="py-3 px-2 text-center">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create New Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name</label>
              <Input placeholder="e.g., Tournament Fees" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Type</label>
              <div className="flex gap-2">
                <Button variant="outline" className="w-1/2">Income</Button>
                <Button variant="outline" className="w-1/2">Expense</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Optional category description" />
            </div>
            <Button className="w-full">Create Category</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {categories.map((category) => {
              const percentage = ((category.amount / 921000000) * 100).toFixed(1);
              return (
                <div key={category.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full" style={{ width: `${percentage}%`, backgroundColor: category.color.split(' ')[0].replace('bg-', '') }}></div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
