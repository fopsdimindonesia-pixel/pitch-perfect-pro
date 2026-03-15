import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Trash2 } from "lucide-react";

const initialRules = [
  { id: 1, rank: 1, rule: "Goal Difference", icon: "⚽" },
  { id: 2, rank: 2, rule: "Goals For", icon: "📊" },
  { id: 3, rank: 3, rule: "Head-to-Head Record", icon: "↔️" },
  { id: 4, rank: 4, rule: "Fair Play Points", icon: "✨" },
];

export default function TieBreakerRules() {
  const [rules, setRules] = useState(initialRules);

  return (
    <div className="space-y-6" role="main" aria-label="Tie breaker rules">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Tie Breaker Rules</h1>
        <p className="text-muted-foreground mt-1">Drag and drop to rank tie-breaker rules</p>
      </div>

      <Card className="p-6">
        <div className="space-y-2 mb-6">
          {rules.map((rule, idx) => (
            <div key={rule.id} className="flex items-center gap-3 p-3 rounded-lg border bg-white hover:bg-muted/50">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {idx + 1}
              </div>
              <span className="text-sm">{rule.icon}</span>
              <span className="font-medium flex-1">{rule.rule}</span>
              <Button variant="ghost" size="sm">
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>

        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Tie-Breaker Rule
        </Button>

        <div className="mt-6 pt-6 border-t">
          <Button>Save Tie-Breaker Rules</Button>
        </div>
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Rules are applied in order from top to bottom to determine final standings when teams have equal points.
        </p>
      </Card>
    </div>
  );
}
