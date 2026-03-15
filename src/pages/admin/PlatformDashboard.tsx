import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Trophy, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const platformStats = [
  { label: "Total Users", value: "12,450", change: "+5.2%", icon: Users },
  { label: "Total Organizations", value: "485", change: "+3.8%", icon: Trophy },
  { label: "Total Clubs", value: "2,890", change: "+7.1%", icon: Zap },
  { label: "Event Organizers", value: "156", change: "+1.2%", icon: TrendingUp },
  { label: "Active Competitions", value: "34", change: "+2.4%", icon: Trophy },
  { label: "Total Matches", value: "1,245", change: "+12.3%", icon: Zap },
];

const activityData = [
  { date: "Mon", value: 450 },
  { date: "Tue", value: 520 },
  { date: "Wed", value: 380 },
  { date: "Thu", value: 690 },
  { date: "Fri", value: 820 },
  { date: "Sat", value: 540 },
  { date: "Sun", value: 310 },
];

const recentOrganizations = [
  { id: 1, name: "Jakarta Premier League", members: 245, status: "Active" },
  { id: 2, name: "Makassar Regional FA", members: 128, status: "Active" },
  { id: 3, name: "Surabaya Youth Cup", members: 89, status: "Pending" },
];

const recentCompetitions = [
  { id: 1, name: "Jakarta Elite U15", clubs: 16, status: "Active" },
  { id: 2, name: "Makassar Championship", clubs: 12, status: "In Progress" },
  { id: 3, name: "Bandung Cup Final", clubs: 8, status: "Completed" },
];

export default function PlatformDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {platformStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Icon className="w-5 h-5 text-blue-600" />
                <span className="text-xs text-green-600 font-semibold">{stat.change}</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Platform Activity Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0066cc" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* System Status */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">API</span>
              <Badge className="bg-green-100 text-green-800">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payment</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Service</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Organizations */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Organizations</h2>
          <div className="space-y-3">
            {recentOrganizations.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{org.name}</p>
                  <p className="text-xs text-muted-foreground">{org.members} members</p>
                </div>
                <Badge className={org.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {org.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Competitions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Competitions</h2>
          <div className="space-y-3">
            {recentCompetitions.map((comp) => (
              <div key={comp.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{comp.name}</p>
                  <p className="text-xs text-muted-foreground">{comp.clubs} clubs</p>
                </div>
                <Badge variant="outline">{comp.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
