import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, TrendingUp } from "lucide-react";

const mockErrors = [
  {
    id: "ERR-001",
    type: "PaymentProcessingError",
    message: "Timeout during payment processing",
    count: 342,
    severity: "critical",
    lastOccurred: "2024-12-15 14:15",
    status: "Active"
  },
  {
    id: "ERR-002",
    type: "DatabaseConnectionError",
    message: "Connection pool exhausted",
    count: 128,
    severity: "critical",
    lastOccurred: "2024-12-15 13:45",
    status: "Active"
  },
  {
    id: "ERR-003",
    type: "FileUploadError",
    message: "Disk space full",
    count: 89,
    severity: "high",
    lastOccurred: "2024-12-15 12:30",
    status: "Active"
  },
  {
    id: "ERR-004",
    type: "EmailDeliveryError",
    message: "SMTP server connection failed",
    count: 45,
    severity: "medium",
    lastOccurred: "2024-12-15 11:20",
    status: "Active"
  },
  {
    id: "ERR-005",
    type: "CacheTimeoutError",
    message: "Redis connection timeout",
    count: 23,
    severity: "low",
    lastOccurred: "2024-12-15 10:45",
    status: "Resolved"
  }
];

function getSeverityIcon(severity: string) {
  return <TrendingUp className="w-4 h-4" />;
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case "critical":
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    case "high":
      return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    case "low":
      return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
    default:
      return <Badge>{severity}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-red-100 text-red-800">Active</Badge>;
    case "Resolved":
      return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function ErrorTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Error Tracking</h1>
        <p className="text-muted-foreground mt-1">Monitor application errors and exceptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Errors (24h)</p>
          <p className="text-2xl font-bold mt-2">627</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Critical</p>
          <p className="text-2xl font-bold mt-2 text-red-600">2</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Unresolved</p>
          <p className="text-2xl font-bold mt-2">4</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Response</p>
          <p className="text-2xl font-bold mt-2">2.3h</p>
        </Card>
      </div>

      {/* Alert */}
      <Card className="p-4 bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-red-900">2 Critical errors detected</p>
          <p className="text-xs text-red-800">Immediate attention required for payment and database errors</p>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Input type="search" placeholder="Search errors..." className="flex-1 min-w-40" />
      </Card>

      {/* Errors Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Error Type</th>
                <th className="px-6 py-3 text-left font-semibold">Message</th>
                <th className="px-6 py-3 text-right font-semibold">Occurrences</th>
                <th className="px-6 py-3 text-left font-semibold">Severity</th>
                <th className="px-6 py-3 text-left font-semibold">Last Occurred</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockErrors.map((error) => (
                <tr key={error.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium text-blue-600">{error.type}</td>
                  <td className="px-6 py-4 text-muted-foreground">{error.message}</td>
                  <td className="px-6 py-4 text-right font-semibold">{error.count}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(error.severity)}
                      {getSeverityBadge(error.severity)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{error.lastOccurred}</td>
                  <td className="px-6 py-4">{getStatusBadge(error.status)}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline text-xs font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Error Detail */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Error Details: {mockErrors[0].type}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Error ID</p>
            <p className="font-semibold mt-1">{mockErrors[0].id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Occurrences</p>
            <p className="font-semibold mt-1">{mockErrors[0].count}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Stack Trace</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-xs space-y-1">
            <div><span className="text-red-400">PaymentProcessingError:</span> Timeout during payment processing</div>
            <div>  at processPayment (/app/services/payment.js:142:15)</div>
            <div>  at async handlePayment (/app/handlers/payment.js:28:10)</div>
            <div>  at async processRequest (/app/middleware/handler.js:15:5)</div>
            <div>  at async next (/app/app.js:52:20)</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Mark as Resolved</button>
          <button className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted">Ignore Error</button>
          <button className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted">Create Ticket</button>
        </div>
      </Card>
    </div>
  );
}
