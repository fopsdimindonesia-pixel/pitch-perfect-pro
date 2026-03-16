import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

const cpuData = [
  { time: "00:00", usage: 32 },
  { time: "04:00", usage: 28 },
  { time: "08:00", usage: 45 },
  { time: "12:00", usage: 62 },
  { time: "16:00", usage: 58 },
  { time: "20:00", usage: 48 },
  { time: "23:59", usage: 35 }
];

const memoryData = [
  { time: "00:00", used: 4.2, total: 16 },
  { time: "04:00", used: 3.8, total: 16 },
  { time: "08:00", used: 6.5, total: 16 },
  { time: "12:00", used: 10.2, total: 16 },
  { time: "16:00", used: 9.8, total: 16 },
  { time: "20:00", used: 7.5, total: 16 },
  { time: "23:59", used: 5.1, total: 16 }
];

const diskData = [
  { name: "System", value: 120 },
  { name: "Database", value: 450 },
  { name: "Logs", value: 35 },
  { name: "Cache", value: 28 }
];

const responseTimeData = [
  { endpoint: "GET /api/users", time: 85, limit: 200 },
  { endpoint: "POST /api/login", time: 120, limit: 300 },
  { endpoint: "GET /api/matches", time: 680, limit: 1000 },
  { endpoint: "GET /api/competitions", time: 450, limit: 800 },
  { endpoint: "POST /api/upload", time: 1200, limit: 5000 }
];

export default function PerformanceMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Monitoring</h1>
        <p className="text-muted-foreground mt-1">Monitor system performance metrics</p>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">CPU Usage</p>
          <p className="text-2xl font-bold mt-2">48%</p>
          <p className="text-xs text-muted-foreground mt-2">Healthy</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Memory Usage</p>
          <p className="text-2xl font-bold mt-2">62%</p>
          <p className="text-xs text-muted-foreground mt-2">Normal</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Disk Usage</p>
          <p className="text-2xl font-bold mt-2">78%</p>
          <p className="text-xs text-muted-foreground mt-2">Monitor</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Response Time</p>
          <p className="text-2xl font-bold mt-2">284ms</p>
          <p className="text-xs text-muted-foreground mt-2">Good</p>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="p-4 bg-orange-50 border border-orange-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-orange-900">Disk usage approaching limit</p>
          <p className="text-xs text-orange-800">Currently at 78%. Consider archiving old logs.</p>
        </div>
      </Card>

      {/* Time Range Selector */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="24h">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last 1 hour</SelectItem>
            <SelectItem value="6h">Last 6 hours</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* CPU Usage Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">CPU Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cpuData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Line type="monotone" dataKey="usage" stroke="#3b82f6" name="CPU Usage %" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Memory Usage Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Memory Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={memoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 16]} />
            <Tooltip formatter={(value) => `${value}GB`} />
            <Legend />
            <Bar dataKey="used" stackId="memory" fill="#3b82f6" name="Used (GB)" />
            <Bar dataKey="total" stackId="memory" fill="#e5e7eb" name="Total (GB)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Disk Usage Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Disk Space Usage</h2>
        <div className="space-y-3">
          {diskData.map((disk) => (
            <div key={disk.name}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{disk.name}</p>
                <span className="text-sm text-muted-foreground">{disk.value} GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(disk.value / 600) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* API Response Times */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">API Response Times</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Endpoint</th>
                <th className="px-4 py-3 text-right font-semibold">Response Time</th>
                <th className="px-4 py-3 text-right font-semibold">Limit</th>
                <th className="px-4 py-3 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {responseTimeData.map((endpoint, i) => (
                <tr key={i} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{endpoint.endpoint}</td>
                  <td className="px-4 py-3 text-right">{endpoint.time}ms</td>
                  <td className="px-4 py-3 text-right">{endpoint.limit}ms</td>
                  <td className="px-4 py-3 text-center">
                    {endpoint.time < endpoint.limit * 0.7 && (
                      <div className="inline-block w-2 h-2 rounded-full bg-green-600" title="Good" />
                    )}
                    {endpoint.time >= endpoint.limit * 0.7 && endpoint.time < endpoint.limit && (
                      <div className="inline-block w-2 h-2 rounded-full bg-orange-600" title="Approaching limit" />
                    )}
                    {endpoint.time >= endpoint.limit && (
                      <div className="inline-block w-2 h-2 rounded-full bg-red-600" title="Exceeds limit" />
                    )}
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
