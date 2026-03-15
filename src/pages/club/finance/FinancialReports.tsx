import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancialReports() {
  const reports = [
    { name: "Annual Report 2023", date: "2024-01-15", type: "Full Year", status: "Published" },
    { name: "Q1 2024 Report", date: "2024-03-31", type: "Quarterly", status: "Pending" },
    { name: "Monthly Summary March", date: "2024-03-31", type: "Monthly", status: "Draft" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Financial reports">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Financial Reports</h1>
        <p className="text-muted-foreground mt-1">Financial statements and analysis</p>
      </div>

      <div className="space-y-2">
        {reports.map((r, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.date} • {r.type}</p>
                </div>
                <div className={`px-3 py-1 rounded text-sm font-semibold ${r.status === "Published" ? "bg-green-100 text-green-800" : r.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}>
                  {r.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
