import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompetitionStatistics() {
  const competitions = [
    { name: "League", played: 13, won: 8, drawn: 3, lost: 2, points: 27 },
    { name: "Cup", played: 4, won: 3, drawn: 0, lost: 1, points: 9 },
    { name: "Super Cup", played: 1, won: 1, drawn: 0, lost: 0, points: 3 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Competition statistics">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Statistics</h1>
        <p className="text-muted-foreground mt-1">Performance across competitions</p>
      </div>

      <div className="space-y-3">
        {competitions.map((comp, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="grid grid-cols-6 gap-3">
                <div>
                  <p className="font-semibold">{comp.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">P</p>
                  <p className="font-bold">{comp.played}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">W</p>
                  <p className="font-bold text-green-600">{comp.won}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">D</p>
                  <p className="font-bold text-gray-600">{comp.drawn}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">L</p>
                  <p className="font-bold text-red-600">{comp.lost}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pts</p>
                  <p className="font-bold text-primary">{comp.points}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
