import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileText, Database } from "lucide-react";

const mockExports = [
  {
    id: "EXP-001",
    name: "Users Database",
    format: "CSV",
    size: "24.5 MB",
    status: "Completed",
    createdAt: "2024-12-15 10:30",
    expiresAt: "2024-12-22"
  },
  {
    id: "EXP-002",
    name: "Organizations Database",
    format: "JSON",
    size: "18.2 MB",
    status: "Completed",
    createdAt: "2024-12-14 15:45",
    expiresAt: "2024-12-21"
  },
  {
    id: "EXP-003",
    name: "Competitions & Matches",
    format: "CSV",
    size: "12.8 MB",
    status: "Completed",
    createdAt: "2024-12-13 09:15",
    expiresAt: "2024-12-20"
  },
  {
    id: "EXP-004",
    name: "Financial Records",
    format: "Excel",
    size: "8.5 MB",
    status: "Processing",
    createdAt: "2024-12-15 11:20",
    expiresAt: null
  }
];

function getFormatIcon(format: string) {
  switch (format) {
    case "CSV":
    case "Excel":
      return <FileText className="w-5 h-5 text-green-600" />;
    case "JSON":
      return <FileJson className="w-5 h-5 text-blue-600" />;
    default:
      return <Database className="w-5 h-5 text-purple-600" />;
  }
}

export default function DataExport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Export</h1>
        <p className="text-muted-foreground mt-1">Export platform data in various formats</p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 hover:border-blue-400 cursor-pointer transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="font-semibold mb-2">Users Data</h3>
          <p className="text-sm text-muted-foreground mb-4">Export all user accounts and profiles</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="users-format" defaultChecked /> CSV Format
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="users-format" /> JSON Format
            </label>
          </div>
          <Button className="w-full mt-4">Export Users</Button>
        </Card>

        <Card className="p-6 hover:border-blue-400 cursor-pointer transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="font-semibold mb-2">Organizations Data</h3>
          <p className="text-sm text-muted-foreground mb-4">Export all organizations and hierarchy</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="org-format" defaultChecked /> CSV Format
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="org-format" /> JSON Format
            </label>
          </div>
          <Button className="w-full mt-4">Export Organizations</Button>
        </Card>

        <Card className="p-6 hover:border-blue-400 cursor-pointer transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="font-semibold mb-2">Competitions & Matches</h3>
          <p className="text-sm text-muted-foreground mb-4">Export all competitions, schedules and results</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="comp-format" defaultChecked /> CSV Format
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="comp-format" /> JSON Format
            </label>
          </div>
          <Button className="w-full mt-4">Export Data</Button>
        </Card>

        <Card className="p-6 hover:border-blue-400 cursor-pointer transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="font-semibold mb-2">Financial Records</h3>
          <p className="text-sm text-muted-foreground mb-4">Export billing, payments and transactions</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="fin-format" defaultChecked /> Excel Format
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="fin-format" /> JSON Format
            </label>
          </div>
          <Button className="w-full mt-4">Export Financial</Button>
        </Card>
      </div>

      {/* Recent Exports */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Exports</h2>
        <div className="space-y-3">
          {mockExports.map((exp) => (
            <div key={exp.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
              <div className="flex items-center gap-4 flex-1">
                {getFormatIcon(exp.format)}
                <div className="flex-1">
                  <p className="font-medium text-sm">{exp.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {exp.format} • {exp.size} • Created {exp.createdAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {exp.status === "Completed" && (
                  <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
                )}
                {exp.status === "Processing" && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Processing</Badge>
                )}
                {exp.status === "Completed" && (
                  <>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm">Delete</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Export Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Export Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Include Metadata</span>
            </label>
            <p className="text-xs text-muted-foreground ml-6">Include creation dates, modified dates, etc.</p>
          </div>
          <div>
            <label className="flex items-center gap-2 mb-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Anonymize Personal Data</span>
            </label>
            <p className="text-xs text-muted-foreground ml-6">Remove email addresses and sensitive information</p>
          </div>
          <div>
            <label className="flex items-center gap-2 mb-3">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Compress Export</span>
            </label>
            <p className="text-xs text-muted-foreground ml-6">Reduce file size with gzip compression</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Auto-delete Exports After (days)</label>
            <select className="w-40 px-3 py-2 border rounded-md text-sm">
              <option>7 days</option>
              <option>14 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
}
