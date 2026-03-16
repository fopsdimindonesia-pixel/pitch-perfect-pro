import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockGroups = {
  'Group A': [
    { position: 1, team: 'Persija Jakarta', played: 8, wins: 6, draws: 1, losses: 1, gf: 18, ga: 6, gd: 12, points: 19 },
    { position: 2, team: 'Bali United', played: 8, wins: 5, draws: 2, losses: 1, gf: 16, ga: 8, gd: 8, points: 17 },
    { position: 3, team: 'PSM Makassar', played: 8, wins: 4, draws: 1, losses: 3, gf: 14, ga: 12, gd: 2, points: 13 },
    { position: 4, team: 'Arema Malang', played: 8, wins: 2, draws: 0, losses: 6, gf: 8, ga: 16, gd: -8, points: 6 },
  ],
  'Group B': [
    { position: 1, team: 'Madura United', played: 8, wins: 6, draws: 0, losses: 2, gf: 17, ga: 8, gd: 9, points: 18 },
    { position: 2, team: 'SSB Garuda Muda', played: 8, wins: 5, draws: 1, losses: 2, gf: 15, ga: 10, gd: 5, points: 16 },
    { position: 3, team: 'Kalimantan FC', played: 8, wins: 3, draws: 2, losses: 3, gf: 12, ga: 11, gd: 1, points: 11 },
    { position: 4, team: 'Sulawesi FC', played: 8, wins: 1, draws: 1, losses: 6, gf: 6, ga: 18, gd: -12, points: 4 },
  ],
};

const StandingsTable = ({ teams }: { teams: typeof mockGroups['Group A'] }) => (
  <div className="overflow-x-auto">
    <Table>
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
        {teams.map((team) => (
          <TableRow key={team.team} className={team.position <= 2 ? 'bg-green-50' : 'bg-blue-50'}>
            <TableCell className="font-bold">{team.position}</TableCell>
            <TableCell className="font-medium">{team.team}</TableCell>
            <TableCell className="text-center text-sm">{team.played}</TableCell>
            <TableCell className="text-center text-sm font-semibold text-green-600">{team.wins}</TableCell>
            <TableCell className="text-center text-sm font-semibold text-blue-600">{team.draws}</TableCell>
            <TableCell className="text-center text-sm font-semibold text-red-600">{team.losses}</TableCell>
            <TableCell className="text-center text-sm">{team.gf}</TableCell>
            <TableCell className="text-center text-sm">{team.ga}</TableCell>
            <TableCell className="text-center text-sm font-semibold">{team.gd > 0 ? '+' : ''}{team.gd}</TableCell>
            <TableCell className="text-center font-bold text-lg">{team.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default function GroupStandings() {
  const [activeGroup, setActiveGroup] = useState('Group A');

  return (
    <main role="main" className="space-y-6 p-6">
      {/* Header */}
      <section>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Group Stage Standings</h1>
          <p className="text-muted-foreground mt-1">Group standings for group stage competition</p>
        </div>
      </section>

      {/* Overview */}
      <section aria-label="Group stage overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Total Groups</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Teams Per Group</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Qualified Teams</p>
          </CardContent>
        </Card>
      </section>

      {/* Group Tables Tabs */}
      <Tabs value={activeGroup} onValueChange={setActiveGroup}>
        <TabsList className="grid w-full grid-cols-2" role="tablist" aria-label="Group standings tabs">
          <TabsTrigger value="Group A" role="tab" aria-selected={activeGroup === 'Group A'} aria-controls="group-a-panel">
            Group A
          </TabsTrigger>
          <TabsTrigger value="Group B" role="tab" aria-selected={activeGroup === 'Group B'} aria-controls="group-b-panel">
            Group B
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Group A" id="group-a-panel" role="tabpanel">
          <Card>
            <CardHeader>
              <CardTitle>Group A Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <StandingsTable teams={mockGroups['Group A']} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Group B" id="group-b-panel" role="tabpanel">
          <Card>
            <CardHeader>
              <CardTitle>Group B Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <StandingsTable teams={mockGroups['Group B']} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Qualification Info */}
      <Card>
        <CardHeader>
          <CardTitle>Qualification Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-800">1st</Badge>
            <span className="text-sm">Advances to Round of 16</span>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-800">2nd</Badge>
            <span className="text-sm">Advances to Round of 16</span>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-red-100 text-red-800">3rd-4th</Badge>
            <span className="text-sm">Eliminated from competition</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
