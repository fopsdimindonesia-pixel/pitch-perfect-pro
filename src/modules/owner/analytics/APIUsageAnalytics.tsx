import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const requestsData = [
  { date: "Dec 10", requests: 45200, errors: 120 },
  { date: "Dec 11", requests: 52100, errors: 210 },
  { date: "Dec 12", requests: 48900, errors: 95 },
  { date: "Dec 13", requests: 61300, errors: 350 },
  { date: "Dec 14", requests: 58700, errors: 180 },
  { date: "Dec 15", requests: 65400, errors: 420 }
];

const endpointUsage = [
  { endpoint: "/api/users", requests: 125600, percentage: 28.5 },
  { endpoint: "/api/competitions", requests: 98500, percentage: 22.3 },
  { endpoint: "/api/matches", requests: 87300, percentage: 19.8 },
  { endpoint: "/api/organizations", requests: 76200, percentage: 17.3 },
  { endpoint: "/api/analytics", requests: 53400, percentage: 12.1 }
];

const methodUsage = [
  { method: "GET", requests: 280000, percentage: 63.5, fill: "#3b82f6" },
  { method: "POST", requests: 120000, percentage: 27.2, fill: "#10b981" },
  { method: "PUT", requests: 35000, percentage: 7.9, fill: "#f59e0b" },
  { method: "DELETE", requests: 5200, percentage: 1.2, fill: "#ef4444" }
];

const statusDistribution = [
  { status: "200 OK", requests: 415800, percentage: 94.2, fill: "#10b981" },
  { status: "201 Created", requests: 12300, percentage: 2.8, fill: "#3b82f6" },
  { status: "400 Bad Request", requests: 8200, percentage: 1.9, fill: "#f59e0b" },
  { status: "500 Server Error", requests: 3900, percentage: 0.9, fill: "#ef4444" }
];

export default function APIUsageAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Usage Analytics</h1>
        <p className="text-muted-foreground mt-1">Analyze and monitor API usage patterns</p>
      </div>

      {/* Time Range Selector */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="7d">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Requests (7d)</p>
          <p className="text-2xl font-bold mt-2">391,600</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% vs last week</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Response Time</p>
          <p className="text-2xl font-bold mt-2">284ms</p>
          <p className="text-xs text-muted-foreground mt-2">P95: 450ms</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Error Rate</p>
          <p className="text-2xl font-bold mt-2">1.27%</p>
          <p className="text-xs text-red-600 mt-2">↑ 0.35% vs last week</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active API Keys</p>
          <p className="text-2xl font-bold mt-2">34</p>
          <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
        </Card>
      </div>

      {/* Request Volume Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Request Volume</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={requestsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#3b82f6" name="Successful Requests" dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Endpoint Usage */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Top Endpoints</h2>
        <div className="space-y-3">
          {endpointUsage.map((endpoint, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{endpoint.endpoint}</p>
                <span className="text-sm text-muted-foreground">{endpoint.requests.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${endpoint.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{endpoint.percentage}% of traffic</p>
            </div>
          ))}
        </div>
      </Card>

      {/* HTTP Methods vs Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">HTTP Methods</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={methodUsage}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.method} (${entry.percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="requests"
              >
                {methodUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Response Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.status} (${entry.percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="requests"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Response Time Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Response Time Percentiles</h2>
        <div className="space-y-3">
          {[
            { percentile: "p50 (Median)", time: "125ms" },
            { percentile: "p75", time: "210ms" },
            { percentile: "p90", time: "380ms" },
            { percentile: "p95", time: "450ms" },
            { percentile: "p99", time: "890ms" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
              <p className="text-sm font-medium">{item.percentile}</p>
              <span className="text-sm font-semibold">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Rate Limit Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Rate Limit Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Requests/Minute</p>
            <p className="text-2xl font-bold">856 / 5000</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "17%" }} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Requests/Hour</p>
            <p className="text-2xl font-bold">28,450 / 100,000</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "28%" }} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Requests/Day</p>
            <p className="text-2xl font-bold">445,200 / 1,000,000</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "44%" }} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Rate Limit Hits</p>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
