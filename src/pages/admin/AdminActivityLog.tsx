import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle, Edit3, Trash2, Lock, Settings } from "lucide-react";

const mockActivityLogs = [
  {
    id: "ACT-001",
    timestamp: "2024-12-15 14:32:15",
    admin: "admin@example.com",
    action: "Suspended User",
    target: "user@example.com",
    details: "Reason: Violation of terms",
    severity: "high",
    status: "Completed"
  },
  {
    id: "ACT-002",
    timestamp: "2024-12-15 13:45:30",
    admin: "superadmin@example.com",
    action: "Updated Platform Fee",
    target: "Platform Settings",
    details: "Changed from 10% to 12%",
    severity: "high",
    status: "Completed"
  },
  {
    id: "ACT-003",
    timestamp: "2024-12-15 12:20:10",
    admin: "admin@example.com",
    action: "Exported User Database",
    target: "User Data",
    details: "Format: CSV, Size: 24.5 MB",
    severity: "medium",
    status: "Completed"
  },
  {
    id: "ACT-004",
    timestamp: "2024-12-15 11:15:45",
    admin: "moderator@example.com",
    action: "Deleted Competition",
    target: "Championship 2024",
    details: "Reason: Duplicate entry",
    severity: "high",
    status: "Completed"
  },
  {
    id: "ACT-005",
    timestamp: "2024-12-15 10:30:20",
    admin: "admin@example.com",
    action: "Modified User Permissions",
    target: "org.admin@example.com",
    details: "Removed admin role",
    severity: "medium",
    status: "Completed"
  },
  {
    id: "ACT-006",
    timestamp: "2024-12-15 09:45:35",
    admin: "superadmin@example.com",
    action: "Enabled Maintenance Mode",
    target: "Platform",
    details: "Scheduled: 2024-12-22 02:00",
    severity: "low",
    status: "Pending"
  }
];

function getActionIcon(action: string) {
  if (action.includes("Suspended") || action.includes("Deleted"))
    return <Trash2 className="w-4 h-4 text-red-600" />;
  if (action.includes("Updated") || action.includes("Modified"))
    return <Edit3 className="w-4 h-4 text-blue-600" />;
  if (action.includes("Permission") || action.includes("Enabled"))
    return <Lock className="w-4 h-4 text-orange-600" />;
  return <Settings className="w-4 h-4 text-purple-600" />;
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case "high":
      return <Badge className="bg-red-100 text-red-800">High</Badge>;
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
    case "Completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case "Pending":
      return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function AdminActivityLog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Activity Log</h1>
        <p className="text-muted-foreground mt-1">Track all administrative actions and changes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Actions (24h)</p>
          <p className="text-2xl font-bold mt-2">342</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Admins</p>
          <p className="text-2xl font-bold mt-2">8</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">High Priority</p>
          <p className="text-2xl font-bold mt-2 text-red-600">12</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Data Changes</p>
          <p className="text-2xl font-bold mt-2">89</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Admin</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Admins</SelectItem>
                <SelectItem value="super">Superadmin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="mod">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Action Type</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="suspend">Suspend</SelectItem>
                <SelectItem value="export">Export</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Severity</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Search</label>
            <Input placeholder="Admin or action..." />
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
        <div className="space-y-4">
          {mockActivityLogs.map((log, i) => (
            <div key={log.id} className="relative">
              {/* Timeline line */}
              {i !== mockActivityLogs.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-12 bg-gray-200" />
              )}

              {/* Timeline item */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-white">
                    {getActionIcon(log.action)}
                  </div>
                </div>

                <div className="flex-1 p-4 rounded-lg border hover:bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{log.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        by <span className="font-medium">{log.admin}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(log.severity)}
                      {getStatusBadge(log.status)}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    Target: <span className="font-medium text-foreground">{log.target}</span>
                  </p>

                  <p className="text-xs text-muted-foreground mb-2">{log.details}</p>

                  <p className="text-xs text-muted-foreground font-mono">{log.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Admins by Activity</h2>
          <div className="space-y-3">
            {[
              { admin: "admin@example.com", actions: 89 },
              { admin: "superadmin@example.com", actions: 67 },
              { admin: "moderator@example.com", actions: 45 },
              { admin: "reviewer@example.com", actions: 28 },
              { admin: "support@example.com", actions: 15 }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{item.admin}</p>
                  <span className="text-sm text-muted-foreground">{item.actions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(item.actions / 89) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Action Types</h2>
          <div className="space-y-3">
            {[
              { type: "User Suspension", count: 45 },
              { type: "Settings Update", count: 89 },
              { type: "Data Export", count: 34 },
              { type: "Content Deletion", count: 23 },
              { type: "Permission Change", count: 67 }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{item.type}</p>
                  <span className="text-sm text-muted-foreground">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${(item.count / 89) * 100}%` }}
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
