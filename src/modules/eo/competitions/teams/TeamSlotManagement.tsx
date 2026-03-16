import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users } from "lucide-react";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function TeamSlotManagement() {
  const { activeCompetition, registrations } = useCompetition();
  const totalSlots = activeCompetition?.clubs ?? 0;
  const filledSlots = registrations.filter((r) => r.status === "Approved").length;
  const availableSlots = Math.max(0, totalSlots - filledSlots);
  const fillPercent = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;

  return (
    <div className="space-y-6" role="main" aria-label="Team slot management">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Team Slot Management</h1>
        <p className="text-muted-foreground mt-1">Manage available slots for teams</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary">{totalSlots}</div>
                <BarChart3 className="w-8 h-8 text-primary/40" />
              </div>
              <p className="text-sm font-medium">Total Slots</p>
              <p className="text-xs text-muted-foreground mt-1">{activeCompetition.name}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary">{filledSlots}</div>
                <Users className="w-8 h-8 text-primary/40" />
              </div>
              <p className="text-sm font-medium">Filled Slots</p>
              <p className="text-xs text-muted-foreground mt-1">{fillPercent}% capacity</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary">{availableSlots}</div>
                <BarChart3 className="w-8 h-8 text-primary/40" />
              </div>
              <p className="text-sm font-medium">Available Slots</p>
              <p className="text-xs text-muted-foreground mt-1">{100 - fillPercent}% remaining</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Registration Breakdown</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Approved</span>
                  <span className="text-muted-foreground">{filledSlots}/{totalSlots}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${fillPercent}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Pending</span>
                  <span className="text-muted-foreground">{registrations.filter((r) => r.status === "Pending").length}</span>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
