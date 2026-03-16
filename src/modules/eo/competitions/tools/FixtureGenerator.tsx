import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function FixtureGenerator() {
  const { activeCompetition, matches, registrations } = useCompetition();
  const approvedTeams = registrations.filter((r) => r.status === "Approved");

  return (
    <div className="space-y-6" role="main" aria-label="Fixture generator">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Fixture Generator</h1>
        <p className="text-muted-foreground mt-1">Generate match fixtures automatically</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <>
          <Card className="p-6">
            <Tabs defaultValue="league">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="league">League</TabsTrigger>
                <TabsTrigger value="knockout">Knockout</TabsTrigger>
                <TabsTrigger value="mixed">Mixed</TabsTrigger>
              </TabsList>

              <TabsContent value="league" className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium">Competition</label>
                  <p className="text-sm text-muted-foreground mt-1">{activeCompetition.name} — {activeCompetition.format}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Approved Teams</label>
                  <p className="text-sm text-muted-foreground mt-1">{approvedTeams.length} teams ready</p>
                </div>
                <Button className="w-full mt-4">Generate Fixtures</Button>
              </TabsContent>

              <TabsContent value="knockout" className="space-y-4 mt-6">
                <p className="text-sm text-muted-foreground">Single Elimination for {approvedTeams.length} teams</p>
                <Button className="w-full">Generate Knockout</Button>
              </TabsContent>

              <TabsContent value="mixed" className="space-y-4 mt-6">
                <p className="text-sm text-muted-foreground">Group Round + Knockout for {approvedTeams.length} teams</p>
                <Button className="w-full">Generate Mixed Format</Button>
              </TabsContent>
            </Tabs>
          </Card>

          {matches.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Existing Fixtures ({matches.length})</h2>
              <div className="space-y-2">
                {matches.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-2 text-sm border-b last:border-b-0">
                    <span className="text-muted-foreground font-mono text-xs">{m.date}</span>
                    <span className="flex-1 mx-3">{m.homeTeam} vs {m.awayTeam}</span>
                    <Badge variant="outline">{m.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-4 bg-primary/5 border-primary/20">
            <p className="text-sm font-medium">✓ {approvedTeams.length} teams ready for fixture generation</p>
            <p className="text-xs text-muted-foreground mt-1">
              Estimated matches: {approvedTeams.length > 1 ? (approvedTeams.length * (approvedTeams.length - 1)) / 2 : 0} (round-robin)
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
