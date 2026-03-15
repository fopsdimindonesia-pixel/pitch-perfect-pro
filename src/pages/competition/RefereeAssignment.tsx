import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockReferees = [
  { id: 1, name: "John Doe", license: "REF001", status: "Active", experience: "10 years" },
  { id: 2, name: "Jane Smith", license: "REF002", status: "Active", experience: "8 years" },
  { id: 3, name: "Mike Johnson", license: "REF003", status: "Inactive", experience: "5 years" },
];

export default function RefereeAssignment() {
  return (
    <div className="space-y-6" role="main" aria-label="Referee assignment">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Referee Assignment</h1>
          <p className="text-muted-foreground mt-1">Manage and assign referees to matches</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Assign Referee
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">License</th>
                <th className="px-6 py-3 text-left font-semibold">Experience</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockReferees.map((r) => (
                <tr key={r.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{r.name}</td>
                  <td className="px-6 py-4">{r.license}</td>
                  <td className="px-6 py-4">{r.experience}</td>
                  <td className="px-6 py-4">
                    <Badge className={r.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {r.status}
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
