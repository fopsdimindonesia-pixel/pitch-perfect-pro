import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function PerformanceAnalytics() {
  const matchData = [
    { round: "R1", goals: 2, assists: 1, shots: 8 },
    { round: "R2", goals: 3, assists: 2, shots: 12 },
    { round: "R3", goals: 1, assists: 1, shots: 7 },
    { round: "R4", goals: 4, assists: 3, shots: 15 },
  ];

  const stats = [
    { category: "Wins", value: 8, color: "hsl(var(--primary))" },
    { category: "Draws", value: 3, color: "hsl(var(--muted-foreground))" },
    { category: "Losses", value: 2, color: "hsl(var(--destructive))" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Performance analytics">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed performance metrics</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold text-primary">25</p>
            <p className="text-sm text-muted-foreground">Goals This Season</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold text-gold">15</p>
            <p className="text-sm text-muted-foreground">Assists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold text-green-600">8</p>
            <p className="text-sm text-muted-foreground">Wins</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Goals & Assists Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={matchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="goals" stroke="hsl(var(--primary))" name="Goals" />
              <Line type="monotone" dataKey="assists" stroke="hsl(var(--gold))" name="Assists" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Match Results Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stats} cx="50%" cy="50%" labelLine={false} label={({category, value}) => `${category} ${value}`} outerRadius={80}>
                {stats.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
