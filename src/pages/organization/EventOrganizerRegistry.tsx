import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEOs } from "@/lib/mockData";

export default function EventOrganizerRegistry() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Event Organizer Registry</h1>
          <p className="text-muted-foreground mt-1">Manage all event organizers</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Register EO</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total EOs</p>
          <p className="text-3xl font-bold mt-2">5</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Verified EOs</p>
          <p className="text-3xl font-bold mt-2">4</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending EOs</p>
          <p className="text-3xl font-bold mt-2">1</p>
        </Card>
      </div>

      {/* EOs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">EO Name</th>
                <th className="text-left p-4 font-semibold">Events Hosted</th>
                <th className="text-left p-4 font-semibold">Location</th>
                <th className="text-left p-4 font-semibold">Verification</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockEOs.map((eo) => (
                <tr key={eo.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{eo.name}</td>
                  <td className="p-4">{eo.competitions}</td>
                  <td className="p-4">Various</td>
                  <td className="p-4">
                    <Badge variant="outline">Verified</Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={eo.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {eo.status}
                    </Badge>
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
