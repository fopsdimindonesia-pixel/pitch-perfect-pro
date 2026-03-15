import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, Shield, TrendingUp } from "lucide-react";

const mockAlerts = [
  {
    id: "ALERT-001",
    type: "Suspicious Login",
    severity: "critical",
    message: "Multiple failed login attempts from unusual location",
    location: "China",
    ipAddress: "203.45.120.200",
    attempts: 12,
    timestamp: "2024-12-15 14:32:15",
    status: "Active"
  },
  {
    id: "ALERT-002",
    type: "High Data Access",
    severity: "high",
    message: "User accessing large amount of sensitive data",
    user: "user@example.com",
    dataAccess: "1.2 GB",
    timestamp: "2024-12-15 13:45:30",
    status: "Active"
  },
  {
    id: "ALERT-003",
    type: "API Rate Limit",
    severity: "medium",
    message: "API rate limit exceeded",
    endpoint: "GET /api/users",
    requestCount: "5842/5000",
    timestamp: "2024-12-15 12:20:10",
    status: "Active"
  },
  {
    id: "ALERT-004",
    type: "Certificate Expiry",
    severity: "high",
    message: "SSL certificate expires in 7 days",
    domain: "api.example.com",
    expiryDate: "2024-12-22",
    timestamp: "2024-12-15 12:00:00",
    status: "Acknowledged"
  },
  {
    id: "ALERT-005",
    type: "Weak Password",
    severity: "medium",
    message: "Admin using weak password",
    user: "admin2@example.com",
    timestamp: "2024-12-15 11:15:45",
    status: "Resolved"
  }
];

function getSeverityIcon(severity: string) {
  switch (severity) {
    case "critical":
      return <AlertCircle className="w-6 h-6 text-red-600" />;
    case "high":
      return <AlertTriangle className="w-6 h-6 text-orange-600" />;
    case "medium":
      return <Shield className="w-6 h-6 text-yellow-600" />;
    default:
      return <AlertTriangle className="w-6 h-6" />;
  }
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case "critical":
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    case "high":
      return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    default:
      return <Badge>{severity}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-red-100 text-red-800">Active</Badge>;
    case "Acknowledged":
      return <Badge className="bg-blue-100 text-blue-800">Acknowledged</Badge>;
    case "Resolved":
      return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function SecurityAlerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Alerts</h1>
        <p className="text-muted-foreground mt-1">Monitor security threats and suspicious activities</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-red-600">
          <p className="text-sm text-muted-foreground">Critical Alerts</p>
          <p className="text-2xl font-bold mt-2 text-red-600">1</p>
          <p className="text-xs text-muted-foreground mt-2">Requires immediate action</p>
        </Card>
        <Card className="p-4 border-l-4 border-orange-600">
          <p className="text-sm text-muted-foreground">High Priority</p>
          <p className="text-2xl font-bold mt-2 text-orange-600">2</p>
          <p className="text-xs text-muted-foreground mt-2">Action recommended</p>
        </Card>
        <Card className="p-4 border-l-4 border-yellow-600">
          <p className="text-sm text-muted-foreground">Medium</p>
          <p className="text-2xl font-bold mt-2 text-yellow-600">2</p>
          <p className="text-xs text-muted-foreground mt-2">Review recommended</p>
        </Card>
        <Card className="p-4 border-l-4 border-green-600">
          <p className="text-sm text-muted-foreground">Resolved</p>
          <p className="text-2xl font-bold mt-2 text-green-600">12</p>
          <p className="text-xs text-muted-foreground mt-2">Last 7 days</p>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
        <div className="space-y-4">
          {mockAlerts.filter(a => a.status === "Active").map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{alert.type}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  </div>
                  {getSeverityBadge(alert.severity)}
                </div>
                
                {alert.location && <p className="text-xs text-muted-foreground">Location: {alert.location} ({alert.ipAddress})</p>}
                {alert.user && <p className="text-xs text-muted-foreground">User: {alert.user}</p>}
                {alert.endpoint && <p className="text-xs text-muted-foreground">Endpoint: {alert.endpoint}</p>}
                {alert.dataAccess && <p className="text-xs text-muted-foreground">Data Access: {alert.dataAccess}</p>}
                {alert.expiryDate && <p className="text-xs text-muted-foreground">Expires: {alert.expiryDate}</p>}
                
                <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
              </div>
              <Button variant="outline" size="sm">Investigate</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* All Alerts */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Type</th>
                <th className="px-6 py-3 text-left font-semibold">Severity</th>
                <th className="px-6 py-3 text-left font-semibold">Message</th>
                <th className="px-6 py-3 text-left font-semibold">Timestamp</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAlerts.map((alert) => (
                <tr key={alert.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{alert.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(alert.severity)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{alert.message}</td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{alert.timestamp}</td>
                  <td className="px-6 py-4">{getStatusBadge(alert.status)}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-xs">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Threat Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Threat Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-3">Top Threats</p>
            <div className="space-y-2">
              {[
                { threat: "Brute Force Login", count: 45 },
                { threat: "SQL Injection", count: 23 },
                { threat: "XSS Attempts", count: 18 },
                { threat: "Rate Limit Abuse", count: 12 },
                { threat: "Suspicious IPs", count: 8 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg border">
                  <p className="text-sm font-medium">{item.threat}</p>
                  <span className="text-sm font-semibold text-red-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">High Risk Indicators</p>
            <div className="space-y-2">
              {[
                { indicator: "Unusual geographic logins", risk: "High" },
                { indicator: "Multiple devices same user", risk: "Medium" },
                { indicator: "API key exposure detected", risk: "Critical" },
                { indicator: "Weak password usage", risk: "Medium" },
                { indicator: "Certificate expiry warning", risk: "High" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg border">
                  <p className="text-sm font-medium">{item.indicator}</p>
                  <Badge variant="outline" className={
                    item.risk === "Critical" ? "bg-red-100 text-red-800" :
                    item.risk === "High" ? "bg-orange-100 text-orange-800" :
                    "bg-yellow-100 text-yellow-800"
                  }>{item.risk}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Recommended Actions */}
      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h2 className="text-lg font-semibold mb-4 text-blue-900">Recommended Security Actions</h2>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>✓ Investigate the critical suspicious login alert from China</li>
          <li>✓ Renew SSL certificate for api.example.com before expiry</li>
          <li>✓ Enforce strong password policy for all admin accounts</li>
          <li>✓ Implement IP whitelisting for admin access</li>
          <li>✓ Enable 2FA for all user accounts</li>
        </ul>
      </Card>
    </div>
  );
}
