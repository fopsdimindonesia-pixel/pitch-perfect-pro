import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar } from "lucide-react";

const mockPayments = [
  { id: 1, club: "SSB Garuda Muda", amount: 5000000, status: "Paid", method: "Bank Transfer", date: "2024-03-15" },
  { id: 2, club: "FC Makassar", amount: 3500000, status: "Paid", method: "Credit Card", date: "2024-03-18" },
  { id: 3, club: "Youth Academy", amount: 4200000, status: "Pending", method: "", date: "" },
  { id: 4, club: "Training Center", amount: 4200000, status: "Overdue", method: "", date: "" },
];

export default function RegistrationPayment() {
  return (
    <div className="space-y-6" role="main" aria-label="Registration payment">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Registration Payment</h1>
        <p className="text-muted-foreground mt-1">Track registration fee payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Total Collected</p>
          <p className="text-2xl font-bold text-green-600 mt-2">Rp 12.7M</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">Rp 8.4M</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Overdue</p>
          <p className="text-2xl font-bold text-red-600 mt-2">Rp 4.2M</p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Club</th>
                <th className="px-6 py-3 text-right font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Payment Method</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{payment.club}</td>
                  <td className="px-6 py-4 text-right font-mono">Rp {(payment.amount / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4 text-muted-foreground">{payment.method || "-"}</td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    {payment.date ? (
                      <>
                        <Calendar className="w-4 h-4" />
                        {payment.date}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {payment.status}
                    </Badge>
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
