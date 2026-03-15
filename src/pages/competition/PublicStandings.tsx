import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockStandings = [
  { rank: 1, team: "SSB Garuda Muda", played: 6, won: 5, drawn: 1, lost: 0, gf: 18, ga: 4, points: 16 },
  { rank: 2, team: "FC Makassar", played: 6, won: 4, drawn: 1, lost: 1, gf: 14, ga: 7, points: 13 },
  { rank: 3, team: "Elite FC", played: 6, won: 3, drawn: 2, lost: 1, gf: 12, ga: 9, points: 11 },
  { rank: 4, team: "Youth Academy", played: 6, won: 2, drawn: 2, lost: 2, gf: 10, ga: 10, points: 8 },
];

export default function PublicStandings() {
  return (
    <div className="space-y-6" role="main" aria-label="Standings">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Standings</h1>
        <p className="text-muted-foreground mt-1">Current league table</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-center font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Team</th>
                <th className="px-4 py-3 text-center font-semibold">P</th>
                <th className="px-4 py-3 text-center font-semibold">W</th>
                <th className="px-4 py-3 text-center font-semibold">D</th>
                <th className="px-4 py-3 text-center font-semibold">L</th>
                <th className="px-4 py-3 text-center font-semibold">GF</th>
                <th className="px-4 py-3 text-center font-semibold">GA</th>
                <th className="px-4 py-3 text-right font-semibold">PTS</th>
              </tr>
            </thead>
            <tbody>
              {mockStandings.map((row) => (
                <tr key={row.rank} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-center font-bold text-lg">{row.rank}</td>
                  <td className="px-4 py-3 font-medium">{row.team}</td>
                  <td className="px-4 py-3 text-center">{row.played}</td>
                  <td className="px-4 py-3 text-center text-green-600">{row.won}</td>
                  <td className="px-4 py-3 text-center text-yellow-600">{row.drawn}</td>
                  <td className="px-4 py-3 text-center text-red-600">{row.lost}</td>
                  <td className="px-4 py-3 text-center">{row.gf}</td>
                  <td className="px-4 py-3 text-center">{row.ga}</td>
                  <td className="px-4 py-3 text-right font-bold text-lg">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
