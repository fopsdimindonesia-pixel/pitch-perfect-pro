import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RevenueStreams() {
  const revenues = [
    { source: "Ticket Sales", amount: 150000000, percentage: 33, status: "Active" },
    { source: "Broadcasting Rights", amount: 180000000, percentage: 40, status: "Active" },
    { source: "Sponsorships", amount: 100000000, percentage: 22, status: "Active" },
    { source: "Merchandise", amount: 30000000, percentage: 7, status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Revenue streams">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Revenue Streams</h1>
        <p className="text-muted-foreground mt-1">Income sources breakdown</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-end justify-between h-40">
            {revenues.map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-12 bg-gradient-to-t from-primary to-navy rounded" style={{height: `${r.percentage * 1.5}px`}} />
                <p className="text-xs font-semibold text-center">{r.source}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {revenues.map((item, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.source}</p>
                  <p className="text-sm text-muted-foreground">Rp {(item.amount/1000000).toFixed(0)}M</p>
                </div>
                <Badge>{item.percentage}%</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
