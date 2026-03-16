import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SquadPositions() {
  const formations = [
    { name: "4-3-3", formation: "GK 4 DEF 3 MID 3 FWD", active: true },
    { name: "4-2-3-1", formation: "GK 4 DEF 2 MID 3 MID 1 FWD", active: false },
    { name: "3-5-2", formation: "GK 3 DEF 5 MID 2 FWD", active: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Squad positions">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Squad Positions</h1>
        <p className="text-muted-foreground mt-1">Formation and positioning</p>
      </div>

      <div className="space-y-4">
        {formations.map((f, i) => (
          <Card key={i} className={f.active ? "border-primary border-2" : ""}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{f.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.formation}</p>
                </div>
                <div className="space-y-2">
                  {f.active && <Badge className="bg-primary">Active</Badge>}
                  <Button size="sm" variant="outline">Set</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
