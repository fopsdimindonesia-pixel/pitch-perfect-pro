import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { useMatch } from '../context/MatchContext';
import { MatchSwitcher } from '../components/MatchSwitcher';
import { LiveScoreHeader } from '../components/LiveScoreHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Player performance mock data (merged from PlayerRatings)
const playerPerformance = [
  { number: 9, name: 'Bambang Pamungkas', position: 'ST', rating: 8.5, minutes: 90, touches: 45, pass: 78, ga: '2/1' },
  { number: 10, name: 'Evan Dimas', position: 'LW', rating: 7.9, minutes: 90, touches: 52, pass: 82, ga: '0/1' },
  { number: 1, name: 'I Made Wirawan', position: 'GK', rating: 7.6, minutes: 90, touches: 28, pass: 45, ga: '0/0' },
  { number: 3, name: 'Toni Kusuma', position: 'CB', rating: 7.2, minutes: 90, touches: 89, pass: 88, ga: '0/0' },
  { number: 11, name: 'Ilija Spasojevic', position: 'CF', rating: 8.0, minutes: 87, touches: 41, pass: 72, ga: '1/1' },
  { number: 7, name: 'Saddil Ramdani', position: 'CM', rating: 7.4, minutes: 38, touches: 18, pass: 81, ga: '0/0' },
];

const getRatingColor = (rating: number) => {
  if (rating >= 8) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (rating >= 7.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
  if (rating >= 7) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
};

export default function MatchStatsDashboard() {
  const { activeMatch, events, homeRoster } = useMatch();

  const homeGoals = events.filter((e) => e.type === 'Goal' && e.team === 'home').length;
  const awayGoals = events.filter((e) => e.type === 'Goal' && e.team === 'away').length;
  const homeCards = events.filter((e) => (e.type === 'Yellow Card' || e.type === 'Red Card') && e.team === 'home').length;
  const awayCards = events.filter((e) => (e.type === 'Yellow Card' || e.type === 'Red Card') && e.team === 'away').length;

  const comparisonData = [
    { stat: 'Shots', home: 12, away: 7 },
    { stat: 'On Target', home: 6, away: 3 },
    { stat: 'Passes', home: 420, away: 310 },
    { stat: 'Fouls', home: 8 + homeCards, away: 6 + awayCards },
    { stat: 'Corners', home: 5, away: 2 },
    { stat: 'Offsides', home: 2, away: 3 },
  ];

  const avgRating = (playerPerformance.reduce((sum, p) => sum + p.rating, 0) / playerPerformance.length).toFixed(1);
  const topPlayer = playerPerformance.reduce((max, p) => p.rating > max.rating ? p : max);

  return (
    <div className="space-y-6" role="main" aria-label="Match analytics">
      <div>
        <h1 className="text-3xl font-bold">Match Analytics</h1>
        <p className="text-muted-foreground mt-1">Statistics overview and player performance</p>
      </div>

      <MatchSwitcher />

      {!activeMatch ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih pertandingan</Card>
      ) : (
        <>
          <LiveScoreHeader />

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="players">Player Performance</TabsTrigger>
            </TabsList>

            {/* === OVERVIEW TAB === */}
            <TabsContent value="overview" className="space-y-4 mt-4">
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
            </TabsContent>

            {/* === PLAYER PERFORMANCE TAB === */}
            <TabsContent value="players" className="space-y-4 mt-4">
              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <div className="p-6">
                    <div className="text-2xl font-bold text-primary">{avgRating}</div>
                    <p className="text-sm text-muted-foreground">Rata-rata Rating</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <div className="text-2xl font-bold text-primary">{topPlayer.name.split(' ')[0]}</div>
                    <p className="text-sm text-muted-foreground">Top Performer: {topPlayer.rating}</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <div className="text-2xl font-bold">{playerPerformance.length}</div>
                    <p className="text-sm text-muted-foreground">Jumlah Pemain</p>
                  </div>
                </Card>
              </div>

              {/* Ratings table */}
              <Card>
                <div className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>#</TableHead>
                          <TableHead>Pemain</TableHead>
                          <TableHead>Posisi</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Menit</TableHead>
                          <TableHead>Sentuhan</TableHead>
                          <TableHead>Pass %</TableHead>
                          <TableHead>G/A</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerPerformance.map(p => (
                          <TableRow key={p.number} className="hover:bg-muted/50">
                            <TableCell className="font-bold">{p.number}</TableCell>
                            <TableCell className="font-medium">{p.name}</TableCell>
                            <TableCell>{p.position}</TableCell>
                            <TableCell>
                              <Badge className={getRatingColor(p.rating)}>
                                <Star className="w-3 h-3 mr-1 fill-current" />{p.rating}
                              </Badge>
                            </TableCell>
                            <TableCell>{p.minutes}'</TableCell>
                            <TableCell>{p.touches}</TableCell>
                            <TableCell>{p.pass}%</TableCell>
                            <TableCell className="font-semibold">{p.ga}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
