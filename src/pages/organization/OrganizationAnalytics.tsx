import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockOrgAnalytics } from "@/lib/mockData";

export default function OrganizationAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Analytics</h1>
        <p className="text-muted-foreground mt-1">Dashboard and metrics overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Members</p>
          <p className="text-3xl font-bold mt-2">{mockOrgAnalytics.totalMembers}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Clubs</p>
          <p className="text-3xl font-bold mt-2">{mockOrgAnalytics.totalClubs}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Event Organizers</p>
          <p className="text-3xl font-bold mt-2">{mockOrgAnalytics.totalEOs}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Users</p>
          <p className="text-3xl font-bold mt-2">{mockOrgAnalytics.activeUsers}</p>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Weekly Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockOrgAnalytics.activityChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#0066cc" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
