import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";

export default function ScoringSystem() {
  return (
    <div className="space-y-6" role="main" aria-label="Scoring system">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Scoring System</h1>
          <p className="text-muted-foreground mt-1">Configure scoring rules and point system</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Match Scoring</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Points for Win</label>
              <Input type="number" defaultValue={3} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Points for Draw</label>
              <Input type="number" defaultValue={1} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Points for Loss</label>
              <Input type="number" defaultValue={0} className="w-full" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Goal Scoring</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Points per Goal</label>
              <Input type="number" defaultValue={1} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Points for Own Goal (Penalty)</label>
              <Input type="number" defaultValue={-1} className="w-full" />
            </div>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Advanced Settings</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>Bonus for Clean Sheet</span>
              <Input type="number" defaultValue={1} className="w-20" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>Penalty for Cards (Yellow)</span>
              <Input type="number" defaultValue={-0.5} className="w-20" />
            </div>
          </div>
        </Card>
      </div>

      <Button size="lg" className="gap-2">
        <Settings className="w-4 h-4" />
        Save Scoring Configuration
      </Button>
    </div>
  );
}
