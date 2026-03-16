import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';

const stats = [
  { name: 'Shots', home: 14, away: 9 },
  { name: 'Shots on Target', home: 8, away: 3 },
  { name: 'Passes', home: 487, away: 321 },
  { name: 'Pass Accuracy', home: '82%', away: '76%' },
  { name: 'Tackles', home: 23, away: 28 },
  { name: 'Fouls', home: 8, away: 12 },
  { name: 'Corners', home: 6, away: 3 },
  { name: 'Offsides', home: 2, away: 1 },
];

const players = [
  { name: 'Bambang Pamungkas', goals: 2, assists: 1, accuracy: '85%', rating: 8.5 },
  { name: 'Evan Dimas', goals: 0, assists: 1, accuracy: '82%', rating: 7.9 },
  { name: 'Ilija Spasojevic', goals: 1, assists: 1, accuracy: '79%', rating: 7.6 },
];

export default function MatchStatistics() {
  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Match Statistics</h1>
            <p className="text-muted-foreground mt-1">SSB Garuda Muda vs Persikabo - Final: 2-1</p>
          </div>
        </div>
      </section>

      {/* Possession */}
      <Card>
        <CardHeader>
          <CardTitle id="possession-title">Possession</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4" role="region" aria-labelledby="possession-title">
            <div className="flex-1">
              <div className="flex justify-between text-sm font-medium mb-2">
                <label htmlFor="home-possession">SSB Garuda Muda</label>
                <span>58%</span>
              </div>
              <div id="home-possession" className="h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={58} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full bg-blue-600" style={{ width: '58%' }}></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm font-medium mb-2">
                <label htmlFor="away-possession" className="text-right">Persikabo</label>
                <span>42%</span>
              </div>
              <div id="away-possession" className="h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={42} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full bg-red-600 ml-auto" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Statistics */}
      <Card>
        <CardHeader>
          <CardTitle id="stats-table-title">Comparative Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <caption className="sr-only" id="stats-table-title">Match statistics comparison between home and away teams</caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Statistic</TableHead>
                <TableHead className="text-center" scope="col">Home</TableHead>
                <TableHead className="text-center" scope="col">Away</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((stat) => (
                <TableRow key={stat.name}>
                  <TableCell className="font-medium">{stat.name}</TableCell>
                  <TableCell className="text-center font-semibold">{stat.home}</TableCell>
                  <TableCell className="text-center font-semibold">{stat.away}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Player Stats */}
      <Card>
        <CardHeader>
          <CardTitle id="player-stats-title">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <caption className="sr-only">Top performing players with their statistics</caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Player</TableHead>
                <TableHead scope="col">Goals</TableHead>
                <TableHead scope="col">Assists</TableHead>
                <TableHead>Pass Acc.</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.name}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.goals}</TableCell>
                  <TableCell>{player.assists}</TableCell>
                  <TableCell>{player.accuracy}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {player.rating}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </main>
    );
  }
