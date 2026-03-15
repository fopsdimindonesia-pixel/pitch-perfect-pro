import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MatchAnalysis() {
  const matches = [
    { date: "2024-03-10", opponent: "FC Jakarta", score: "2-1", possession: 52, shots: 15 },
    { date: "2024-03-03", opponent: "Bandung United", score: "1-1", possession: 48, shots: 12 },
    { date: "2024-02-25", opponent: "Surabaya FC", score: "3-0", possession: 60, shots: 18 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Match analysis">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Match Analysis</h1>
        <p className="text-muted-foreground mt-1">Detailed match statistics</p>
      </div>

      <div className="space-y-3">
        {matches.map((match, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{match.date}</p>
                    <p className="font-semibold">{match.opponent}</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">{match.score}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Possession</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-primary" style={{width: `${match.possession}%`}} />
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Shots</p>
                    <p className="font-semibold">{match.shots}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
