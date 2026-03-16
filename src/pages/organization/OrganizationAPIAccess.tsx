import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockAPIKeys } from "@/lib/mockData";

export default function OrganizationAPIAccess() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Access</h1>
          <p className="text-muted-foreground mt-1">Manage API keys for integrations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New API Key
        </Button>
      </div>

      <Card className="p-6 bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-900">
          🔐 Keep your API keys secure. Never share them in public repositories or client-side code.
        </p>
      </Card>

      {/* API Keys Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Key</th>
                <th className="text-left p-4 font-semibold">Scope</th>
                <th className="text-left p-4 font-semibold">Created</th>
                <th className="text-left p-4 font-semibold">Last Used</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAPIKeys.map((key) => (
                <tr key={key.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{key.name}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground">{key.key}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {key.scope.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{key.created}</td>
                  <td className="p-4 text-sm text-muted-foreground">{key.lastUsed}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
