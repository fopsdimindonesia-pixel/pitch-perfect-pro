import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TalentDevelopment() {
  const playerData = [
    { name: "Rizky", age: 12, score: 72, potential: 85, category: "High Potential" },
    { name: "Andi", age: 13, score: 68, potential: 78, category: "Developing" },
    { name: "Budi", age: 11, score: 75, potential: 90, category: "Top Talent" },
    { name: "Citra", age: 12, score: 62, potential: 70, category: "Developing" },
  ];

  const progressData = [
    { week: "W1", avg: 60 },
    { week: "W2", avg: 62 },
    { week: "W3", avg: 65 },
    { week: "W4", avg: 68 },
    { week: "W5", avg: 70 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Talent development">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Talent Development</h1>
        <p className="text-muted-foreground mt-1">Track player progression and potential</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {playerData.map((player, i) => (
          <Card key={i}>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{player.name}</h3>
                <Badge className={player.category === "Top Talent" ? "bg-gold text-navy" : "bg-primary text-white"}>
                  {player.category}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-semibold">{player.age}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current</p>
                  <p className="font-semibold">{player.score}/100</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Potential</p>
                  <p className="font-semibold">{player.potential}/100</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Current Level</span>
                  <span>{player.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{width: `${player.score}%`}} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={2} name="Average Score" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
