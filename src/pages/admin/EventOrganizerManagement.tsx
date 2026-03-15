import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const mockEOs = [
  { id: 1, name: "PSSI Makassar", location: "Makassar", hosted: 8, verification: "Verified", competitions: 5 },
  { id: 2, name: "Jakarta Premier", location: "Jakarta", hosted: 12, verification: "Verified", competitions: 8 },
  { id: 3, name: "Surabaya Cup", location: "Surabaya", hosted: 5, verification: "Pending", competitions: 3 },
  { id: 4, name: "Bandung Youth", location: "Bandung", hosted: 6, verification: "Verified", competitions: 4 },
  { id: 5, name: "Medan Sports", location: "Medan", hosted: 3, verification: "Pending", competitions: 2 },
];

export default function EventOrganizerManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">EO Management</h1>
          <p className="text-muted-foreground mt-1">Manage event organizers</p>
        </div>
      </div>

      {/* EOs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">EO Name</th>
                <th className="text-left p-4 font-semibold">Location</th>
                <th className="text-left p-4 font-semibold">Events Hosted</th>
                <th className="text-left p-4 font-semibold">Verification Status</th>
                <th className="text-left p-4 font-semibold">Active Competitions</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEOs.map((eo) => (
                <tr key={eo.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{eo.name}</td>
                  <td className="p-4 text-sm">{eo.location}</td>
                  <td className="p-4">{eo.hosted}</td>
                  <td className="p-4">
                    <Badge className={eo.verification === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {eo.verification}
                    </Badge>
                  </td>
                  <td className="p-4">{eo.competitions}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="sm" className="text-xs">View</Button>
                      <Button variant="ghost" size="sm" className="text-xs">Suspend</Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
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
