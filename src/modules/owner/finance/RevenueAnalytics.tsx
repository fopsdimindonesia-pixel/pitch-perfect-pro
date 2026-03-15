import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const subscriptionBreakdown = [
  { name: "Enterprise", value: 45, color: "#0066cc" },
  { name: "Pro", value: 156, color: "#22c55e" },
  { name: "Starter", value: 128, color: "#f59e0b" },
  { name: "Free", value: 83, color: "#9ca3af" },
];

const revenueData = [
  { month: "Jan", revenue: 18000000 },
  { month: "Feb", revenue: 22000000 },
  { month: "Mar", revenue: 28000000 },
  { month: "Apr", revenue: 35000000 },
  { month: "May", revenue: 42000000 },
  { month: "Jun", revenue: 48500000 },
];

const regionRevenue = [
  { region: "Jakarta", revenue: 120000000 },
  { region: "Makassar", revenue: 65000000 },
  { region: "Surabaya", revenue: 42000000 },
  { region: "Bandung", revenue: 18800000 },
];

export default function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Revenue Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed revenue analysis and breakdown</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#0066cc" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Subscription Breakdown */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Subscription Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={subscriptionBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                {subscriptionBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Regional Revenue */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Revenue by Region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0066cc" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
