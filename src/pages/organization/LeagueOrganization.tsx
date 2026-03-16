import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockLeagues = [
  { id: "1", name: "Jakarta Premier League", region: "Jakarta", clubs: 16, status: "Active" },
  { id: "2", name: "Makassar League U13", region: "Makassar", clubs: 8, status: "Active" },
  { id: "3", name: "Surabaya Youth Cup", region: "Surabaya", clubs: 12, status: "Active" },
  { id: "4", name: "Bandung Elite League", region: "Bandung", clubs: 20, status: "Planning" },
];

export default function LeagueOrganization() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">League Organization</h1>
          <p className="text-muted-foreground mt-1">Directory of all football leagues</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create League
        </Button>
      </div>

      {/* Leagues Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">League Name</th>
                <th className="text-left p-4 font-semibold">Region</th>
                <th className="text-left p-4 font-semibold">Clubs</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLeagues.map((league) => (
                <tr key={league.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{league.name}</td>
                  <td className="p-4">{league.region}</td>
                  <td className="p-4">{league.clubs}</td>
                  <td className="p-4">
                    <Badge className={league.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {league.status}
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
