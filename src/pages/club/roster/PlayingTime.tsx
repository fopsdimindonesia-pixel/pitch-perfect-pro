import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PlayingTime() {
  const players = [
    { name: "Rizky Pratama", minutes: 1850, appearances: 22, avgMinutes: 84 },
    { name: "Andi Kusuma", minutes: 1690, appearances: 20, avgMinutes: 85 },
    { name: "Budi Santoso", minutes: 1960, appearances: 23, avgMinutes: 85 },
    { name: "Citra Wijaya", minutes: 2070, appearances: 23, avgMinutes: 90 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Playing time statistics">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Playing Time</h1>
        <p className="text-muted-foreground mt-1">Player match statistics</p>
      </div>

      <div className="space-y-2">
        {players.map((p, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-semibold">{p.name}</p>
                  <Badge>{p.appearances} apps</Badge>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Minutes: {p.minutes}</span>
                  <span className="font-semibold">{p.avgMinutes} avg</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{width: `${(p.minutes/2100)*100}%`}} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
