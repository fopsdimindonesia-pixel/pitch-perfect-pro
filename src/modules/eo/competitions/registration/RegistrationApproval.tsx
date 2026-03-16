import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, X } from "lucide-react";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function RegistrationApproval() {
  const { activeCompetition, registrations } = useCompetition();
  const pendingRegs = registrations.filter((r) => r.status === "Pending");

  return (
    <div className="space-y-6" role="main" aria-label="Registration approval">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Registration Approval</h1>
        <p className="text-muted-foreground mt-1">
          {activeCompetition ? `${pendingRegs.length} pending approvals` : "Pilih kompetisi"}
        </p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi untuk melihat pendaftaran</Card>
      ) : (
        <>
          <div className="space-y-4">
            {pendingRegs.map((reg) => (
              <Card key={reg.id} className="p-6 border-l-4 border-l-yellow-500">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{reg.clubName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{activeCompetition.name}</p>
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <Badge variant={reg.paymentStatus === "Paid" ? "default" : "secondary"}>
                        {reg.paymentStatus}
                      </Badge>
                      <span className="text-muted-foreground">
                        Rp {reg.fee.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="gap-2 bg-primary hover:bg-primary/90">
                      <Check className="w-4 h-4" />Approve
                    </Button>
                    <Button variant="destructive" className="gap-2">
                      <X className="w-4 h-4" />Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {pendingRegs.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <p>Tidak ada pendaftaran yang perlu disetujui</p>
            </Card>
          )}

          {registrations.filter((r) => r.status === "Approved").length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Approved Registrations</h2>
              <div className="space-y-2">
                {registrations.filter((r) => r.status === "Approved").map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{reg.clubName}</span>
                    <Badge className="bg-primary/10 text-primary">Approved</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
