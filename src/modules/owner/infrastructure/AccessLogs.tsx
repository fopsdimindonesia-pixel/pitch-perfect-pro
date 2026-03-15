import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Globe } from "lucide-react";

const mockAccessLogs = [
  {
    id: "LOG-001",
    userId: "USR-12345",
    username: "john.doe@example.com",
    action: "Login",
    ipAddress: "192.168.1.100",
    country: "United States",
    device: "Chrome/Windows 10",
    timestamp: "2024-12-15 14:32:15",
    status: "Success"
  },
  {
    id: "LOG-002",
    userId: "USR-67890",
    username: "jane.smith@example.com",
    action: "Login",
    ipAddress: "85.120.45.200",
    country: "United Kingdom",
    device: "Safari/iOS",
    timestamp: "2024-12-15 13:45:30",
    status: "Success"
  },
  {
    id: "LOG-003",
    userId: "USR-11111",
    username: "admin@example.com",
    action: "Login Failed",
    ipAddress: "203.45.120.89",
    country: "Canada",
    device: "Firefox/Windows 11",
    timestamp: "2024-12-15 12:20:10",
    status: "Failed"
  },
  {
    id: "LOG-004",
    userId: "USR-22222",
    username: "user@example.com",
    action: "Login",
    ipAddress: "180.200.30.45",
    country: "Australia",
    device: "Chrome/macOS",
    timestamp: "2024-12-15 11:15:45",
    status: "Success"
  },
  {
    id: "LOG-005",
    userId: "USR-33333",
    username: "org.admin@example.com",
    action: "Logout",
    ipAddress: "192.168.1.105",
    country: "United States",
    device: "Edge/Windows 10",
    timestamp: "2024-12-15 10:30:20",
    status: "Success"
  },
  {
    id: "LOG-006",
    userId: "Unknown",
    username: "unknown@example.com",
    action: "Login Failed",
    ipAddress: "58.160.200.100",
    country: "Brazil",
    device: "Unknown",
    timestamp: "2024-12-15 09:45:35",
    status: "Failed"
  }
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Success":
      return <Badge className="bg-green-100 text-green-800">Success</Badge>;
    case "Failed":
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function AccessLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Access Logs</h1>
        <p className="text-muted-foreground mt-1">Monitor user login and access history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Logins (24h)</p>
          <p className="text-2xl font-bold mt-2">2,847</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Successful</p>
          <p className="text-2xl font-bold mt-2 text-green-600">2,812</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Failed</p>
          <p className="text-2xl font-bold mt-2 text-red-600">35</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Unique IPs</p>
          <p className="text-2xl font-bold mt-2">1,243</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Action</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
                <SelectItem value="failed">Failed Login</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Status</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Search</label>
            <Input placeholder="Username or IP..." />
          </div>
        </div>
      </Card>

      {/* Access Log Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Timestamp</th>
                <th className="px-6 py-3 text-left font-semibold">Username</th>
                <th className="px-6 py-3 text-left font-semibold">Action</th>
                <th className="px-6 py-3 text-left font-semibold">IP Address</th>
                <th className="px-6 py-3 text-left font-semibold">Location</th>
                <th className="px-6 py-3 text-left font-semibold">Device</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAccessLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-muted/50 cursor-pointer">
                  <td className="px-6 py-4 font-mono text-xs">{log.timestamp}</td>
                  <td className="px-6 py-4 font-medium">{log.username}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm">
                      {log.action === "Login" && "🔓"}
                      {log.action === "Logout" && "🔒"}
                      {log.action === "Login Failed" && "❌"}
                      {" " + log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{log.ipAddress}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-xs">{log.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{log.device}</td>
                  <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Locations</h2>
          <div className="space-y-3">
            {[
              { country: "United States", logins: 1245, percentage: 43.7 },
              { country: "United Kingdom", logins: 420, percentage: 14.8 },
              { country: "Canada", logins: 310, percentage: 10.9 },
              { country: "Australia", logins: 290, percentage: 10.2 },
              { country: "Brazil", logins: 180, percentage: 6.3 },
              { country: "Others", logins: 402, percentage: 14.1 }
            ].map((location, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{location.country}</p>
                  <span className="text-sm text-muted-foreground">{location.logins.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Device Types</h2>
          <div className="space-y-3">
            {[
              { device: "Windows", count: 1240, percentage: 43.6 },
              { device: "macOS", count: 680, percentage: 23.9 },
              { device: "iOS", count: 560, percentage: 19.7 },
              { device: "Android", count: 290, percentage: 10.2 },
              { device: "Linux", count: 87, percentage: 3.1 }
            ].map((device, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{device.device}</p>
                  <span className="text-sm text-muted-foreground">{device.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
