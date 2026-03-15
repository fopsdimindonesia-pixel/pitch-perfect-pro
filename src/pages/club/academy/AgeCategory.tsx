import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AgeCategory() {
  const categories = [
    { id: 1, name: "U8", ageRange: "7-8 years", players: 18, status: "Active", color: "bg-blue-100 text-blue-800" },
    { id: 2, name: "U10", ageRange: "9-10 years", players: 22, status: "Active", color: "bg-green-100 text-green-800" },
    { id: 3, name: "U12", ageRange: "11-12 years", players: 25, status: "Active", color: "bg-purple-100 text-purple-800" },
    { id: 4, name: "U14", ageRange: "13-14 years", players: 20, status: "Active", color: "bg-orange-100 text-orange-800" },
    { id: 5, name: "U16", ageRange: "15-16 years", players: 18, status: "Active", color: "bg-red-100 text-red-800" },
    { id: 6, name: "U18", ageRange: "17-18 years", players: 15, status: "Active", color: "bg-indigo-100 text-indigo-800" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Age categories">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Age Categories</h1>
          <p className="text-muted-foreground mt-1">Academy age group management</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Card key={cat.id}>
            <CardContent className="pt-6 space-y-3">
              <Badge className={cat.color}>{cat.name}</Badge>
              <div>
                <p className="text-sm text-muted-foreground">{cat.ageRange}</p>
                <p className="text-2xl font-bold mt-2">{cat.players}</p>
                <p className="text-xs text-muted-foreground">Players</p>
              </div>
              <Button size="sm" variant="outline" className="w-full">Manage</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-semibold">{cat.name} ({cat.ageRange})</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">{cat.players} players</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{width: `${(cat.players/25)*100}%`}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
