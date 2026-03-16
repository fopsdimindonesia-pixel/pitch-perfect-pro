import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockChairs = [
  {
    id: 1,
    name: "Chairperson 1",
    role: "Chief Organizer",
    status: "Active",
  },
  {
    id: 2,
    name: "Chairperson 2",
    role: "Vice Organizer",
    status: "Active",
  },
];

export default function OrganizationHierarchy() {
  return (
    <div className="space-y-6" role="main" aria-label="Organization hierarchy">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Organization Hierarchy</h1>
          <p className="text-muted-foreground mt-1">Manage competition leadership structure</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Position
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <div className="space-y-4">
            {mockChairs.map((chair) => (
              <div
                key={chair.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{chair.name}</p>
                  <p className="text-sm text-muted-foreground">{chair.role}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">{chair.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
