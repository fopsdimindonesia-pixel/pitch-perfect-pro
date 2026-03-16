import { Card } from "@/components/ui/card";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function PublicStandings() {
  const { activeCompetition, standings } = useCompetition();

  return (
    <div className="space-y-6" role="main" aria-label="Standings">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Standings</h1>
        <p className="text-muted-foreground mt-1">Current league table</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : standings.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">Belum ada data klasemen untuk {activeCompetition.name}</Card>
      ) : (
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
                  <th className="px-4 py-3 text-center font-semibold">GD</th>
                  <th className="px-4 py-3 text-right font-semibold">PTS</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row) => (
                  <tr key={row.pos} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-center font-bold text-lg">{row.pos}</td>
                    <td className="px-4 py-3 font-medium">{row.club}</td>
                    <td className="px-4 py-3 text-center">{row.p}</td>
                    <td className="px-4 py-3 text-center">{row.w}</td>
                    <td className="px-4 py-3 text-center">{row.d}</td>
                    <td className="px-4 py-3 text-center">{row.l}</td>
                    <td className="px-4 py-3 text-center">{row.gf}</td>
                    <td className="px-4 py-3 text-center">{row.ga}</td>
                    <td className="px-4 py-3 text-center">{row.gd}</td>
                    <td className="px-4 py-3 text-right font-bold text-lg">{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
