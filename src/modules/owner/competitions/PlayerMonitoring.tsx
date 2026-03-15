import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockPlayers = [
  { id: 1, name: "Rizky Pratama", club: "SSB Garuda Muda", age: 15, position: "ST", status: "Active" },
  { id: 2, name: "Andi Santoso", club: "Persija Muda", age: 14, position: "CM", status: "Active" },
  { id: 3, name: "Budi Wijaya", club: "FC Harapan Jaya", age: 16, position: "GK", status: "Active" },
  { id: 4, name: "Citra Kusuma", club: "SSB Bintang Timur", age: 13, position: "LW", status: "Pending" },
  { id: 5, name: "Dimas Saputra", club: "Surabaya Youth FC", age: 15, position: "RB", status: "Suspended" },
];

export default function PlayerMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Player Monitoring</h1>
        <p className="text-muted-foreground mt-1">Track players across all clubs</p>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap items-end">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Club" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clubs</SelectItem>
            <SelectItem value="garuda">SSB Garuda Muda</SelectItem>
            <SelectItem value="persija">Persija Muda</SelectItem>
            <SelectItem value="harapan">FC Harapan Jaya</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="League" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leagues</SelectItem>
            <SelectItem value="jakarta">Jakarta Premier</SelectItem>
            <SelectItem value="makassar">Makassar League</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Age Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            <SelectItem value="u13">U13</SelectItem>
            <SelectItem value="u15">U15</SelectItem>
            <SelectItem value="u17">U17</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Players Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Player Name</th>
                <th className="text-left p-4 font-semibold">Club</th>
                <th className="text-left p-4 font-semibold">Age</th>
                <th className="text-left p-4 font-semibold">Position</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPlayers.map((player) => (
                <tr key={player.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{player.name}</td>
                  <td className="p-4 text-sm">{player.club}</td>
                  <td className="p-4">{player.age}</td>
                  <td className="p-4 font-mono text-sm">{player.position}</td>
                  <td className="p-4">
                    <Badge className={
                      player.status === "Active" ? "bg-green-100 text-green-800" :
                      player.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {player.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
