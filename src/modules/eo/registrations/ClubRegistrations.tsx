import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Check, X, Clock, Lock, ShieldAlert, AlertCircle, Users, Timer } from "lucide-react";
import { useCompetition, STATUS_LABELS, STATUS_COLORS, type CompetitionStatus } from "../competitions/context/CompetitionContext";
import { CompetitionSwitcher } from "../competitions/components/CompetitionSwitcher";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formatIDR = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

import { useCountdown } from "../competitions/hooks/useCountdown";

// ─── Countdown Card ─────────────────────────────────────────────────────────
function CountdownCard({ deadline, status }: { deadline: string | undefined; status: CompetitionStatus | undefined }) {
  const countdown = useCountdown(deadline);

  if (!deadline || !status) return null;

  const isOpen = status === 'registration_open';
  const isClosed = status === 'registration_closed' || status === 'active' || status === 'completed' || status === 'archived';

  if (isClosed) {
    return (
      <Card className="p-4 border-destructive/30 bg-destructive/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-semibold text-destructive">Registrasi Ditutup</p>
            <p className="text-xs text-muted-foreground">Pendaftaran tidak lagi diterima</p>
          </div>
        </div>
      </Card>
    );
  }

  if (status === 'draft') {
    return (
      <Card className="p-4 border-muted">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">Belum Dibuka</p>
            <p className="text-xs text-muted-foreground">Kompetisi masih draft. Buka registrasi di halaman Setup.</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!isOpen || !countdown) return null;

  if (countdown.expired) {
    return (
      <Card className="p-4 border-chart-4/30 bg-chart-4/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-chart-4/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-chart-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-chart-4">Deadline Terlewat</p>
            <p className="text-xs text-muted-foreground">Deadline registrasi sudah lewat tapi status masih terbuka. Pertimbangkan menutup registrasi.</p>
          </div>
        </div>
      </Card>
    );
  }

  const isUrgent = countdown.days <= 3;

  return (
    <Card className={cn("p-4", isUrgent ? "border-chart-4/30 bg-chart-4/5" : "border-chart-2/30 bg-chart-2/5")}>
      <div className="flex items-center gap-4">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", isUrgent ? "bg-chart-4/10" : "bg-chart-2/10")}>
          <Timer className={cn("w-5 h-5", isUrgent ? "text-chart-4" : "text-chart-2")} />
        </div>
        <div className="flex-1">
          <p className={cn("text-sm font-semibold", isUrgent ? "text-chart-4" : "text-chart-2")}>
            Deadline Registrasi
          </p>
          <p className="text-xs text-muted-foreground">{new Date(deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div className="flex gap-3 text-center">
          <div>
            <div className={cn("text-2xl font-bold tabular-nums", isUrgent ? "text-chart-4" : "text-foreground")}>{countdown.days}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Hari</div>
          </div>
          <div className="text-muted-foreground text-lg font-light">:</div>
          <div>
            <div className={cn("text-2xl font-bold tabular-nums", isUrgent ? "text-chart-4" : "text-foreground")}>{String(countdown.hours).padStart(2, "0")}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Jam</div>
          </div>
          <div className="text-muted-foreground text-lg font-light">:</div>
          <div>
            <div className={cn("text-2xl font-bold tabular-nums", isUrgent ? "text-chart-4" : "text-foreground")}>{String(countdown.minutes).padStart(2, "0")}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Menit</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Status Badge ───────────────────────────────────────────────────────────
function RegistrationStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Approved: "bg-primary/10 text-primary",
    Pending: "bg-chart-4/10 text-chart-4",
    Rejected: "bg-destructive/10 text-destructive",
  };
  return <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", styles[status] ?? "bg-muted text-muted-foreground")}>{status}</Badge>;
}

// ─── Main Component ─────────────────────────────────────────────────────────
interface ConfirmState {
  open: boolean;
  action?: "approve" | "reject";
  registrationId?: string;
  clubName?: string;
  isLoading?: boolean;
}

export default function ClubRegistrations() {
  const { toast } = useToast();
  const { activeCompetition, competitions, registrations, competitionConfig, updateRegistration } = useCompetition();
  const [confirm, setConfirm] = useState<ConfirmState>({ open: false });

  const allRegs = registrations;
  const pending = allRegs.filter((r) => r.status === "Pending");
  const approvedCount = allRegs.filter((r) => r.status === "Approved").length;
  const totalSlots = competitionConfig.categories.reduce((sum, c) => sum + c.maxTeams, 0);
  const slotsAvailable = totalSlots - approvedCount;

  const isRegistrationOpen = activeCompetition?.status === "registration_open";
  const deadline = competitionConfig.eligibility.deadline || activeCompetition?.startDate;

  const canApprove = (reg: typeof allRegs[0]) => {
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

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club registration management">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Club Registration</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {activeCompetition
            ? `${activeCompetition.name} · ${pending.length} pending · ${approvedCount}/${totalSlots} slot`
            : "Pilih kompetisi untuk mengelola pendaftaran."}
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
          {/* Status + Countdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", STATUS_COLORS[activeCompetition.status])}>
                  {isRegistrationOpen ? <Users className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">Status Kompetisi</p>
                  <Badge className={cn("text-[10px] mt-0.5", STATUS_COLORS[activeCompetition.status])}>
                    {STATUS_LABELS[activeCompetition.status]}
                  </Badge>
                </div>
              </div>
            </Card>
            <CountdownCard deadline={deadline} status={activeCompetition.status} />
          </div>

          {/* Slot summary */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Slot Terisi</p>
              <div className="text-2xl font-bold">{approvedCount}<span className="text-base text-muted-foreground font-normal">/{totalSlots}</span></div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <div className="text-2xl font-bold text-chart-4">{pending.length}</div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Sisa Slot</p>
              <div className={cn("text-2xl font-bold", slotsAvailable <= 0 && "text-destructive")}>{slotsAvailable}</div>
            </Card>
          </div>

          {/* Pending table */}
          {pending.length > 0 && (
            <Card className={cn(isRegistrationOpen ? "border-chart-4/30 bg-chart-4/5" : "")}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{pending.length} Pending Approval</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Klub</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Pembayaran</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Biaya</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Terdaftar</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Validasi</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pending.map((r) => {
                      const approval = canApprove(r);
                      return (
                        <TableRow key={r.id} className="hover:bg-accent/30">
                          <TableCell className="font-medium text-sm">{r.clubName}</TableCell>
                          <TableCell>
                            <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", r.paymentStatus === "Paid" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                              {r.paymentStatus === "Paid" ? "Lunas" : "Belum Bayar"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm tabular-nums">{formatIDR(r.fee)}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{r.registeredAt}</TableCell>
                          <TableCell>
                            {approval.ok ? (
                              <Badge className="text-[10px] bg-primary/10 text-primary rounded-full border-0">✓ Valid</Badge>
                            ) : (
                              <span className="text-xs text-destructive flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />{approval.reason}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="h-7 px-2 gap-1 text-xs"
                                disabled={!approval.ok}
                                onClick={() => setConfirm({ open: true, action: "approve", registrationId: r.id, clubName: r.clubName })}
                              >
                                <Check className="w-3 h-3" />Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 gap-1 text-xs text-destructive hover:text-destructive"
                                disabled={!isRegistrationOpen}
                                onClick={() => setConfirm({ open: true, action: "reject", registrationId: r.id, clubName: r.clubName })}
                              >
                                <X className="w-3 h-3" />Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* All registrations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Semua Registrasi ({allRegs.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Klub</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Pembayaran</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Biaya</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allRegs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Belum ada registrasi</TableCell>
                    </TableRow>
                  ) : (
                    allRegs.map((r) => (
                      <TableRow key={r.id} className="hover:bg-accent/30">
                        <TableCell className="font-medium text-sm">{r.clubName}</TableCell>
                        <TableCell><RegistrationStatusBadge status={r.status} /></TableCell>
                        <TableCell>
                          <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", r.paymentStatus === "Paid" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                            {r.paymentStatus === "Paid" ? "Lunas" : "Belum Bayar"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm tabular-nums">{formatIDR(r.fee)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{r.registeredAt}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
