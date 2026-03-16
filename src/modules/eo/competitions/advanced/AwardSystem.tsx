import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Plus } from "lucide-react";

const mockAwards = [
  { id: 1, name: "Best Player Award", category: "U-16 Male", winner: "Pending", status: "Active" },
  { id: 2, name: "Top Scorer", category: "U-16 Female", winner: "Sarah Putri (12 goals)", status: "Completed" },
  { id: 3, name: "Fair Play Award", category: "Overall", winner: "Pending", status: "Active" },
];

export default function AwardSystem() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Award System</h1>
          <p className="text-muted-foreground mt-1">Manage competition awards</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Award
        </Button>
      </div>

      <div className="space-y-3">
        {mockAwards.map((award) => (
          <Card key={award.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Trophy className={`w-6 h-6 ${award.status === 'Completed' ? 'text-yellow-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <h3 className="font-medium">{award.name}</h3>
                  <p className="text-sm text-muted-foreground">{award.category}</p>
                  <p className="text-sm mt-1">{award.winner}</p>
                </div>
              </div>
              <Badge className={award.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {award.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
