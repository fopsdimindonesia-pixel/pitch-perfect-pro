import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";

const mockDisciplineRules = [
  { id: 1, violation: "Yellow Card", penalty: "Caution", suspension: "None", active: true },
  { id: 2, violation: "Red Card", penalty: "Dismissal", suspension: "1 Match", active: true },
  { id: 3, violation: "3x Yellow Cards", penalty: "Automatic Suspension", suspension: "1 Match", active: true },
  { id: 4, violation: "Violent Conduct", penalty: "Red Card", suspension: "3 Matches Min", active: true },
  { id: 5, violation: "Abusive Language", penalty: "Fine + Ban", suspension: "1 Match", active: true },
  { id: 6, violation: "Unsporting Conduct", penalty: "Yellow Card", suspension: "None", active: true },
];

export default function DisciplineRules() {
  return (
    <div className="space-y-6" role="main" aria-label="Discipline rules">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Discipline Rules</h1>
          <p className="text-muted-foreground mt-1">Manage violations and penalties</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Rule
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Violation</th>
                <th className="px-6 py-3 text-left font-semibold">Penalty</th>
                <th className="px-6 py-3 text-left font-semibold">Suspension</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDisciplineRules.map((rule) => (
                <tr key={rule.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{rule.violation}</td>
                  <td className="px-6 py-4">{rule.penalty}</td>
                  <td className="px-6 py-4">{rule.suspension}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
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
