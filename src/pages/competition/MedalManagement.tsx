import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Medal } from "lucide-react";

export default function MedalManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Medal management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Medal Management</h1>
          <p className="text-muted-foreground mt-1">Configure medals for awards</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Medal
        </Button>
      </div>

      <div className="space-y-3">
        {['Gold', 'Silver', 'Bronze'].map((medal, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Medal className={`w-8 h-8 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-orange-700'}`} />
                <div>
                  <h3 className="font-semibold">{medal} Medal</h3>
                  <p className="text-xs text-muted-foreground">For {['1st Place', '2nd Place', '3rd Place'][i]}</p>
                </div>
              </div>
              <Badge>{['1st', '2nd', '3rd'][i]} Place</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
