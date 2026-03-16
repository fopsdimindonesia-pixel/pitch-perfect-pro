import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Users, TrendingUp, AlertCircle } from "lucide-react";

const subscriptionStats = [
  { label: "Active Subscriptions", value: "412", icon: CreditCard, color: "text-blue-600" },
  { label: "MRR", value: "Rp 48.5M", icon: TrendingUp, color: "text-green-600" },
  { label: "Pending Payments", value: "28", icon: AlertCircle, color: "text-yellow-600" },
];

const mockSubscriptions = [
  { id: 1, organization: "Jakarta Premier League", plan: "Enterprise", price: "Rp 999,000", cycle: "Monthly", status: "Active" },
  { id: 2, organization: "PSSI Makassar", plan: "Pro", price: "Rp 499,000", cycle: "Monthly", status: "Active" },
  { id: 3, organization: "Surabaya Cup", plan: "Starter", price: "Rp 199,000", cycle: "Monthly", status: "Pending" },
  { id: 4, organization: "Bandung Youth", plan: "Pro", price: "Rp 499,000", cycle: "Monthly", status: "Active" },
  { id: 5, organization: "Medan Sports", plan: "Free", price: "Rp 0", cycle: "N/A", status: "Active" },
];

export default function SubscriptionManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground mt-1">Manage all organization subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {subscriptionStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Subscriptions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Organization</th>
                <th className="text-left p-4 font-semibold">Plan</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Billing Cycle</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSubscriptions.map((sub) => (
                <tr key={sub.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{sub.organization}</td>
                  <td className="p-4">
                    <Badge variant="outline">{sub.plan}</Badge>
                  </td>
                  <td className="p-4 font-semibold">{sub.price}</td>
                  <td className="p-4 text-sm">{sub.cycle}</td>
                  <td className="p-4">
                    <Badge className={sub.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {sub.status}
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
