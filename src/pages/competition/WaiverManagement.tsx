import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockWaivers = [
  { id: 1, name: "Health Waiver", status: "Active", required: true },
  { id: 2, name: "Liability Waiver", status: "Active", required: true },
  { id: 3, name: "Media Consent", status: "Inactive", required: false },
];

export default function WaiverManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Waiver management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Waiver Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage participant waivers</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Waiver
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Waiver Name</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Required</th>
              </tr>
            </thead>
            <tbody>
              {mockWaivers.map((w) => (
                <tr key={w.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{w.name}</td>
                  <td className="px-6 py-4">
                    <Badge className={w.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {w.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {w.required ? "Yes" : "No"}
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
