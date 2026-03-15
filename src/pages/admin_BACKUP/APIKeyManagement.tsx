import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Eye, EyeOff, Trash2, RotateCw } from "lucide-react";

const mockApiKeys = [
  {
    id: "KEY-001",
    name: "Mobile App API Key",
    key: "sk_live_abcd1234efgh5678",
    environment: "Production",
    status: "Active",
    scopes: ["read:matches", "read:competitions", "write:user"],
    created: "2024-10-15",
    lastUsed: "2024-12-15 14:32:15",
    usage: 1245678
  },
  {
    id: "KEY-002",
    name: "Web Dashboard API Key",
    key: "sk_live_ijkl9012mnop3456",
    environment: "Production",
    status: "Active",
    scopes: ["read:*", "write:*"],
    created: "2024-09-20",
    lastUsed: "2024-12-15 13:45:30",
    usage: 890234
  },
  {
    id: "KEY-003",
    name: "Development API Key",
    key: "sk_test_qrst5678uvwx9012",
    environment: "Development",
    status: "Active",
    scopes: ["read:*", "write:*"],
    created: "2024-08-10",
    lastUsed: "2024-12-14 09:15:45",
    usage: 45678
  },
  {
    id: "KEY-004",
    name: "Third-party Integration",
    key: "sk_live_yzab3456cdef7890",
    environment: "Production",
    status: "Inactive",
    scopes: ["read:competitions", "read:matches"],
    created: "2024-07-05",
    lastUsed: "2024-11-20",
    usage: 12340
  }
];

export default function APIKeyManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Key Management</h1>
        <p className="text-muted-foreground mt-1">Manage API keys and access tokens</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total API Keys</p>
          <p className="text-2xl font-bold mt-2">{mockApiKeys.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Keys</p>
          <p className="text-2xl font-bold mt-2">3</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total API Calls (30d)</p>
          <p className="text-2xl font-bold mt-2">2.4M</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Response Time</p>
          <p className="text-2xl font-bold mt-2">145ms</p>
        </Card>
      </div>

      {/* Create New Key */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Create New API Key</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Key Name</label>
              <Input placeholder="e.g., Production API Key" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Environment</label>
              <Select defaultValue="prod">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prod">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="dev">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Permissions</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "read:users",
                "write:users",
                "read:competitions",
                "write:competitions",
                "read:matches",
                "write:matches",
                "read:organizations",
                "write:organizations",
                "read:analytics",
                "read:reports",
                "manage:api",
                "manage:billing"
              ].map((perm, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-sm">{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Require IP Whitelisting</span>
            </label>
          </div>

          <Button>Create API Key</Button>
        </div>
      </Card>

      {/* API Keys List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Key</th>
                <th className="px-6 py-3 text-left font-semibold">Environment</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Created</th>
                <th className="px-6 py-3 text-left font-semibold">Last Used</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockApiKeys.map((key) => (
                <tr key={key.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{key.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {key.key.substring(0, 10)}...{key.key.substring(-4)}
                      </code>
                      <button title="Copy" className="text-gray-500 hover:text-gray-700">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{key.environment}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    {key.status === "Active" ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{key.created}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{key.lastUsed}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="View details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Regenerate key">
                        <RotateCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Delete key">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key Details */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Key Details: {mockApiKeys[0].name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Full API Key</p>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-gray-900 text-gray-100 px-3 py-2 rounded flex-1 overflow-x-auto">
                {mockApiKeys[0].key}
              </code>
              <Button size="sm" variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-red-600 mt-2">⚠ Keep this secret! Never share this key.</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Scopes</p>
            <div className="space-y-2">
              {mockApiKeys[0].scopes.map((scope) => (
                <Badge key={scope} variant="outline" className="block w-fit">
                  {scope}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Usage (30 days)</p>
            <p className="text-2xl font-bold">{mockApiKeys[0].usage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">API calls</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">IP Whitelist</p>
            <div className="space-y-2">
              {["192.168.1.100", "203.45.120.200"].map((ip, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded border text-sm">
                  <span className="font-mono">{ip}</span>
                  <button className="text-red-600 hover:text-red-700">Remove</button>
                </div>
              ))}
            </div>
            <Input placeholder="Add IP address..." className="mt-2" />
            <Button size="sm" className="mt-2">Add IP</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
