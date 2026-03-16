import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const billingStats = [
  { label: "Total Revenue", value: "Rp 245.8M", icon: DollarSign, color: "text-green-600" },
  { label: "Monthly Recurring Revenue", value: "Rp 48.5M", icon: TrendingUp, color: "text-blue-600" },
  { label: "Pending Payments", value: "Rp 12.3M", icon: Clock, color: "text-yellow-600" },
];

const revenueData = [
  { month: "Jan", revenue: 18000000 },
  { month: "Feb", revenue: 22000000 },
  { month: "Mar", revenue: 28000000 },
  { month: "Apr", revenue: 35000000 },
  { month: "May", revenue: 42000000 },
  { month: "Jun", revenue: 45800000 },
];

const invoices = [
  { id: "INV-001", organization: "Jakarta Premier League", amount: "Rp 999,000", date: "2024-03-15", status: "Paid" },
  { id: "INV-002", organization: "PSSI Makassar", amount: "Rp 499,000", date: "2024-03-15", status: "Paid" },
  { id: "INV-003", organization: "Surabaya Cup", amount: "Rp 199,000", date: "2024-03-14", status: "Pending" },
  { id: "INV-004", organization: "Bandung Youth", amount: "Rp 499,000", date: "2024-03-10", status: "Paid" },
];

export default function PlatformBilling() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Billing</h1>
        <p className="text-muted-foreground mt-1">Revenue and billing overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {billingStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#0066cc" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Invoices Table */}
      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Invoice ID</th>
                <th className="text-left p-4 font-semibold">Organization</th>
                <th className="text-left p-4 font-semibold">Amount</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium font-mono text-sm">{invoice.id}</td>
                  <td className="p-4">{invoice.organization}</td>
                  <td className="p-4 font-semibold">{invoice.amount}</td>
                  <td className="p-4 text-sm text-muted-foreground">{invoice.date}</td>
                  <td className="p-4">
                    <Badge className={invoice.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {invoice.status}
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
