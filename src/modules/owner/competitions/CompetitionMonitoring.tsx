import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockCompetitions = [
  { id: 1, name: "Jakarta Premier U15", organizer: "Jakarta Premier League", teams: 16, matchesPlayed: 24, status: "In Progress" },
  { id: 2, name: "Makassar League U13", organizer: "PSSI Makassar", teams: 12, matchesPlayed: 18, status: "In Progress" },
  { id: 3, name: "Surabaya Cup U12", organizer: "Surabaya Cup", teams: 8, matchesPlayed: 12, status: "Completed" },
  { id: 4, name: "Cup Makassar U15", organizer: "PSSI Makassar", teams: 16, matchesPlayed: 20, status: "In Progress" },
  { id: 5, name: "Bandung Elite League", organizer: "Bandung Youth", teams: 14, matchesPlayed: 10, status: "In Progress" },
];

export default function CompetitionMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Competition Monitoring</h1>
        <p className="text-muted-foreground mt-1">Track active competitions platform-wide</p>
      </div>

      {/* Competitions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Competition Name</th>
                <th className="text-left p-4 font-semibold">Organizer</th>
                <th className="text-left p-4 font-semibold">Teams</th>
                <th className="text-left p-4 font-semibold">Matches Played</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockCompetitions.map((comp) => (
                <tr key={comp.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{comp.name}</td>
                  <td className="p-4 text-sm">{comp.organizer}</td>
                  <td className="p-4">{comp.teams}</td>
                  <td className="p-4">{comp.matchesPlayed}</td>
                  <td className="p-4">
                    <Badge className={comp.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                      {comp.status}
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
