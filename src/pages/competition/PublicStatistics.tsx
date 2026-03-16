import { Card } from "@/components/ui/card";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const goalsData = [
  { team: "SSB Garuda", goals: 18 },
  { team: "FC Makassar", goals: 14 },
  { team: "Elite FC", goals: 12 },
  { team: "Youth Academy", goals: 10 },
  { team: "Training Center", goals: 9 },
];

const possessionData = [
  { team: "SSB Garuda", possession: 62 },
  { team: "FC Makassar", possession: 58 },
  { team: "Elite FC", possession: 55 },
  { team: "Youth Academy", possession: 52 },
];

export default function PublicStatistics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="text-muted-foreground mt-1">Competition statistics and insights</p>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Top Scorers</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={goalsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" fontSize={12} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="goals" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Possession %</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={possessionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" fontSize={12} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="possession" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
