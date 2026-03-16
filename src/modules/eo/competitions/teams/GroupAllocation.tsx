import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";
import { useMemo } from "react";

export default function GroupAllocation() {
  const { activeCompetition, registrations } = useCompetition();

  const approvedTeams = registrations.filter((r) => r.status === "Approved").map((r) => r.clubName);

  // Auto-generate groups from approved teams
  const groups = useMemo(() => {
    if (approvedTeams.length === 0) return [];
    const perGroup = Math.ceil(approvedTeams.length / 2);
    return [
      { name: "Group A", teams: approvedTeams.slice(0, perGroup) },
      { name: "Group B", teams: approvedTeams.slice(perGroup) },
    ].filter((g) => g.teams.length > 0);
  }, [approvedTeams]);

  return (
    <div className="space-y-6" role="main" aria-label="Group allocation">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Group Allocation</h1>
        <p className="text-muted-foreground mt-1">Drag and drop teams into groups</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : groups.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">Belum ada tim yang disetujui untuk dialokasikan ke grup</Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => (
              <Card key={group.name} className="p-4">
                <h3 className="font-semibold mb-3">{group.name}</h3>
                <div className="space-y-2 mb-4 min-h-32">
                  {group.teams.map((team, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded hover:bg-muted/80 cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{team}</span>
                    </div>
                  ))}
                </div>
                <Badge variant="outline">{group.teams.length} teams</Badge>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button>Save Allocation</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </>
      )}
    </div>
  );
}
