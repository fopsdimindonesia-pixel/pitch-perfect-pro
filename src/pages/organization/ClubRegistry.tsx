import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockClubs } from "@/lib/mockData";

export default function ClubRegistry() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Club Registry</h1>
          <p className="text-muted-foreground mt-1">Manage all clubs in the system</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Register Club</Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search clubs..." className="pl-10" />
          </div>
          <select className="px-4 py-2 border rounded-md text-sm">
            <option>All Leagues</option>
            <option>Liga Makassar</option>
            <option>Jakarta Premier</option>
          </select>
          <select className="px-4 py-2 border rounded-md text-sm">
            <option>All Regions</option>
            <option>Makassar</option>
            <option>Jakarta</option>
          </select>
        </div>
      </Card>

      {/* Clubs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Club Name</th>
                <th className="text-left p-4 font-semibold">City</th>
                <th className="text-left p-4 font-semibold">League</th>
                <th className="text-left p-4 font-semibold">Players</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockClubs.map((club) => (
                <tr key={club.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{club.name}</td>
                  <td className="p-4">{club.city}</td>
                  <td className="p-4">{club.eoName}</td>
                  <td className="p-4">{club.players}</td>
                  <td className="p-4">
                    <Badge className={club.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {club.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="sm">View</Button>
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
