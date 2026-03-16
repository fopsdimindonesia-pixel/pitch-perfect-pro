import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMatch } from '../context/MatchContext';
import { MatchSwitcher } from '../components/MatchSwitcher';
import { LiveScoreHeader } from '../components/LiveScoreHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted-foreground))'];

export default function MatchStatsDashboard() {
  const { activeMatch, events, homeRoster, awayRoster } = useMatch();

  const homeGoals = events.filter((e) => e.type === 'Goal' && e.team === 'home').length;
  const awayGoals = events.filter((e) => e.type === 'Goal' && e.team === 'away').length;
  const homeCards = events.filter((e) => (e.type === 'Yellow Card' || e.type === 'Red Card') && e.team === 'home').length;
  const awayCards = events.filter((e) => (e.type === 'Yellow Card' || e.type === 'Red Card') && e.team === 'away').length;

  // Mock stats derived from match
  const comparisonData = [
    { stat: 'Shots', home: 12, away: 7 },
    { stat: 'On Target', home: 6, away: 3 },
    { stat: 'Passes', home: 420, away: 310 },
    { stat: 'Fouls', home: 8 + homeCards, away: 6 + awayCards },
    { stat: 'Corners', home: 5, away: 2 },
    { stat: 'Offsides', home: 2, away: 3 },
  ];

  const possessionData = [
    { name: activeMatch?.homeTeam ?? 'Home', value: 58 },
    { name: activeMatch?.awayTeam ?? 'Away', value: 42 },
  ];

  // Top performers from roster
  const topPerformers = homeRoster
    .slice(0, 5)
    .map((p, i) => ({
      name: p.name,
      rating: (8.5 - i * 0.3).toFixed(1),
      goals: Math.max(0, homeGoals - i),
      assists: Math.max(0, 2 - i),
    }));

  return (
    <div className="space-y-6" role="main" aria-label="Match statistics dashboard">
      <div>
        <h1 className="text-3xl font-bold">Match Statistics</h1>
        <p className="text-muted-foreground mt-1">Comprehensive match analytics and performance data</p>
      </div>

      <MatchSwitcher />

      {!activeMatch ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih pertandingan</Card>
      ) : (
        <>
          <LiveScoreHeader />

          {/* Possession */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Possession</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>{activeMatch.homeTeam}</span>
                  <span>58%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '58%' }} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>{activeMatch.awayTeam}</span>
                  <span>42%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-muted-foreground/40 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Comparison */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Match Comparison</h2>
            <div className="space-y-3">
              {comparisonData.map((stat) => {
                const total = stat.home + stat.away;
                const homePercent = total > 0 ? (stat.home / total) * 100 : 50;
                return (
                  <div key={stat.stat}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium tabular-nums w-12 text-right">{stat.home}</span>
                      <span className="text-muted-foreground text-xs">{stat.stat}</span>
                      <span className="font-medium tabular-nums w-12">{stat.away}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                      <div className="bg-primary rounded-l-full" style={{ width: `${homePercent}%` }} />
                      <div className="bg-muted-foreground/30 rounded-r-full flex-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Goals by Half Chart */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Goals by Period</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { period: '1st Half', home: Math.max(1, homeGoals - 1), away: awayGoals > 0 ? 1 : 0 },
                { period: '2nd Half', home: Math.max(0, homeGoals > 1 ? 1 : 0), away: Math.max(0, awayGoals > 1 ? awayGoals - 1 : 0) },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="home" fill="hsl(var(--primary))" name={activeMatch.homeTeam} />
                <Bar dataKey="away" fill="hsl(var(--muted-foreground))" name={activeMatch.awayTeam} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Performers */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Top Performers</h2>
            <div className="space-y-2">
              {topPerformers.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.goals}G · {p.assists}A</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary font-mono">⭐ {p.rating}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
