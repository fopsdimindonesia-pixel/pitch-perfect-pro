import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";

const mockLogs = [
  {
    id: "LOG-001",
    timestamp: "2024-12-15 14:32:15",
    level: "INFO",
    service: "API Gateway",
    message: "User login successful",
    userId: "USR-12345"
  },
  {
    id: "LOG-002",
    timestamp: "2024-12-15 14:31:42",
    level: "WARNING",
    service: "Database",
    message: "Slow query detected: 5.2s",
    userId: "-"
  },
  {
    id: "LOG-003",
    timestamp: "2024-12-15 14:30:18",
    level: "ERROR",
    service: "Payment Service",
    message: "Failed to process payment: Timeout error",
    userId: "ORG-45678"
  },
  {
    id: "LOG-004",
    timestamp: "2024-12-15 14:29:55",
    level: "INFO",
    service: "Email Service",
    message: "Email sent to user@example.com",
    userId: "USR-67890"
  },
  {
    id: "LOG-005",
    timestamp: "2024-12-15 14:28:31",
    level: "INFO",
    service: "Cache",
    message: "Cache invalidated for organization",
    userId: "-"
  },
  {
    id: "LOG-006",
    timestamp: "2024-12-15 14:27:09",
    level: "ERROR",
    service: "File Storage",
    message: "Failed to upload file: Disk full",
    userId: "USR-11111"
  }
];

function getLevelIcon(level: string) {
  switch (level) {
    case "INFO":
      return <Info className="w-4 h-4 text-blue-600" />;
    case "WARNING":
      return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    case "ERROR":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return null;
  }
}

function getLevelBadge(level: string) {
  switch (level) {
    case "INFO":
      return <Badge className="bg-blue-100 text-blue-800">INFO</Badge>;
    case "WARNING":
      return <Badge className="bg-orange-100 text-orange-800">WARNING</Badge>;
    case "ERROR":
      return <Badge className="bg-red-100 text-red-800">ERROR</Badge>;
    default:
      return <Badge>{level}</Badge>;
  }
}

export default function SystemLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Logs</h1>
        <p className="text-muted-foreground mt-1">View and search system events</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Logs (24h)</p>
          <p className="text-2xl font-bold mt-2">45,234</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Errors</p>
          <p className="text-2xl font-bold mt-2 text-red-600">128</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Warnings</p>
          <p className="text-2xl font-bold mt-2 text-orange-600">342</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Info</p>
          <p className="text-2xl font-bold mt-2 text-blue-600">44,764</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Log Level</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Service</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="api">API Gateway</SelectItem>
                <SelectItem value="db">Database</SelectItem>
                <SelectItem value="payment">Payment Service</SelectItem>
                <SelectItem value="email">Email Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Time Range</label>
            <Select defaultValue="1h">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 hour</SelectItem>
                <SelectItem value="6h">Last 6 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Search</label>
            <Input placeholder="Search logs..." />
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Timestamp</th>
                <th className="px-6 py-3 text-left font-semibold">Level</th>
                <th className="px-6 py-3 text-left font-semibold">Service</th>
                <th className="px-6 py-3 text-left font-semibold">Message</th>
                <th className="px-6 py-3 text-left font-semibold">User/Entity</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-muted/50 cursor-pointer">
                  <td className="px-6 py-4 font-mono text-xs">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(log.level)}
                      {getLevelBadge(log.level)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{log.service}</td>
                  <td className="px-6 py-4">{log.message}</td>
                  <td className="px-6 py-4 font-mono text-xs">{log.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Log Details Modal */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Log Details</h2>
        <div className="space-y-3 font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <div><span className="text-blue-400">timestamp:</span> 2024-12-15T14:32:15.123Z</div>
          <div><span className="text-blue-400">level:</span> INFO</div>
          <div><span className="text-blue-400">service:</span> api-gateway</div>
          <div><span className="text-blue-400">message:</span> User login successful</div>
          <div><span className="text-blue-400">userId:</span> USR-12345</div>
          <div><span className="text-blue-400">ipAddress:</span> 192.168.1.100</div>
          <div><span className="text-blue-400">userAgent:</span> Mozilla/5.0 (Windows NT 10.0; Win64; x64)</div>
          <div><span className="text-blue-400">duration:</span> 145ms</div>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-4 flex gap-3 flex-wrap">
        <Select defaultValue="csv">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="csv">Export as CSV</SelectItem>
            <SelectItem value="json">Export as JSON</SelectItem>
          </SelectContent>
        </Select>
      </Card>
    </div>
  );
}
