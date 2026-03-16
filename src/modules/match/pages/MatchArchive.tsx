import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Eye } from 'lucide-react';
import { useMatch } from '../context/MatchContext';
import { useRole } from '@/context/RoleContext';

const mockArchiveMatches = [
  { id: 1, date: '2024-03-20', homeTeam: 'SSB Garuda Muda', awayTeam: 'Persikabo', score: '2-1', venue: 'Stadion Mattoangin', attendance: '18,500', result: 'W' },
  { id: 2, date: '2024-03-15', homeTeam: 'Persija Jakarta', awayTeam: 'Bali United', score: '2-2', venue: 'Bung Karno Stadium', attendance: '22,000', result: 'D' },
  { id: 3, date: '2024-03-10', homeTeam: 'Madura United', awayTeam: 'PSIS Semarang', score: '0-1', venue: 'Gelora Bangkalan', attendance: '15,300', result: 'L' },
];

export default function MatchArchive() {
  const [searchTerm, setSearchTerm] = useState('');
  const { role } = useRole();
  const isClub = role === 'club';

  // Club only sees own matches
  const clubName = 'SSB Garuda Muda';
  const allMatches = isClub
    ? mockArchiveMatches.filter(m => m.homeTeam === clubName || m.awayTeam === clubName)
    : mockArchiveMatches;

  const filteredMatches = allMatches.filter(match =>
    match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: allMatches.length,
    wins: allMatches.filter(m => m.result === 'W').length,
    draws: allMatches.filter(m => m.result === 'D').length,
    losses: allMatches.filter(m => m.result === 'L').length,
  };

  const getResultColor = (result: string) => {
    const colors: Record<string, string> = {
      'W': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'D': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'L': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[result] || 'bg-muted text-muted-foreground';
  };

  const getResultLabel = (result: string) => {
    const labels: Record<string, string> = { 'W': 'Menang', 'D': 'Seri', 'L': 'Kalah' };
    return labels[result] || result;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Arsip Pertandingan</h1>
          <p className="text-muted-foreground mt-1">
            {isClub ? `Riwayat pertandingan ${clubName}` : 'Semua rekaman pertandingan'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total },
          { label: 'Menang', value: stats.wins, color: 'text-green-600' },
          { label: 'Seri', value: stats.draws, color: 'text-blue-600' },
          { label: 'Kalah', value: stats.losses, color: 'text-red-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className={`text-2xl font-bold ${s.color || ''}`}>{s.value}</div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari tim..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Card>
        <CardHeader><CardTitle>Rekaman Pertandingan</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Tuan Rumah</TableHead>
                  <TableHead>Tamu</TableHead>
                  <TableHead>Skor</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Penonton</TableHead>
                  <TableHead>Hasil</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.map(match => (
                  <TableRow key={match.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm">{match.date}</TableCell>
                    <TableCell className="font-medium">{match.homeTeam}</TableCell>
                    <TableCell>{match.awayTeam}</TableCell>
                    <TableCell className="font-bold text-lg">{match.score}</TableCell>
                    <TableCell className="text-sm">{match.venue}</TableCell>
                    <TableCell className="text-sm">{match.attendance}</TableCell>
                    <TableCell>
                      <Badge className={getResultColor(match.result)}>{getResultLabel(match.result)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
