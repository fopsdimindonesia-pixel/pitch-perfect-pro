import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, UserCheck, AlertCircle, Plus, Search } from 'lucide-react';

const mockMatches = [
  { id: 'M001', homeTeam: 'SSB Garuda Muda', awayTeam: 'Persikabo', date: '2024-03-25', time: '19:00', venue: 'Stadion Mattoangin', status: 'scheduled', refereeAssigned: false, matchday: 5 },
  { id: 'M002', homeTeam: 'Persija Jakarta', awayTeam: 'Bali United', date: '2024-03-26', time: '15:30', venue: 'Bung Karno Stadium', status: 'confirmed', refereeAssigned: true, matchday: 6 },
  { id: 'M003', homeTeam: 'Madura United', awayTeam: 'PSIS Semarang', date: '2024-03-27', time: '18:00', venue: 'Gelora Bangkalan', status: 'scheduled', refereeAssigned: false, matchday: 7 },
];

export default function MatchScheduler() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMatches = mockMatches.filter(match =>
    match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mockMatches.length,
    scheduled: mockMatches.filter(m => m.status === 'scheduled').length,
    referees: mockMatches.filter(m => m.refereeAssigned).length,
    missing: mockMatches.filter(m => !m.refereeAssigned).length,
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      postponed: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Match Scheduler</h1>
            <p className="text-muted-foreground mt-1">Schedule and manage upcoming matches</p>
          </div>
          <Button className="gap-2" aria-label="Schedule a new match">
            <Plus className="w-4 h-4" />
            Schedule Match
          </Button>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
            <p className="text-sm text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.referees}</div>
            <p className="text-sm text-muted-foreground">Referees Assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.missing}</div>
            <p className="text-sm text-muted-foreground">Missing Assignments</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search matches by team or venue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          aria-label="Search matches by team or venue"
        />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Match Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matchday</TableHead>
                <TableHead>Home Team</TableHead>
                <TableHead>Away Team</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Referee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>MD {match.matchday}</TableCell>
                  <TableCell className="font-medium">{match.homeTeam}</TableCell>
                  <TableCell>{match.awayTeam}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {match.date} {match.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {match.venue}
                    </div>
                  </TableCell>
                  <TableCell>
                    {match.refereeAssigned ? (
                      <Badge className="bg-green-100 text-green-800">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Assigned
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Missing
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(match.status)}>
                      {match.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
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
