import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InjuryTrends() {
  const injuries = [
    { type: "Muscle Strain", count: 5, recovery: 14 },
    { type: "Ankle Sprain", count: 3, recovery: 21 },
    { type: "Knee Injury", count: 2, recovery: 45 },
    { type: "Concussion", count: 1, recovery: 7 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Injury trends analysis">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Injury Trends</h1>
        <p className="text-muted-foreground mt-1">Health and injury analysis</p>
      </div>

      <div className="space-y-2">
        {injuries.map((inj, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{inj.type}</p>
                  <p className="text-sm text-muted-foreground">Avg recovery: {inj.recovery} days</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{inj.count}</p>
                  <p className="text-xs text-muted-foreground">cases</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
