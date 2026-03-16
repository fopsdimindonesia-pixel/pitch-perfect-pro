import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Eye } from "lucide-react";

const mockReports = [
  {
    id: "RPT-001",
    name: "Q4 2024 Security Audit",
    type: "Security",
    framework: "ISO 27001",
    date: "2024-12-15",
    auditor: "Security Auditors Inc",
    status: "Completed",
    findings: 2,
    severity: "Low"
  },
  {
    id: "RPT-002",
    name: "GDPR Compliance Report",
    type: "Compliance",
    framework: "GDPR",
    date: "2024-12-10",
    auditor: "EU Compliance Ltd",
    status: "Completed",
    findings: 0,
    severity: "None"
  },
  {
    id: "RPT-003",
    name: "Data Protection Impact Assessment",
    type: "Privacy",
    framework: "GDPR",
    date: "2024-12-05",
    auditor: "Privacy Consultants",
    status: "Completed",
    findings: 1,
    severity: "Medium"
  },
  {
    id: "RPT-004",
    name: "SOC 2 Type II Report",
    type: "SOC 2",
    framework: "SOC 2 Type II",
    date: "2024-11-30",
    auditor: "Compliance Partners LLC",
    status: "Completed",
    findings: 0,
    severity: "None"
  },
  {
    id: "RPT-005",
    name: "Penetration Testing Report",
    type: "Security",
    framework: "Custom",
    date: "2024-11-20",
    auditor: "Security Experts Ltd",
    status: "In Review",
    findings: 3,
    severity: "Medium"
  },
  {
    id: "RPT-006",
    name: "Annual Security Assessment",
    type: "Security",
    framework: "ISO 27001",
    date: "2024-10-15",
    auditor: "Security Auditors Inc",
    status: "Completed",
    findings: 5,
    severity: "Low"
  }
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case "In Review":
      return <Badge className="bg-blue-100 text-blue-800">In Review</Badge>;
    case "Pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case "High":
      return <Badge className="bg-red-100 text-red-800">High</Badge>;
    case "Medium":
      return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
    case "Low":
      return <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>;
    case "None":
      return <Badge className="bg-green-100 text-green-800">None</Badge>;
    default:
      return <Badge>{severity}</Badge>;
  }
}

export default function AuditReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Reports</h1>
        <p className="text-muted-foreground mt-1">View and manage audit and compliance reports</p>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Reports</p>
          <p className="text-2xl font-bold mt-2">{mockReports.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold mt-2">5</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">In Review</p>
          <p className="text-2xl font-bold mt-2">1</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Findings</p>
          <p className="text-2xl font-bold mt-2">11</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Type</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="privacy">Privacy</SelectItem>
                <SelectItem value="soc2">SOC 2</SelectItem>
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Framework</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                <SelectItem value="iso">ISO 27001</SelectItem>
                <SelectItem value="gdpr">GDPR</SelectItem>
                <SelectItem value="soc2">SOC 2 Type II</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Search</label>
            <Input placeholder="Search reports..." />
          </div>
        </div>
      </Card>

      {/* Reports Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Report</th>
                <th className="px-6 py-3 text-left font-semibold">Type</th>
                <th className="px-6 py-3 text-left font-semibold">Framework</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Auditor</th>
                <th className="px-6 py-3 text-center font-semibold">Findings</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <p className="font-medium">{report.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{report.type}</td>
                  <td className="px-6 py-4 text-sm">{report.framework}</td>
                  <td className="px-6 py-4 text-sm">{report.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{report.auditor}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold">{report.findings}</span>
                    {report.findings > 0 && (
                      <div className="mt-1">
                        {getSeverityBadge(report.severity)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Findings Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Findings Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-3">Findings by Severity</p>
            <div className="space-y-2">
              {[
                { level: "Critical", count: 0 },
                { level: "High", count: 2 },
                { level: "Medium", count: 6 },
                { level: "Low", count: 3 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg border">
                  <p className="text-sm font-medium">{item.level} Severity</p>
                  <span className="text-sm font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Open Findings</p>
            <div className="space-y-2">
              {[
                { issue: "Outdated SSL certificate", framework: "ISO 27001", status: "In Progress" },
                { issue: "Missing data encryption", framework: "GDPR", status: "Planned" },
                { issue: "Insufficient logging", framework: "SOC 2", status: "Open" }
              ].map((item, i) => (
                <div key={i} className="p-2 rounded-lg border">
                  <p className="text-sm font-medium">{item.issue}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{item.framework}</span>
                    <Badge variant="outline" className="text-xs">{item.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Report Generation */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Generate New Report</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security">Security Audit</SelectItem>
                  <SelectItem value="compliance">Compliance Check</SelectItem>
                  <SelectItem value="privacy">Privacy Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Framework</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select framework..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iso">ISO 27001</SelectItem>
                  <SelectItem value="gdpr">GDPR</SelectItem>
                  <SelectItem value="soc2">SOC 2 Type II</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>Generate Report</Button>
        </div>
      </Card>
    </div>
  );
}
