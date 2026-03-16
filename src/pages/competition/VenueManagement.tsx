import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockVenues = [
  { id: 1, name: "Stadion Utama", city: "Jakarta", capacity: 50000, status: "Active" },
  { id: 2, name: "Lapangan Internasional", city: "Bandung", capacity: 25000, status: "Active" },
  { id: 3, name: "Stadion Mini", city: "Surabaya", capacity: 10000, status: "Inactive" },
];

export default function VenueManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Venue management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Venue Management</h1>
          <p className="text-muted-foreground mt-1">Manage match venues and facilities</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Venue
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Venue</th>
                <th className="px-6 py-3 text-left font-semibold">City</th>
                <th className="px-6 py-3 text-left font-semibold">Capacity</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockVenues.map((v) => (
                <tr key={v.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{v.name}</td>
                  <td className="px-6 py-4">{v.city}</td>
                  <td className="px-6 py-4">{v.capacity.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge className={v.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {v.status}
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
