import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const userGrowthData = [
  { month: "Jan", users: 2400 },
  { month: "Feb", users: 3200 },
  { month: "Mar", users: 4100 },
  { month: "Apr", users: 5200 },
  { month: "May", users: 6800 },
  { month: "Jun", users: 8450 },
];

const orgGrowthData = [
  { month: "Jan", orgs: 45 },
  { month: "Feb", orgs: 68 },
  { month: "Mar", orgs: 92 },
  { month: "Apr", orgs: 128 },
  { month: "May", orgs: 245 },
  { month: "Jun", orgs: 485 },
];

const competitionData = [
  { date: "Week 1", competitions: 12 },
  { date: "Week 2", competitions: 18 },
  { date: "Week 3", competitions: 24 },
  { date: "Week 4", competitions: 34 },
];

export default function GlobalAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Global Analytics</h1>
          <p className="text-muted-foreground mt-1">Platform-wide analytics and insights</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="jakarta">Jakarta</SelectItem>
            <SelectItem value="makassar">Makassar</SelectItem>
            <SelectItem value="surabaya">Surabaya</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Competition Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="amateur">Amateur</SelectItem>
            <SelectItem value="youth">Youth</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#0066cc" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Organization Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orgGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orgs" fill="#0066cc" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Competition Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={competitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="competitions" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Match Volume Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={competitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="competitions" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
