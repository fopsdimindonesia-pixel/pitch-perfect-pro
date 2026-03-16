import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Shield, Zap } from 'lucide-react';

const performanceData = [
  { week: 'W1', matches: 2, wins: 2, draws: 0, losses: 0, gf: 6, ga: 1 },
  { week: 'W2', matches: 2, wins: 1, draws: 1, losses: 0, gf: 4, ga: 2 },
  { week: 'W3', matches: 2, wins: 1, draws: 0, losses: 1, gf: 3, ga: 2 },
  { week: 'W4', matches: 2, wins: 2, draws: 0, losses: 0, gf: 5, ga: 1 },
  { week: 'W5', matches: 2, wins: 1, draws: 1, losses: 0, gf: 4, ga: 3 },
];

const teamStats = {
  team: 'SSB Garuda Muda',
  season: '2024',
  matches: 22,
  wins: 11,
  draws: 3,
  losses: 8,
  winPercentage: 50,
  goalsFor: 39,
  goalsAgainst: 31,
  goalDifference: 8,
  points: 36,
  averageGoals: 1.77,
  averageAgainst: 1.41,
};

export default function TeamPerformanceOverview() {
  const [selectedTeam, setSelectedTeam] = useState('SSB Garuda Muda');

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Performance Overview</h1>
            <p className="text-muted-foreground mt-1">{selectedTeam} - {teamStats.season} Season</p>
          </div>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-40" aria-label="Select team">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SSB Garuda Muda">SSB Garuda Muda</SelectItem>
              <SelectItem value="Persija Jakarta">Persija Jakarta</SelectItem>
              <SelectItem value="Bali United">Bali United</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Key Metrics */}
      <section aria-label="Team key performance metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamStats.matches}</p>
                <p className="text-xs text-muted-foreground">Matches Played</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamStats.winPercentage}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamStats.points}</p>
                <p className="text-xs text-muted-foreground">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamStats.goalDifference > 0 ? '+' : ''}{teamStats.goalDifference}</p>
                <p className="text-xs text-muted-foreground">Goal Difference</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Team statistics">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Wins / Draws / Losses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Wins</span>
                <Badge className="bg-green-100 text-green-800">{teamStats.wins}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Draws</span>
                <Badge className="bg-blue-100 text-blue-800">{teamStats.draws}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Losses</span>
                <Badge className="bg-red-100 text-red-800">{teamStats.losses}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Offensive Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Goals Scored</span>
                <span className="font-bold text-green-600">{teamStats.goalsFor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg/Match</span>
                <span className="font-bold">{teamStats.averageGoals}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Defensive Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Goals Conceded</span>
                <span className="font-bold text-red-600">{teamStats.goalsAgainst}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg/Match</span>
                <span className="font-bold">{teamStats.averageAgainst}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle id="performance-trend">Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gf" stroke="#22c55e" name="Goals Scored" />
                <Line type="monotone" dataKey="ga" stroke="#ef4444" name="Goals Against" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Matches */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceData.map((week) => (
              <div key={week.week} className="border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{week.week}</span>
                  <div className="flex gap-1">
                    <Badge className="bg-green-100 text-green-800" variant="outline">{week.wins}W</Badge>
                    <Badge className="bg-blue-100 text-blue-800" variant="outline">{week.draws}D</Badge>
                    <Badge className="bg-red-100 text-red-800" variant="outline">{week.losses}L</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{week.gf} goals scored • {week.ga} goals conceded</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
