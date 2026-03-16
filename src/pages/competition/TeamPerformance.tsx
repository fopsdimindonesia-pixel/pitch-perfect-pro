import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const performanceData = [
  { team: "SSB Garuda", wins: 5, goals: 18, scored: 8, conceded: 3,  winRate: 83 },
  { team: "FC Makassar", wins: 4, goals: 14, scored: 7, conceded: 6, winRate: 67 },
  { team: "Elite FC", wins: 3, goals: 12, scored: 6, conceded: 5, winRate: 50 },
  { team: "Youth Academy", wins: 2, goals: 10, scored: 5, conceded: 7, winRate: 33 },
];

export default function TeamPerformance() {
  return (
    <div className="space-y-6" role="main" aria-label="Team performance">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Team Performance</h1>
        <p className="text-muted-foreground mt-1">Compare team statistics</p>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Win Rate Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="winRate" fill="#3b82f6" name="Win %" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Goals Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="scored" fill="#10b981" name="Goals Scored" />
            <Bar dataKey="conceded" fill="#ef4444" name="Goals Conceded" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
