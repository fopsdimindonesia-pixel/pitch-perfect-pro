import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const analyticsData = [
  { week: "Week 1", matches: 6, goals: 18, attendance: 340 },
  { week: "Week 2", matches: 6, goals: 14, attendance: 280 },
  { week: "Week 3", matches: 8, goals: 22, attendance: 420 },
  { week: "Week 4", matches: 5, goals: 12, attendance: 210 },
];

export default function CompetitionAnalytics() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition analytics">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed competition insights</p>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Weekly Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="matches" stroke="#3b82f6" name="Matches" />
            <Line type="monotone" dataKey="goals" stroke="#f59e0b" name="Goals" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Attendance Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attendance" fill="#10b981" name="Attendance" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
