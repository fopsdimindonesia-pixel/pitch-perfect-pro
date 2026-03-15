import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio } from "lucide-react";

const mockMatches = [
  { id: 1, match: "SSB Garuda Muda vs Persija Muda", competition: "Jakarta Premier U15", teams: "2", date: "2024-03-15", status: "Live", live: true },
  { id: 2, match: "FC Harapan Jaya vs SSB Bintang Timur", competition: "Makassar League U13", teams: "2", date: "2024-03-15", status: "Scheduled", live: false },
  { id: 3, match: "Cup Makassar: Semi-Final 1", competition: "Cup Makassar U15", teams: "2", date: "2024-03-14", status: "Finished", live: false },
  { id: 4, match: "Surabaya Youth FC vs Local Club", competition: "Surabaya Cup U12", teams: "2", date: "2024-03-14", status: "Finished", live: false },
  { id: 5, match: "Bandung Elite: Round 2 Match 5", competition: "Bandung Elite League", teams: "2", date: "2024-03-15", status: "Scheduled", live: false },
];

export default function MatchMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Match Monitoring</h1>
        <p className="text-muted-foreground mt-1">Track all matches across competitions</p>
      </div>

      {/* Live Matches Alert */}
      <Card className="p-4 bg-blue-50 border border-blue-200 flex items-center gap-3">
        <Radio className="w-5 h-5 text-blue-600 animate-pulse" />
        <div>
          <p className="font-medium text-sm text-blue-900">1 match is currently live</p>
          <p className="text-xs text-blue-800">SSB Garuda Muda vs Persija Muda</p>
        </div>
      </Card>

      {/* Matches Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Match</th>
                <th className="text-left p-4 font-semibold">Competition</th>
                <th className="text-left p-4 font-semibold">Teams</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockMatches.map((match) => (
                <tr key={match.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium flex items-center gap-2">
                    {match.live && <Radio className="w-3 h-3 text-red-600 animate-pulse" />}
                    {match.match}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{match.competition}</td>
                  <td className="p-4">{match.teams}</td>
                  <td className="p-4 text-sm">{match.date}</td>
                  <td className="p-4">
                    <Badge className={
                      match.status === "Live" ? "bg-red-100 text-red-800" :
                      match.status === "Scheduled" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }>
                      {match.status}
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
