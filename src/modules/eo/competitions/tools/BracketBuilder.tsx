import { Card } from "@/components/ui/card";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function BracketBuilder() {
  const { activeCompetition, registrations } = useCompetition();
  const approvedTeams = registrations.filter((r) => r.status === "Approved").map((r) => r.clubName);

  return (
    <div className="space-y-6" role="main" aria-label="Tournament bracket builder">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Bracket Builder</h1>
        <p className="text-muted-foreground mt-1">Design knockout tournament bracket</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <>
          <Card className="p-6">
            <div className="bg-muted/50 p-8 rounded-lg border-2 border-dashed border-border min-h-96">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">{activeCompetition.name} — Bracket Layout</p>
                {approvedTeams.length < 2 ? (
                  <p className="text-sm text-muted-foreground">Minimal 2 tim yang disetujui untuk membuat bracket</p>
                ) : (
                  <div className="flex justify-between items-start gap-4 text-sm">
                    <div className="flex flex-col gap-2">
                      {approvedTeams.map((t, i) => (
                        <div key={i} className="border rounded p-2 w-36 text-center text-xs bg-card">{t}</div>
                      ))}
                    </div>
                    <span className="text-2xl mt-4">→</span>
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="border rounded p-2 w-28 text-center text-xs bg-primary/5">SF1</div>
                      {approvedTeams.length > 2 && (
                        <div className="border rounded p-2 w-28 text-center text-xs bg-primary/5">SF2</div>
                      )}
                    </div>
                    <span className="text-2xl mt-4">→</span>
                    <div className="mt-6">
                      <div className="border rounded p-2 w-28 text-center text-xs bg-primary/10 font-medium">Final</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <p className="text-sm text-muted-foreground">Interactive bracket builder with drag-and-drop team assignment</p>
        </>
      )}
    </div>
  );
}
