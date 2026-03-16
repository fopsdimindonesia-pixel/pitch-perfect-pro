import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check, X, ShieldAlert, CreditCard, Users, Lock } from "lucide-react";
import { useCompetition, STATUS_LABELS } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ConfirmState {
  open: boolean;
  action?: "approve" | "reject";
  registrationId?: string;
  clubName?: string;
  isLoading?: boolean;
}

export default function RegistrationApproval() {
  const { toast } = useToast();
  const { activeCompetition, registrations, competitionConfig, updateRegistration } = useCompetition();
  const [confirm, setConfirm] = useState<ConfirmState>({ open: false });

  const pendingRegs = registrations.filter((r) => r.status === "Pending");
  const approvedCount = registrations.filter((r) => r.status === "Approved").length;
  const totalSlots = competitionConfig.categories.reduce((sum, c) => sum + c.maxTeams, 0);
  const slotsAvailable = totalSlots - approvedCount;

  const isRegistrationOpen = activeCompetition?.status === "registration_open";

  const getStatusMessage = () => {
    if (!activeCompetition) return null;
    const s = activeCompetition.status;
    if (s === "draft") return { icon: Lock, text: "Kompetisi masih draft. Buka registrasi terlebih dahulu di halaman Setup.", variant: "default" as const };
    if (s === "registration_closed") return { icon: Lock, text: "Registrasi sudah ditutup.", variant: "default" as const };
    if (s === "active" || s === "completed" || s === "archived") return { icon: ShieldAlert, text: `Kompetisi sudah ${STATUS_LABELS[s].toLowerCase()}. Tidak bisa mengubah registrasi.`, variant: "destructive" as const };
    return null;
  };

  const canApprove = (reg: typeof registrations[0]) => {
    if (!isRegistrationOpen) return { ok: false, reason: "Registrasi tidak dibuka" };
    if (slotsAvailable <= 0) return { ok: false, reason: `Slot penuh (${approvedCount}/${totalSlots})` };
    if (reg.paymentStatus !== "Paid") return { ok: false, reason: "Pembayaran belum lunas" };
    return { ok: true, reason: "" };
  };

  const handleConfirm = () => {
    if (!confirm.registrationId || !confirm.action) return;
    setConfirm((prev) => ({ ...prev, isLoading: true }));

    setTimeout(() => {
      const status = confirm.action === "approve" ? "Approved" : "Rejected";
      updateRegistration(confirm.registrationId!, status as "Approved" | "Rejected");
      toast({
        title: status === "Approved" ? "Registrasi Disetujui" : "Registrasi Ditolak",
        description: `${confirm.clubName} berhasil ${status === "Approved" ? "disetujui" : "ditolak"}.`,
      });
      setConfirm({ open: false });
    }, 400);
  };

  const statusMsg = activeCompetition ? getStatusMessage() : null;

  return (
    <div className="space-y-6" role="main" aria-label="Registration approval">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Registration Approval</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {activeCompetition ? `${pendingRegs.length} pending · ${approvedCount}/${totalSlots} slot terisi` : "Pilih kompetisi"}
        </p>
      </div>

      <CompetitionSwitcher />

      <ConfirmDialog
        open={confirm.open}
        title={confirm.action === "approve" ? "Setujui Registrasi" : "Tolak Registrasi"}
        description={
          confirm.action === "approve"
            ? `Yakin menyetujui registrasi ${confirm.clubName}?`
            : `Yakin menolak registrasi ${confirm.clubName}? Tindakan ini tidak dapat dibatalkan.`
        }
        actionLabel={confirm.action === "approve" ? "Setujui" : "Tolak"}
        isDangerous={confirm.action === "reject"}
        isLoading={confirm.isLoading}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm({ open: false })}
      />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi untuk melihat pendaftaran</Card>
      ) : (
        <>
          {/* Status gate */}
          {statusMsg && (
            <Alert variant={statusMsg.variant}>
              <statusMsg.icon className="h-4 w-4" />
              <AlertDescription>{statusMsg.text}</AlertDescription>
            </Alert>
          )}

          {/* Slot overview */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="w-4 h-4" /> Slot
              </div>
              <div className="text-2xl font-bold">{approvedCount}<span className="text-base text-muted-foreground font-normal">/{totalSlots}</span></div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <AlertCircle className="w-4 h-4" /> Pending
              </div>
              <div className="text-2xl font-bold">{pendingRegs.length}</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <CreditCard className="w-4 h-4" /> Sisa Slot
              </div>
              <div className={cn("text-2xl font-bold", slotsAvailable <= 0 && "text-destructive")}>{slotsAvailable}</div>
            </Card>
          </div>

          {/* Pending registrations */}
          {pendingRegs.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold">Menunggu Persetujuan</h2>
              {pendingRegs.map((reg) => {
                const approval = canApprove(reg);
                return (
                  <Card key={reg.id} className="p-5 border-l-4 border-l-chart-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{reg.clubName}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{activeCompetition.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={cn("text-[10px] rounded-full border-0",
                            reg.paymentStatus === "Paid" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                          )}>
                            {reg.paymentStatus === "Paid" ? "Lunas" : "Belum Bayar"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Rp {reg.fee.toLocaleString("id-ID")}</span>
                        </div>
                        {!approval.ok && (
                          <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />{approval.reason}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="gap-1 text-xs"
                          disabled={!approval.ok}
                          onClick={() => setConfirm({ open: true, action: "approve", registrationId: reg.id, clubName: reg.clubName })}
                        >
                          <Check className="w-3.5 h-3.5" />Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-xs text-destructive hover:text-destructive"
                          disabled={!isRegistrationOpen}
                          onClick={() => setConfirm({ open: true, action: "reject", registrationId: reg.id, clubName: reg.clubName })}
                        >
                          <X className="w-3.5 h-3.5" />Reject
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {pendingRegs.length === 0 && isRegistrationOpen && (
            <Card className="p-8 text-center text-muted-foreground">
              Tidak ada pendaftaran yang perlu disetujui
            </Card>
          )}

          {/* Approved list */}
          {registrations.filter((r) => r.status === "Approved").length > 0 && (
            <Card className="p-5">
              <h2 className="font-semibold text-sm mb-3">Tim Disetujui ({approvedCount})</h2>
              <div className="space-y-2">
                {registrations.filter((r) => r.status === "Approved").map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-2.5 rounded-lg border">
                    <span className="text-sm font-medium">{reg.clubName}</span>
                    <Badge className="bg-primary/10 text-primary text-[10px] border-0 rounded-full">Approved</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Rejected list */}
          {registrations.filter((r) => r.status === "Rejected").length > 0 && (
            <Card className="p-5">
              <h2 className="font-semibold text-sm mb-3">Ditolak</h2>
              <div className="space-y-2">
                {registrations.filter((r) => r.status === "Rejected").map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-2.5 rounded-lg border">
                    <span className="text-sm font-medium">{reg.clubName}</span>
                    <Badge className="bg-destructive/10 text-destructive text-[10px] border-0 rounded-full">Rejected</Badge>
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
