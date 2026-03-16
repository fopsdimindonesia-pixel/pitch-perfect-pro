import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function PlayerPromotion() {
  const promotions = [
    { id: 1, player: "Rizky Pratama", from: "U12", to: "U14", date: "2024-03-01", status: "Completed", potential: "High" },
    { id: 2, player: "Andi Kusuma", from: "U14", to: "U16", date: "2024-02-15", status: "Completed", potential: "Very High" },
    { id: 3, player: "Budi Santoso", from: "U16", to: "U18", date: "2024-02-01", status: "Completed", potential: "Elite" },
    { id: 4, player: "Citra Wijaya", from: "U12", to: "U14", date: "2024-03-15", status: "Pending", potential: "High" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player promotion">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Player Promotion</h1>
        <p className="text-muted-foreground mt-1">Track youth player advancements</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold text-green-600">{promotions.filter(p => p.status === "Completed").length}</p>
            <p className="text-sm text-muted-foreground">Promoted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold text-yellow-600">{promotions.filter(p => p.status === "Pending").length}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold text-gold">{promotions.filter(p => p.potential === "Elite").length}</p>
            <p className="text-sm text-muted-foreground">Elite Talent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold text-primary">{promotions.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {promotions.map(promo => (
          <Card key={promo.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold">{promo.player}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{promo.from}</Badge>
                    <ArrowUp className="w-4 h-4 text-green-600" />
                    <Badge variant="outline">{promo.to}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{promo.date}</p>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={promo.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {promo.status}
                  </Badge>
                  <Badge className="bg-primary text-white block">{promo.potential}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Criteria</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>✓ Minimum 2 years in current category</p>
          <p>✓ Skills assessment passed</p>
          <p>✓ Coach recommendation</p>
          <p>✓ Physical development appropriate</p>
        </CardContent>
      </Card>
    </div>
  );
}
