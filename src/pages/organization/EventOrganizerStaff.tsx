import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockStaff = [
  { id: "1", name: "Budi Santoso", role: "Director", department: "Management", status: "Active" },
  { id: "2", name: "Citra Dewi", role: "Manager", department: "Operations", status: "Active" },
  { id: "3", name: "Doni Reza", role: "Coordinator", department: "Events", status: "On Leave" },
];

export default function EventOrganizerStaff() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">EO Staff Management</h1>
          <p className="text-muted-foreground mt-1">Manage event organizer staff</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Add Staff</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Role</th>
                <th className="text-left p-4 font-semibold">Department</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockStaff.map((staff) => (
                <tr key={staff.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{staff.name}</td>
                  <td className="p-4">{staff.role}</td>
                  <td className="p-4">{staff.department}</td>
                  <td className="p-4">
                    <Badge variant={staff.status === "Active" ? "default" : "secondary"}>
                      {staff.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="sm">Edit</Button>
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
