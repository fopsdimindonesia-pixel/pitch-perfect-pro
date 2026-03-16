import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SoccerosDashboardLayout, PageHeader, StatCard } from '@/components/socceros/DashboardLayout';
import { mockPlayers, type Player } from '@/lib/socceros/mockData';
import { Users, Trophy, Search, Plus, Edit, Trash2 } from 'lucide-react';

export default function SquadManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState<string>('all');

  const positions = ['all', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  const filteredPlayers = mockPlayers.filter((player: Player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.number.toString().includes(searchTerm);
    const matchesPosition = filterPosition === 'all' || player.position === filterPosition;
    return matchesSearch && matchesPosition;
  });

  const positionStats = {
    goalkeepers: mockPlayers.filter((p: Player) => p.position === 'Goalkeeper').length,
    defenders: mockPlayers.filter((p: Player) => p.position === 'Defender').length,
    midfielders: mockPlayers.filter((p: Player) => p.position === 'Midfielder').length,
    forwards: mockPlayers.filter((p: Player) => p.position === 'Forward').length,
  };

  return (
    <SoccerosDashboardLayout role="CLUB">
      <PageHeader
        title="Squad Management"
        subtitle="Manage your team roster and players"
        icon="👥"
        action={<Button><Plus className="w-4 h-4 mr-2" /> Add Player</Button>}
      />

      {/* Position Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Goalkeepers"
          value={positionStats.goalkeepers}
          icon="🧤"
          color="blue"
        />
        <StatCard
          title="Defenders"
          value={positionStats.defenders}
          icon="🛡️"
          color="green"
        />
        <StatCard
          title="Midfielders"
          value={positionStats.midfielders}
          icon="⚙️"
          color="purple"
        />
        <StatCard
          title="Forwards"
          value={positionStats.forwards}
          icon="⚡"
          color="orange"
        />
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Search players by name or number..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Players List */}
      <Card>
        <CardHeader>
          <CardTitle>Squad List ({filteredPlayers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-semibold">#</th>
                  <th className="px-4 py-3 text-left font-semibold">Player</th>
                  <th className="px-4 py-3 text-left font-semibold">Position</th>
                  <th className="px-4 py-3 text-left font-semibold">Nationality</th>
                  <th className="px-4 py-3 text-left font-semibold">Joined</th>
                  <th className="px-4 py-3 text-left font-semibold">Contract</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player: Player) => (
                  <tr key={player.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-lg">{player.number}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{player.position}</Badge>
                    </td>
                    <td className="px-4 py-3">{player.nationality}</td>
                    <td className="px-4 py-3 text-sm">{player.joinDate}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          new Date(player.contract) > new Date()
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {player.contract}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </SoccerosDashboardLayout>
  );
}
