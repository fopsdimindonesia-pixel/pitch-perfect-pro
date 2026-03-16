import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, HardDrive } from "lucide-react";

const mockBackups = [
  {
    id: "BK-001",
    date: "2024-12-15 00:00",
    size: "245.8 GB",
    status: "Completed",
    type: "Full",
    encrypted: true,
    retention: "365 days"
  },
  {
    id: "BK-002",
    date: "2024-12-14 00:00",
    size: "42.3 GB",
    status: "Completed",
    type: "Incremental",
    encrypted: true,
    retention: "30 days"
  },
  {
    id: "BK-003",
    date: "2024-12-13 00:00",
    size: "38.9 GB",
    status: "Completed",
    type: "Incremental",
    encrypted: true,
    retention: "30 days"
  },
  {
    id: "BK-004",
    date: "2024-12-12 00:00",
    size: "45.1 GB",
    status: "Completed",
    type: "Incremental",
    encrypted: true,
    retention: "30 days"
  },
  {
    id: "BK-005",
    date: "2024-12-11 00:00",
    size: "240.2 GB",
    status: "Completed",
    type: "Full",
    encrypted: true,
    retention: "365 days"
  },
  {
    id: "BK-006",
    date: "2024-12-10 12:30",
    size: "52.5 MB",
    status: "In Progress",
    type: "Incremental",
    encrypted: true,
    retention: "30 days"
  }
];

function getStatusIcon(status: string) {
  switch (status) {
    case "Completed":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "In Progress":
      return <Clock className="w-4 h-4 text-blue-600" />;
    case "Failed":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case "In Progress":
      return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    case "Failed":
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function SystemBackup() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Backup</h1>
        <p className="text-muted-foreground mt-1">Manage system backups and recovery points</p>
      </div>

      {/* Backup Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Backups</p>
          <p className="text-2xl font-bold mt-2">{mockBackups.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Size</p>
          <p className="text-2xl font-bold mt-2">665 GB</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Last Backup</p>
          <p className="text-2xl font-bold mt-2">2024-12-15</p>
          <p className="text-xs text-muted-foreground mt-1">12 hours ago</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Storage Used</p>
          <p className="text-2xl font-bold mt-2">78%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: "78%" }} />
          </div>
        </Card>
      </div>

      {/* Backup Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Backup Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button className="w-full">
            <HardDrive className="w-4 h-4 mr-2" />
            Create Full Backup Now
          </Button>
          <Button variant="outline" className="w-full">
            <HardDrive className="w-4 h-4 mr-2" />
            Create Incremental Backup
          </Button>
        </div>
      </Card>

      {/* Backup Schedule */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Backup Schedule</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Enable Automated Backups</span>
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Backup Frequency</label>
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Incremental Backup Frequency</label>
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option>Every 4 hours</option>
                <option>Every 6 hours</option>
                <option>Every 12 hours</option>
                <option>Daily</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Backup Time</label>
              <input type="time" defaultValue="02:00" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Backup Retention</label>
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option>30 days</option>
                <option>90 days</option>
                <option>1 year</option>
                <option>Unlimited</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Backup List */}
      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Backup History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Type</th>
                <th className="px-6 py-3 text-right font-semibold">Size</th>
                <th className="px-6 py-3 text-left font-semibold">Encrypted</th>
                <th className="px-6 py-3 text-left font-semibold">Retention</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBackups.map((backup) => (
                <tr key={backup.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{backup.id}</td>
                  <td className="px-6 py-4">{backup.date}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{backup.type}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">{backup.size}</td>
                  <td className="px-6 py-4">
                    {backup.encrypted ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">{backup.retention}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(backup.status)}
                      {getStatusBadge(backup.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Download</Button>
                      <Button variant="ghost" size="sm">Restore</Button>
                    </div>
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
