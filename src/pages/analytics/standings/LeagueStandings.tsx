import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown } from 'lucide-react';

const mockStandings = [
  { id: 1, position: 1, team: 'Persija Jakarta', played: 22, wins: 16, draws: 4, losses: 2, gf: 52, ga: 18, gd: 34, points: 52, trend: 'up' },
  { id: 2, position: 2, team: 'Bali United', played: 22, wins: 15, draws: 3, losses: 4, gf: 48, ga: 22, gd: 26, points: 48, trend: 'up' },
  { id: 3, position: 3, team: 'PSM Makassar', played: 22, wins: 13, draws: 5, losses: 4, gf: 45, ga: 24, gd: 21, points: 44, trend: 'down' },
  { id: 4, position: 4, team: 'Madura United', played: 22, wins: 12, draws: 4, losses: 6, gf: 42, ga: 28, gd: 14, points: 40, trend: 'down' },
  { id: 5, position: 5, team: 'SSB Garuda Muda', played: 22, wins: 11, draws: 3, losses: 8, gf: 39, ga: 31, gd: 8, points: 36, trend: 'up' },
  { id: 6, position: 6, team: 'Arema Malang', played: 22, wins: 10, draws: 2, losses: 10, gf: 38, ga: 35, gd: 3, points: 32, trend: 'down' },
];

const stats = {
  totalTeams: 16,
  totalMatches: 176,
  totalGoals: 480,
  avgGoalsPerMatch: 2.73,
};

export default function LeagueStandings() {
  const [season, setSeason] = useState('2024');

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">League Standings</h1>
            <p className="text-muted-foreground mt-1">Current season league table and rankings</p>
          </div>
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="w-32" aria-label="Select season">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Overview Stats */}
      <section aria-label="League overview statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.totalTeams}</div>
            <p className="text-sm text-muted-foreground">Teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.totalMatches}</div>
            <p className="text-sm text-muted-foreground">Total Matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{stats.totalGoals}</div>
            <p className="text-sm text-muted-foreground">Goals Scored</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{stats.avgGoalsPerMatch}</div>
            <p className="text-sm text-muted-foreground">Avg Goals/Match</p>
          </CardContent>
        </Card>
      </section>

      {/* Standings Table */}
      <Card>
        <CardHeader>
          <CardTitle id="standings-table">League Table</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <caption className="sr-only">League standings table showing position, team name, matches played, wins, draws, losses, goals for, goals against, goal difference, and points</caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="w-12">Pos</TableHead>
                <TableHead scope="col">Team</TableHead>
                <TableHead scope="col" className="text-center">P</TableHead>
                <TableHead scope="col" className="text-center">W</TableHead>
                <TableHead scope="col" className="text-center">D</TableHead>
                <TableHead scope="col" className="text-center">L</TableHead>
                <TableHead scope="col" className="text-center">GF</TableHead>
                <TableHead scope="col" className="text-center">GA</TableHead>
                <TableHead scope="col" className="text-center">GD</TableHead>
                <TableHead scope="col" className="text-center">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStandings.map((team) => (
                <TableRow key={team.id} className={team.position <= 4 ? 'bg-green-50' : team.position >= 15 ? 'bg-red-50' : ''}>
                  <TableCell className="font-bold">{team.position}</TableCell>
                  <TableCell className="font-medium">{team.team}</TableCell>
                  <TableCell className="text-center text-sm">{team.played}</TableCell>
                  <TableCell className="text-center text-sm font-semibold text-green-600">{team.wins}</TableCell>
                  <TableCell className="text-center text-sm font-semibold text-blue-600">{team.draws}</TableCell>
                  <TableCell className="text-center text-sm font-semibold text-red-600">{team.losses}</TableCell>
                  <TableCell className="text-center text-sm">{team.gf}</TableCell>
                  <TableCell className="text-center text-sm">{team.ga}</TableCell>
                  <TableCell className={`text-center text-sm font-semibold ${team.gd > 0 ? 'text-green-600' : team.gd < 0 ? 'text-red-600' : ''}`}>
                    {team.gd > 0 ? '+' : ''}{team.gd}
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg">{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-8 bg-green-50 border border-green-200 rounded"></div>
              <span>Champions League (Top 4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-8 bg-blue-50 border border-blue-200 rounded"></div>
              <span>Regular Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-8 bg-red-50 border border-red-200 rounded"></div>
              <span>Relegation (Bottom 2)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
