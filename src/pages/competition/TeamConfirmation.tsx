import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const mockTeams = [
  { id: 1, name: "SSB Garuda Muda", manager: "Budi Hartono", confirmed: true, date: "2024-03-15" },
  { id: 2, name: "FC Makassar", manager: "Ahmad Samin", confirmed: true, date: "2024-03-17" },
  { id: 3, name: "Youth Academy", manager: "Dr. Rina", confirmed: false, date: null },
  { id: 4, name: "Training Center", manager: "Doni Priyanto", confirmed: true, date: "2024-03-20" },
];

export default function TeamConfirmation() {
  return (
    <div className="space-y-6" role="main" aria-label="Team confirmation">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Team Confirmation</h1>
        <p className="text-muted-foreground mt-1">Confirm team participation</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Total Teams</p>
          <p className="text-2xl font-bold mt-2">{mockTeams.length}</p>
        </Card>
        <Card className="p-4 bg-green-50">
          <p className="text-xs text-muted-foreground">Confirmed</p>
          <p className="text-2xl font-bold text-green-600 mt-2">3</p>
        </Card>
        <Card className="p-4 bg-yellow-50">
          <p className="text-xs text-muted-foreground">Pending Confirmation</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">1</p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Team</th>
                <th className="px-6 py-3 text-left font-semibold">Manager</th>
                <th className="px-6 py-3 text-left font-semibold">Confirmation Status</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockTeams.map((team) => (
                <tr key={team.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{team.name}</td>
                  <td className="px-6 py-4">{team.manager}</td>
                  <td className="px-6 py-4">
                    {team.confirmed ? (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        Confirmed
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
                        <XCircle className="w-3 h-3" />
                        Pending
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{team.date || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
