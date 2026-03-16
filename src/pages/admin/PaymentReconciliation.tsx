import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const mockReconciliations = [
  {
    id: "REC-001",
    date: "2024-12-01",
    amount: 15240.50,
    method: "Stripe",
    status: "Completed",
    transactions: 142,
    discrepancies: 0
  },
  {
    id: "REC-002",
    date: "2024-11-01",
    amount: 14890.25,
    method: "PayPal",
    status: "Completed",
    transactions: 128,
    discrepancies: 0
  },
  {
    id: "REC-003",
    date: "2024-10-01",
    amount: 13450.75,
    method: "Stripe",
    status: "Completed",
    transactions: 115,
    discrepancies: 2
  },
  {
    id: "REC-004",
    date: "2024-09-01",
    amount: 12890.00,
    method: "Bank Transfer",
    status: "Pending",
    transactions: 98,
    discrepancies: 3
  },
  {
    id: "REC-005",
    date: "2024-08-01",
    amount: 11240.50,
    method: "Stripe",
    status: "Investigating",
    transactions: 105,
    discrepancies: 5
  }
];

function getStatusIcon(status: string) {
  switch (status) {
    case "Completed":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "Pending":
      return <Clock className="w-4 h-4 text-blue-600" />;
    case "Investigating":
      return <AlertCircle className="w-4 h-4 text-orange-600" />;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case "Pending":
      return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
    case "Investigating":
      return <Badge className="bg-orange-100 text-orange-800">Investigating</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function PaymentReconciliation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Reconciliation</h1>
        <p className="text-muted-foreground mt-1">Reconcile payments from payment processors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold mt-2">$67,711.00</p>
          <p className="text-xs text-muted-foreground mt-2">5 reconciliations</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold mt-2">3</p>
          <p className="text-xs text-muted-foreground mt-2">$43,581.50</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold mt-2">1</p>
          <p className="text-xs text-muted-foreground mt-2">$12,890.00</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Issues Found</p>
          <p className="text-2xl font-bold mt-2">7</p>
          <p className="text-xs text-muted-foreground mt-2">In 2 reconciliations</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="stripe">Stripe</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="bank">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
          </SelectContent>
        </Select>
        <Input type="search" placeholder="Search by ID..." className="flex-1 min-w-40" />
      </Card>

      {/* Reconciliations Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Method</th>
                <th className="px-6 py-3 text-right font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Transactions</th>
                <th className="px-6 py-3 text-left font-semibold">Issues</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockReconciliations.map((rec) => (
                <tr key={rec.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{rec.id}</td>
                  <td className="px-6 py-4">{rec.date}</td>
                  <td className="px-6 py-4">{rec.method}</td>
                  <td className="px-6 py-4 text-right font-medium">${rec.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4">{rec.transactions}</td>
                  <td className="px-6 py-4">
                    {rec.discrepancies > 0 ? (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-600">{rec.discrepancies}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(rec.status)}
                      {getStatusBadge(rec.status)}
                    </div>
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
