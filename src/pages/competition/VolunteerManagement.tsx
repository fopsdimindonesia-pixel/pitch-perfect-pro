import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockVolunteers = [
  { id: 1, name: "Rani Kusuma", role: "Ball Boy", status: "Active" },
  { id: 2, name: "Dafa Ramadhan", role: "Score Keeper", status: "Active" },
  { id: 3, name: "Lisa Handoko", role: "Medical Assist", status: "Active" },
];

export default function VolunteerManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Volunteer management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Volunteer Management</h1>
          <p className="text-muted-foreground mt-1">Manage competition volunteers</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Volunteer
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
              </tr>
            </thead>
            <tbody>
              {mockVolunteers.map((v) => (
                <tr key={v.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{v.name}</td>
                  <td className="px-6 py-4">{v.role}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-800">{v.status}</Badge>
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
