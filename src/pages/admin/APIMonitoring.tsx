import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const apiData = [
  { time: "00:00", requests: 1240 },
  { time: "04:00", requests: 1100 },
  { time: "08:00", requests: 2340 },
  { time: "12:00", requests: 3560 },
  { time: "16:00", requests: 2980 },
  { time: "20:00", requests: 2450 },
  { time: "23:59", requests: 1680 }
];

const mockEndpoints = [
  {
    path: "GET /api/users",
    requests: 12450,
    avgTime: 85,
    errors: 12,
    errorRate: 0.1,
    status: "Healthy"
  },
  {
    path: "POST /api/login",
    requests: 8930,
    avgTime: 120,
    errors: 45,
    errorRate: 0.5,
    status: "Healthy"
  },
  {
    path: "GET /api/competitions",
    requests: 5640,
    avgTime: 450,
    errors: 28,
    errorRate: 0.5,
    status: "Slow"
  },
  {
    path: "POST /api/upload",
    requests: 1240,
    avgTime: 1200,
    errors: 34,
    errorRate: 2.7,
    status: "Slow"
  },
  {
    path: "GET /api/match/:id/stats",
    requests: 3450,
    avgTime: 680,
    errors: 0,
    errorRate: 0,
    status: "Healthy"
  }
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Healthy":
      return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
    case "Slow":
      return <Badge className="bg-orange-100 text-orange-800">Slow</Badge>;
    case "Error":
      return <Badge className="bg-red-100 text-red-800">Error</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function APIMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Monitoring</h1>
        <p className="text-muted-foreground mt-1">Monitor API endpoints and performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Requests (24h)</p>
          <p className="text-2xl font-bold mt-2">28,440</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Response Time</p>
          <p className="text-2xl font-bold mt-2">384ms</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Error Rate</p>
          <p className="text-2xl font-bold mt-2 text-orange-600">0.48%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Endpoints</p>
          <p className="text-2xl font-bold mt-2">127</p>
        </Card>
      </div>

      {/* Request Volume Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Request Volume (24h)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={apiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="requests" fill="#3b82f6" name="API Requests" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="get">GET</SelectItem>
            <SelectItem value="post">POST</SelectItem>
            <SelectItem value="put">PUT</SelectItem>
            <SelectItem value="delete">DELETE</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="slow">Slow</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Input type="search" placeholder="Search endpoints..." className="flex-1 min-w-40" />
      </Card>

      {/* Endpoints Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Endpoint</th>
                <th className="px-6 py-3 text-right font-semibold">Requests</th>
                <th className="px-6 py-3 text-right font-semibold">Avg Time</th>
                <th className="px-6 py-3 text-right font-semibold">Errors</th>
                <th className="px-6 py-3 text-right font-semibold">Error Rate</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockEndpoints.map((endpoint, i) => (
                <tr key={i} className="border-b hover:bg-muted/50 cursor-pointer">
                  <td className="px-6 py-4 font-medium text-blue-600">{endpoint.path}</td>
                  <td className="px-6 py-4 text-right">{endpoint.requests.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">{endpoint.avgTime}ms</td>
                  <td className="px-6 py-4 text-right font-semibold">{endpoint.errors}</td>
                  <td className="px-6 py-4 text-right">{endpoint.errorRate.toFixed(2)}%</td>
                  <td className="px-6 py-4">{getStatusBadge(endpoint.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* HTTP Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Response Status Distribution</h2>
          <div className="space-y-3">
            {[
              { code: "200 OK", count: 27125, percentage: 95.4 },
              { code: "201 Created", count: 892, percentage: 3.1 },
              { code: "400 Bad Request", count: 273, percentage: 0.96 },
              { code: "500 Server Error", count: 150, percentage: 0.53 }
            ].map((status, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{status.code}</p>
                  <span className="text-sm text-muted-foreground">{status.count.toLocaleString()} ({status.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      status.code.startsWith("2") ? "bg-green-600" :
                      status.code.startsWith("4") ? "bg-orange-600" :
                      "bg-red-600"
                    }`}
                    style={{ width: `${status.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Slowest Endpoints</h2>
          <div className="space-y-3">
            {mockEndpoints.sort((a, b) => b.avgTime - a.avgTime).slice(0, 5).map((endpoint, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50">
                <p className="text-sm font-medium text-blue-600">{endpoint.path.split(" ")[1]}</p>
                <span className="text-sm font-semibold">{endpoint.avgTime}ms</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Rate Limiting */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Rate Limiting Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { limit: "1000 req/min", current: 425, available: 575 },
            { limit: "5000 req/hour", current: 2340, available: 2660 },
            { limit: "Unlimited/day", current: 18240, available: 0 }
          ].map((limiter, i) => (
            <div key={i}>
              <p className="text-sm font-medium mb-2">{limiter.limit}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(limiter.current / (limiter.current + limiter.available)) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{limiter.current} / {limiter.current + limiter.available}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
