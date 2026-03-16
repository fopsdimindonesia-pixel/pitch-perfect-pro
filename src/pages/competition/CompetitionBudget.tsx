import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Eye } from "lucide-react";

export default function CompetitionBudget() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Competition Budget</h1>
          <p className="text-muted-foreground mt-1">Manage competition financial budget</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Budget Item
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Budget</p>
          <p className="text-3xl font-bold mt-2">$50,000</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Spent</p>
          <p className="text-3xl font-bold mt-2">$32,500</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Remaining</p>
          <p className="text-3xl font-bold mt-2 text-green-600">$17,500</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Budget Breakdown</h2>
        <div className="space-y-4">
          {[
            { item: "Venue Rental", amount: 10000, spent: 10000 },
            { item: "Referee Fees", amount: 8000, spent: 6500 },
            { item: "Equipment", amount: 12000, spent: 12000 },
            { item: "Marketing", amount: 5000, spent: 4000 },
            { item: "Staff", amount: 15000, spent: 0 },
          ].map((budgetItem, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{budgetItem.item}</p>
                <p className="text-sm text-muted-foreground">
                  ${budgetItem.spent.toLocaleString()} of ${budgetItem.amount.toLocaleString()}
                </p>
              </div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(budgetItem.spent / budgetItem.amount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Button size="lg" className="gap-2">
        <Eye className="w-4 h-4" />
        View Detailed Report
      </Button>
    </div>
  );
}
