import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetManagement() {
  const budget = [
    { category: "Player Salaries", allocated: 200000000, spent: 195000000, percentage: 97.5 },
    { category: "Operations", allocated: 80000000, spent: 72000000, percentage: 90 },
    { category: "Training & Facilities", allocated: 50000000, spent: 45000000, percentage: 90 },
    { category: "Equipment", allocated: 30000000, spent: 22000000, percentage: 73 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Budget management">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Budget Management</h1>
        <p className="text-muted-foreground mt-1">Annual budget allocation and tracking</p>
      </div>

      <div className="space-y-3">
        {budget.map((item, i) => (
          <Card key={i}>
            <CardContent className="pt-4 space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold">{item.category}</p>
                <span className="text-sm font-semibold">{item.percentage}%</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Rp {(item.spent/1000000).toFixed(0)}M / Rp {(item.allocated/1000000).toFixed(0)}M</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{width: `${item.percentage}%`}} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
