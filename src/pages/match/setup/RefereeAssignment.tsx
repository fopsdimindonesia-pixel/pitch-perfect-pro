import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, UserCheck } from 'lucide-react';

const mockReferees = [
  { id: 1, name: 'Bambang Wijaya', license: 'AFC Pro', level: 'International', experience: '15', rating: '4.9', assigned: 3 },
  { id: 2, name: 'Sugeng Hartono', license: 'AFC A', level: 'National', experience: '10', rating: '4.7', assigned: 2 },
  { id: 3, name: 'Edwin Reyes', license: 'AFC B', level: 'Regional', experience: '7', rating: '4.5', assigned: 1 },
  { id: 4, name: 'Marno Yuni', license: 'AFC Pro', level: 'International', experience: '12', rating: '4.8', assigned: 4 },
  { id: 5, name: 'Basdi Suliman', license: 'AFC A', level: 'National', experience: '8', rating: '4.6', assigned: 2 },
];

export default function RefereeAssignment() {
  const [filter, setFilter] = useState('all');

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
      'International': 'bg-purple-100 text-purple-800',
      'National': 'bg-blue-100 text-blue-800',
      'Regional': 'bg-green-100 text-green-800',
    };
    return colors[level] || '';
  };

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Referee Assignment</h1>
            <p className="text-muted-foreground mt-1">Manage referee appointments and assignments</p>
          </div>
          <Button aria-label="Add a new referee">Add Referee</Button>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Referees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.assigned}</div>
            <p className="text-sm text-muted-foreground">Assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{stats.international}</div>
            <p className="text-sm text-muted-foreground">International Level</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <section aria-label="Filter referees by availability" className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
          aria-pressed={filter === 'all'}
          aria-label="Show all referees"
        >
          All
        </Button>
        <Button
          variant={filter === 'available' ? 'default' : 'outline'}
          onClick={() => setFilter('available')}
          size="sm"
          aria-pressed={filter === 'available'}
          aria-label="Show available referees only"
        >
          Available
        </Button>
        <Button
          variant={filter === 'assigned' ? 'default' : 'outline'}
          onClick={() => setFilter('assigned')}
          size="sm"
          aria-pressed={filter === 'assigned'}
          aria-label="Show assigned referees only"
        >
          Assigned
        </Button>
      </section>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Assigned Matches</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferees.map((ref) => (
                <TableRow key={ref.id}>
                  <TableCell className="font-medium">{ref.name}</TableCell>
                  <TableCell>{ref.license}</TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(ref.level)}>
                      {ref.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{ref.experience} years</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {ref.rating}
                    </div>
                  </TableCell>
                  <TableCell>{ref.assigned}</TableCell>
                  <TableCell>
                    {ref.assigned >= 3 ? (
                      <Badge className="bg-amber-100 text-amber-800">Full</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Assign</Button>
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
