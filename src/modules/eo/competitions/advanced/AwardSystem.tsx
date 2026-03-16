import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Plus } from "lucide-react";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function AwardSystem() {
  const { activeCompetition, standings } = useCompetition();

  // Derive awards from standings data
  const awards = activeCompetition && standings.length > 0
    ? [
        { id: 1, name: "Best Team", category: activeCompetition.ageGroup, winner: standings[0]?.club ?? "TBD", status: "Active" },
        { id: 2, name: "Top Scorer", category: activeCompetition.ageGroup, winner: "Pending", status: "Active" },
        { id: 3, name: "Fair Play Award", category: "Overall", winner: "Pending", status: "Active" },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Award System</h1>
          <p className="text-muted-foreground mt-1">Manage competition awards</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Create Award</Button>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : awards.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">Belum ada data untuk awards</Card>
      ) : (
        <div className="space-y-3">
          {awards.map((award) => (
            <Card key={award.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Trophy className="w-6 h-6 text-primary/60" />
                  <div className="flex-1">
                    <h3 className="font-medium">{award.name}</h3>
                    <p className="text-sm text-muted-foreground">{award.category}</p>
                    <p className="text-sm mt-1">{award.winner}</p>
                  </div>
                </div>
                <Badge variant="secondary">{award.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
