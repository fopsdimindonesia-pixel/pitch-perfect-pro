import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Eye } from 'lucide-react';

const mockMatches = [
  { id: 1, date: '2024-03-20', homeTeam: 'SSB Garuda Muda', awayTeam: 'Persikabo', score: '2-1', venue: 'Stadion Mattoangin', attendance: '18,500', result: 'W' },
  { id: 2, date: '2024-03-15', homeTeam: 'Persija Jakarta', awayTeam: 'Bali United', score: '2-2', venue: 'Bung Karno Stadium', attendance: '22,000', result: 'D' },
  { id: 3, date: '2024-03-10', homeTeam: 'Madura United', awayTeam: 'PSIS Semarang', score: '0-1', venue: 'Gelora Bangkalan', attendance: '15,300', result: 'L' },
];

export default function MatchArchive() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatches = mockMatches.filter(match =>
    match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mockMatches.length,
    wins: mockMatches.filter(m => m.result === 'W').length,
    draws: mockMatches.filter(m => m.result === 'D').length,
    avgAttendance: Math.floor(
      mockMatches.reduce((sum, m) => sum + parseInt(m.attendance), 0) / mockMatches.length
    ),
  };

  const getResultColor = (result: string) => {
    const colors: Record<string, string> = {
      'W': 'bg-green-100 text-green-800',
      'D': 'bg-blue-100 text-blue-800',
      'L': 'bg-red-100 text-red-800',
    };
    return colors[result] || '';
  };

  const getResultLabel = (result: string) => {
    const labels: Record<string, string> = { 'W': 'Win', 'D': 'Draw', 'L': 'Loss' };
    return labels[result] || result;
  };

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Match Archive</h1>
            <p className="text-muted-foreground mt-1">Browse historical match records and statistics</p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Match archive statistics">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.wins}</div>
            <p className="text-sm text-muted-foreground">Wins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.draws}</div>
            <p className="text-sm text-muted-foreground">Draws</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.avgAttendance}</div>
            <p className="text-sm text-muted-foreground">Avg Attendance</p>
          </CardContent>
        </Card>
      </section>

      {/* Search */}
      <section aria-label="Search archived matches" className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by team..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          aria-label="Search archived matches by team"
          role="searchbox"
        />
      </section>

      {/* Archive Table */}
      <Card>
        <CardHeader>
          <CardTitle>Match Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Home Team</TableHead>
                <TableHead>Away Team</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="text-sm">{match.date}</TableCell>
                  <TableCell className="font-medium">{match.homeTeam}</TableCell>
                  <TableCell>{match.awayTeam}</TableCell>
                  <TableCell className="font-bold text-lg">{match.score}</TableCell>
                  <TableCell className="text-sm">{match.venue}</TableCell>
                  <TableCell className="text-sm">{match.attendance}</TableCell>
                  <TableCell>
                    <Badge className={getResultColor(match.result)}>
                      {getResultLabel(match.result)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
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
