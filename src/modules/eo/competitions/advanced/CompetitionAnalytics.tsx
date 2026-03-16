import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";
import { useMemo } from "react";

export default function CompetitionAnalytics() {
  const { activeCompetition, matches } = useCompetition();

  const analyticsData = useMemo(() => {
    if (matches.length === 0) return [];
    const byMatchday = matches.reduce<Record<number, { matches: number; goals: number }>>((acc, m) => {
      const md = m.matchday;
      if (!acc[md]) acc[md] = { matches: 0, goals: 0 };
      acc[md].matches += 1;
      acc[md].goals += m.homeScore + m.awayScore;
      return acc;
    }, {});
    return Object.entries(byMatchday).map(([md, data]) => ({
      week: `Matchday ${md}`,
      matches: data.matches,
      goals: data.goals,
    }));
  }, [matches]);

  return (
    <div className="space-y-6" role="main" aria-label="Competition analytics">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed competition insights</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : analyticsData.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">Belum ada data pertandingan untuk dianalisis</Card>
      ) : (
        <>
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Matches & Goals per Matchday</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="matches" stroke="hsl(var(--primary))" name="Matches" />
                <Line type="monotone" dataKey="goals" stroke="hsl(var(--accent-foreground))" name="Goals" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Goals Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="goals" fill="hsl(var(--primary))" name="Goals" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  );
}
