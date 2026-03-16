import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Plus, Trash2 } from "lucide-react";

const mockGroups = [
  { id: 1, name: "Group A", teams: 4, teams_list: ["SSB Garuda Muda", "FC Makassar", "Youth Academy", "Training Center"] },
  { id: 2, name: "Group B", teams: 4, teams_list: ["Elite FC", "Star Academy", "Premier Club", "Rising Stars"] },
  { id: 3, name: "Group C", teams: 3, teams_list: ["Kalimantan FC", "Sumatera United", "Java Alliance"] },
];

export default function GroupAllocation() {
  return (
    <div className="space-y-6" role="main" aria-label="Group allocation">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Group Allocation</h1>
        <p className="text-muted-foreground mt-1">Drag and drop teams into groups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockGroups.map((group) => (
          <Card key={group.id} className="p-4">
            <h3 className="font-semibold mb-3">{group.name}</h3>
            <div className="space-y-2 mb-4 min-h-32">
              {group.teams_list.map((team, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded hover:bg-muted/80 cursor-grab">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm flex-1">{team}</span>
                </div>
              ))}
            </div>
            <Badge variant="outline">{group.teams} teams</Badge>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">Drag teams between groups to reorganize allocations</p>
      </Card>

      <div className="flex gap-2">
        <Button>Save Allocation</Button>
        <Button variant="outline">Reset</Button>
      </div>
    </div>
  );
}
