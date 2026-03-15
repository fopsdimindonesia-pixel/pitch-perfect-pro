import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin } from "lucide-react";

const mockRegistrations = [
  { id: 1, club: "SSB Garuda Muda", category: "U-16 Male", registeredDate: "2024-03-15", status: "Confirmed" },
  { id: 2, club: "FC Makassar", category: "U-14 Female", registeredDate: "2024-03-18", status: "Confirmed" },
  { id: 3, club: "Youth Academy", category: "U-12 Mixed", registeredDate: "2024-03-20", status: "Pending" },
  { id: 4, club: "Kalimantan FC", category: "U-18 Male", registeredDate: "2024-03-22", status: "Rejected" },
];

export default function ClubRegistration() {
  return (
    <div className="space-y-6" role="main" aria-label="Club registration">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Club Registration</h1>
        <p className="text-muted-foreground mt-1">Manage club registrations for this competition</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Total Registrations</p>
          <p className="text-2xl font-bold mt-2">24</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Confirmed</p>
          <p className="text-2xl font-bold text-green-600 mt-2">18</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">4</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Rejected</p>
          <p className="text-2xl font-bold text-red-600 mt-2">2</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input placeholder="Search club..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Clear Filters</Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Club</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Registration Date</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRegistrations.map((reg) => (
                <tr key={reg.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{reg.club}</td>
                  <td className="px-6 py-4">{reg.category}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {reg.registeredDate}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        reg.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : reg.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {reg.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
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
