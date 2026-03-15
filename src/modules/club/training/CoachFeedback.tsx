import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CoachFeedback() {
  const feedback = [
    { player: "Rizky Pratama", date: "2024-03-20", rating: 8, focus: "Ball Control" },
    { player: "Andi Kusuma", date: "2024-03-20", rating: 7, focus: "Positioning" },
    { player: "Budi Santoso", date: "2024-03-20", rating: 9, focus: "Finishing" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Coach feedback">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Coach Feedback</h1>
        <p className="text-muted-foreground mt-1">Player performance notes</p>
      </div>

      <div className="space-y-3">
        {feedback.map((f, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{f.player}</p>
                  <p className="text-sm text-muted-foreground">{f.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold mb-1">Focus: {f.focus}</p>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < f.rating ? "bg-primary" : "bg-muted"}`} />
                      ))}
                    </div>
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
