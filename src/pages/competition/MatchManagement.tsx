import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockMatches = [
  { id: 1, teamA: "Team A", teamB: "Team B", date: "2024-01-15", time: "14:00", status: "Scheduled" },
  { id: 2, teamA: "Team C", teamB: "Team D", date: "2024-01-15", time: "16:00", status: "Scheduled" },
  { id: 3, teamA: "Team A", teamB: "Team C", date: "2024-01-20", time: "15:00", status: "Pending" },
];

export default function MatchManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Match management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Match Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage match schedules</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Match
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Team A</th>
                <th className="px-6 py-3 text-left font-semibold">Team B</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Time</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockMatches.map((m) => (
                <tr key={m.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{m.teamA}</td>
                  <td className="px-6 py-4 font-medium">{m.teamB}</td>
                  <td className="px-6 py-4">{m.date}</td>
                  <td className="px-6 py-4">{m.time}</td>
                  <td className="px-6 py-4">
                    <Badge className={m.status === "Scheduled" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}>
                      {m.status}
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
