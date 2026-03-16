import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';

const players = [
  { number: 9, name: 'Bambang Pamungkas', position: 'ST', rating: 8.5, minutes: 90, touches: 45, pass: 78, ga: '2/1' },
  { number: 10, name: 'Evan Dimas', position: 'LW', rating: 7.9, minutes: 90, touches: 52, pass: 82, ga: '0/1' },
  { number: 1, name: 'I Made Wirawan', position: 'GK', rating: 7.6, minutes: 90, touches: 28, pass: 45, ga: '0/0' },
  { number: 3, name: 'Toni Kusuma', position: 'CB', rating: 7.2, minutes: 90, touches: 89, pass: 88, ga: '0/0' },
  { number: 11, name: 'Ilija Spasojevic', position: 'CF', rating: 8.0, minutes: 87, touches: 41, pass: 72, ga: '1/1' },
  { number: 7, name: 'Saddil Ramdani', position: 'CM', rating: 7.4, minutes: 38, touches: 18, pass: 81, ga: '0/0' },
];

const getRatingColor = (rating: number) => {
  if (rating >= 8) return 'bg-green-100 text-green-800';
  if (rating >= 7.5) return 'bg-blue-100 text-blue-800';
  if (rating >= 7) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
};

export default function PlayerRatings() {
  const avgRating = (players.reduce((sum, p) => sum + p.rating, 0) / players.length).toFixed(1);
  const topPlayer = players.reduce((max, p) => p.rating > max.rating ? p : max);

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Player Ratings</h1>
            <p className="text-muted-foreground mt-1">SSB Garuda Muda Performance Analysis</p>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Player performance summary">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{avgRating}</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{topPlayer.name.split(' ')[0]}</div>
            <p className="text-sm text-muted-foreground">Top Performer: {topPlayer.rating}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-sm text-muted-foreground">Squad Size</p>
          </CardContent>
        </Card>
      </section>

      {/* Ratings Table */}
      <Card>
        <CardHeader>
          <CardTitle id="ratings-table-title">Player Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <caption className="sr-only">Detailed player performance statistics including rating, minutes played, touches, passing percentage, and goals/assists</caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">#</TableHead>
                <TableHead scope="col">Player</TableHead>
                <TableHead scope="col">Position</TableHead>
                <TableHead scope="col">Rating</TableHead>
                <TableHead scope="col">Minutes</TableHead>
                <TableHead scope="col">Touches</TableHead>
                <TableHead scope="col">Pass %</TableHead>
                <TableHead scope="col">G/A</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.number}>
                  <TableCell className="font-bold">{player.number}</TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>
                    <Badge className={getRatingColor(player.rating)}>
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {player.rating}
                    </Badge>
                  </TableCell>
                  <TableCell>{player.minutes}'</TableCell>
                  <TableCell>{player.touches}</TableCell>
                  <TableCell>{player.pass}%</TableCell>
                  <TableCell className="font-semibold">{player.ga}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
