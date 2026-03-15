import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const mockLanguages = [
  {
    id: "en",
    name: "English",
    code: "en-US",
    status: "Active",
    coverage: 100,
    users: 12450,
    lastUpdated: "2024-12-15"
  },
  {
    id: "es",
    name: "Spanish",
    code: "es-ES",
    status: "Active",
    coverage: 95,
    users: 8920,
    lastUpdated: "2024-12-10"
  },
  {
    id: "fr",
    name: "French",
    code: "fr-FR",
    status: "Active",
    coverage: 92,
    users: 4560,
    lastUpdated: "2024-12-08"
  },
  {
    id: "id",
    name: "Indonesian",
    code: "id-ID",
    status: "Active",
    coverage: 88,
    users: 6780,
    lastUpdated: "2024-12-05"
  },
  {
    id: "pt",
    name: "Portuguese",
    code: "pt-BR",
    status: "In Progress",
    coverage: 65,
    users: 2340,
    lastUpdated: "2024-12-01"
  },
  {
    id: "de",
    name: "German",
    code: "de-DE",
    status: "Planned",
    coverage: 0,
    users: 0,
    lastUpdated: null
  }
];

function getStatusIcon(status: string) {
  switch (status) {
    case "Active":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "In Progress":
      return <Clock className="w-4 h-4 text-blue-600" />;
    case "Planned":
      return <AlertCircle className="w-4 h-4 text-gray-600" />;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case "In Progress":
      return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    case "Planned":
      return <Badge className="bg-gray-100 text-gray-800">Planned</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function LocalizationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Localization Settings</h1>
        <p className="text-muted-foreground mt-1">Manage language and localization support</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Languages</p>
          <p className="text-2xl font-bold mt-2">4</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold mt-2">34,150</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold mt-2">1</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Planned</p>
          <p className="text-2xl font-bold mt-2">1</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="progress">In Progress</SelectItem>
            <SelectItem value="planned">Planned</SelectItem>
          </SelectContent>
        </Select>
        <Input type="search" placeholder="Search language..." className="flex-1 min-w-40" />
      </Card>

      {/* Languages Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Language</th>
                <th className="px-6 py-3 text-left font-semibold">Code</th>
                <th className="px-6 py-3 text-center font-semibold">Coverage</th>
                <th className="px-6 py-3 text-right font-semibold">Users</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Last Updated</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLanguages.map((lang) => (
                <tr key={lang.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{lang.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{lang.code}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${lang.coverage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{lang.coverage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {lang.users > 0 ? lang.users.toLocaleString() : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(lang.status)}
                      {getStatusBadge(lang.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {lang.lastUpdated || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Language */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Add New Language</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select language..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Language Code</label>
            <Input placeholder="e.g., ja-JP" />
          </div>
        </div>
        <Button>Add Language</Button>
      </Card>
    </div>
  );
}
