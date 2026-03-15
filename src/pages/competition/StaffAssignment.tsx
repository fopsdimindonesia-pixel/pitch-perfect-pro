import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";

const mockStaff = [
  { id: 1, name: "Budi Hartono", role: "Chief Referee", status: "Active" },
  { id: 2, name: "Siti Aminah", role: "Medical Staff", status: "Active" },
  { id: 3, name: "Ahmad Setiawan", role: "Technical Director", status: "Active" },
  { id: 4, name: "Doni Priyanto", role: "Logistics Manager", status: "Inactive" },
];

export default function StaffAssignment() {
  return (
    <div className="space-y-6" role="main" aria-label="Staff assignment">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Staff Assignment</h1>
          <p className="text-muted-foreground mt-1">Manage competition staff</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Role</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockStaff.map((staff) => (
                <tr key={staff.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{staff.name}</td>
                  <td className="px-6 py-4">{staff.role}</td>
                  <td className="px-6 py-4">
                    <Badge className={staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {staff.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
    </div>
  );
}
