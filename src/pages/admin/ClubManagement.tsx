import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockClubs = [
  { id: 1, name: "SSB Garuda Muda", league: "Jakarta Premier", players: 22, city: "Jakarta", status: "Verified" },
  { id: 2, name: "Persija Muda", league: "Jakarta Premier", players: 25, city: "Jakarta", status: "Verified" },
  { id: 3, name: "FC Harapan Jaya", league: "Makassar League", players: 20, city: "Makassar", status: "Pending" },
  { id: 4, name: "SSB Bintang Timur", league: "Makassar League", players: 18, city: "Makassar", status: "Verified" },
  { id: 5, name: "Surabaya Youth FC", league: "Surabaya Cup", players: 16, city: "Surabaya", status: "Verified" },
];

export default function ClubManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Club Management</h1>
        <p className="text-muted-foreground mt-1">Manage all registered clubs</p>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap items-end">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clubs..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="League" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leagues</SelectItem>
            <SelectItem value="jakarta">Jakarta Premier</SelectItem>
            <SelectItem value="makassar">Makassar League</SelectItem>
            <SelectItem value="surabaya">Surabaya Cup</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="jakarta">Jakarta</SelectItem>
            <SelectItem value="makassar">Makassar</SelectItem>
            <SelectItem value="surabaya">Surabaya</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Clubs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Club Name</th>
                <th className="text-left p-4 font-semibold">League</th>
                <th className="text-left p-4 font-semibold">Players</th>
                <th className="text-left p-4 font-semibold">City</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockClubs.map((club) => (
                <tr key={club.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{club.name}</td>
                  <td className="p-4 text-sm">{club.league}</td>
                  <td className="p-4">{club.players}</td>
                  <td className="p-4">{club.city}</td>
                  <td className="p-4">
                    <Badge className={club.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {club.status}
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
