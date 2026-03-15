import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PayrollManagement() {
  const payroll = [
    { name: "Senior Squad", count: 25, avgSalary: 8000000, total: 200000000 },
    { name: "Coaching Staff", count: 8, avgSalary: 3000000, total: 24000000 },
    { name: "Medical Staff", count: 3, avgSalary: 2000000, total: 6000000 },
    { name: "Administrative", count: 10, avgSalary: 1500000, total: 15000000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Payroll management">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Payroll Management</h1>
        <p className="text-muted-foreground mt-1">Staff salary and compensation</p>
      </div>

      <div className="space-y-2">
        {payroll.map((item, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Staff Count</p>
                  <p className="font-semibold">{item.count}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Salary</p>
                  <p className="font-semibold">Rp {(item.avgSalary/1000000).toFixed(0)}M</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Monthly</p>
                  <p className="font-semibold">Rp {(item.total/1000000).toFixed(0)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
