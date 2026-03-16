import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContractStatus() {
  const contracts = [
    { player: "Rizky Pratama", expires: "2026-12-31", status: "2+ years", color: "bg-green-100 text-green-800" },
    { player: "Andi Kusuma", expires: "2025-06-30", status: "1-2 years", color: "bg-yellow-100 text-yellow-800" },
    { player: "Budi Santoso", expires: "2027-08-31", status: "2+ years", color: "bg-green-100 text-green-800" },
    { player: "Citra Wijaya", expires: "2024-12-31", status: "< 1 year", color: "bg-red-100 text-red-800" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Contract status">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Contract Status</h1>
        <p className="text-muted-foreground mt-1">Player contract expiration dates</p>
      </div>

      <div className="space-y-2">
        {contracts.map((c, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{c.player}</p>
                  <p className="text-sm text-muted-foreground">Expires: {c.expires}</p>
                </div>
                <Badge className={c.color}>{c.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
