import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, UserCheck } from 'lucide-react';
import { useMatch } from '../context/MatchContext';
import { useRole } from '@/context/RoleContext';

const mockReferees = [
  { id: 1, name: 'Bambang Wijaya', license: 'AFC Pro', level: 'International', experience: '15', rating: '4.9', assigned: 3 },
  { id: 2, name: 'Sugeng Hartono', license: 'AFC A', level: 'National', experience: '10', rating: '4.7', assigned: 2 },
  { id: 3, name: 'Edwin Reyes', license: 'AFC B', level: 'Regional', experience: '7', rating: '4.5', assigned: 1 },
  { id: 4, name: 'Marno Yuni', license: 'AFC Pro', level: 'International', experience: '12', rating: '4.8', assigned: 4 },
  { id: 5, name: 'Basdi Suliman', license: 'AFC A', level: 'National', experience: '8', rating: '4.6', assigned: 2 },
];

export default function RefereeAssignment() {
  const [filter, setFilter] = useState('all');
  const { role } = useRole();
  const { activeMatch } = useMatch();
  const isEO = role === 'eo';

  const filteredReferees = mockReferees.filter(ref => {
    if (filter === 'available') return ref.assigned < 3;
    if (filter === 'assigned') return ref.assigned >= 2;
    return true;
  });

  const stats = {
    total: mockReferees.length,
    available: mockReferees.filter(r => r.assigned < 3).length,
    assigned: mockReferees.filter(r => r.assigned >= 2).length,
    international: mockReferees.filter(r => r.level === 'International').length,
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'International': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      'National': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'Regional': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    };
    return colors[level] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referee Assignment</h1>
          <p className="text-muted-foreground mt-1">
            {activeMatch ? `${activeMatch.homeTeam} vs ${activeMatch.awayTeam}` : 'Kelola penugasan wasit'}
          </p>
        </div>
        {isEO && <Button>Tambah Wasit</Button>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Wasit', value: stats.total },
          { label: 'Tersedia', value: stats.available, color: 'text-green-600' },
          { label: 'Ditugaskan', value: stats.assigned, color: 'text-blue-600' },
          { label: 'Internasional', value: stats.international, color: 'text-purple-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className={`text-2xl font-bold ${s.color || ''}`}>{s.value}</div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {['all', 'available', 'assigned'].map(f => (
          <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)}>
            {f === 'all' ? 'Semua' : f === 'available' ? 'Tersedia' : 'Ditugaskan'}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Daftar Wasit</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Nama</TableHead>
                  <TableHead>Lisensi</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Pengalaman</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Pertandingan</TableHead>
                  <TableHead>Status</TableHead>
                  {isEO && <TableHead>Aksi</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferees.map(ref => (
                  <TableRow key={ref.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{ref.name}</TableCell>
                    <TableCell>{ref.license}</TableCell>
                    <TableCell><Badge className={getLevelColor(ref.level)}>{ref.level}</Badge></TableCell>
                    <TableCell>{ref.experience} tahun</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{ref.rating}
                      </div>
                    </TableCell>
                    <TableCell>{ref.assigned}</TableCell>
                    <TableCell>
                      <Badge className={ref.assigned >= 3 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}>
                        {ref.assigned >= 3 ? 'Penuh' : 'Tersedia'}
                      </Badge>
                    </TableCell>
                    {isEO && (
                      <TableCell>
                        <Button variant="ghost" size="sm" disabled={ref.assigned >= 3}>Tugaskan</Button>
                      </TableCell>
                    )}
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
