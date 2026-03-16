import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FanFeedback() {
  const feedback = [
    { name: "Rudi S.", rating: 5, comment: "Great match experience!", category: "Match Day" },
    { name: "Siti M.", rating: 4, comment: "Good quality merchandise", category: "Merchandise" },
    { name: "Budi H.", rating: 5, comment: "Amazing team performance", category: "General" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Fan feedback">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Fan Feedback</h1>
        <p className="text-muted-foreground mt-1">Recent customer reviews</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-primary">4.7</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">124</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">89%</p>
              <p className="text-sm text-muted-foreground">Recommended</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {feedback.map((fb, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{fb.name}</p>
                  <p className="text-sm text-muted-foreground">{fb.category}</p>
                </div>
                <div className="text-right">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={j < fb.rating ? "text-gold text-lg" : "text-muted-foreground text-lg"}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm mt-2">{fb.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
