import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPaymentHistory } from "@/lib/mockData";

export default function OrganizationBilling() {
  const totalBilled = mockPaymentHistory.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Billing</h1>
        <p className="text-muted-foreground mt-1">Manage billing and payments</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Current Plan</p>
          <p className="text-2xl font-bold mt-2">Pro</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Monthly Cost</p>
          <p className="text-2xl font-bold mt-2">Rp 499,000</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Billed</p>
          <p className="text-2xl font-bold mt-2">Rp {totalBilled.toLocaleString()}</p>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Plan</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Invoice</th>
                <th className="text-left p-3">Method</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-muted/30">
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3 font-medium">{payment.plan}</td>
                  <td className="p-3 font-semibold">Rp {payment.amount.toLocaleString()}</td>
                  <td className="p-3">{payment.invoiceId}</td>
                  <td className="p-3 text-xs">{payment.method}</td>
                  <td className="p-3">
                    <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
