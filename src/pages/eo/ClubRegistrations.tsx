import { useState } from "react";
import { mockRegistrations } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RegistrationStatusBadge } from "@/components/shared/StatusBadges";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formatIDR = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

interface ConfirmState {
  open: boolean;
  action?: "approve" | "reject";
  registrationId?: string;
  clubName?: string;
  competitionName?: string;
  isLoading?: boolean;
}

export default function ClubRegistrations() {
  const { toast } = useToast();
  const [regs, setRegs] = useState(mockRegistrations);
  const [confirm, setConfirm] = useState<ConfirmState>({ open: false });

  const openConfirm = (id: string, action: "approve" | "reject", clubName: string, competitionName: string) => {
    setConfirm({
      open: true,
      action,
      registrationId: id,
      clubName,
      competitionName,
      isLoading: false,
    });
  };

  const updateStatus = (status: "Approved" | "Rejected") => {
    if (!confirm.registrationId) return;

    setConfirm((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    setTimeout(() => {
      setRegs((prev) => prev.map((r) => (r.id === confirm.registrationId ? { ...r, status } : r)));
      toast({
        title: status === "Approved" ? "Registrasi Disetujui" : "Registrasi Ditolak",
        description: `${confirm.clubName} untuk ${confirm.competitionName} berhasil ${status === "Approved" ? "disetujui" : "ditolak"}.`,
      });
      setConfirm({ open: false });
    }, 500);
  };

  const pending = regs.filter((r) => r.status === "Pending");
  const rest = regs.filter((r) => r.status !== "Pending");

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club registration management">
      <div>
        <h1 id="page-title" className="text-2xl font-bold tracking-tight">Club Registration</h1>
        <p className="text-muted-foreground text-sm mt-1">Approve atau reject pendaftaran klub ke kompetisi.</p>
      </div>

      <ConfirmDialog
        open={confirm.open}
        title={confirm.action === "approve" ? "Setujui Registrasi" : "Tolak Registrasi"}
        description={
          confirm.action === "approve"
            ? `Anda yakin ingin menyetujui registrasi ${confirm.clubName} untuk ${confirm.competitionName}?`
            : `Anda yakin ingin menolak registrasi ${confirm.clubName} untuk ${confirm.competitionName}? Tindakan ini tidak dapat dibatalkan.`
        }
        actionLabel={confirm.action === "approve" ? "Setujui" : "Tolak"}
        isDangerous={confirm.action === "reject"}
        isLoading={confirm.isLoading}
        onConfirm={() => updateStatus(confirm.action === "approve" ? "Approved" : "Rejected")}
        onCancel={() => setConfirm({ open: false })}
      />

      {pending.length > 0 && (
        <Card className="border-gold/30 bg-gold/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gold-foreground">{pending.length} Pending Approval</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Klub</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Kompetisi</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Pembayaran</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Biaya</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Terdaftar</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((r) => (
                  <TableRow key={r.id} className="hover:bg-accent/30">
                    <TableCell className="font-medium text-sm">{r.clubName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.competitionName}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", r.paymentStatus === "Paid" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                        {r.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm tabular-nums">{formatIDR(r.fee)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.registeredAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-7 px-2 gap-1 text-xs"
                          onClick={() => openConfirm(r.id, "approve", r.clubName, r.competitionName)}
                        >
                          <Check className="w-3 h-3" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 gap-1 text-xs text-destructive hover:text-destructive"
                          onClick={() => openConfirm(r.id, "reject", r.clubName, r.competitionName)}
                        >
                          <X className="w-3 h-3" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Semua Registrasi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Klub</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Kompetisi</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Pembayaran</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Biaya</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regs.map((r) => (
                <TableRow key={r.id} className="hover:bg-accent/30">
                  <TableCell className="font-medium text-sm">{r.clubName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.competitionName}</TableCell>
                  <TableCell><RegistrationStatusBadge status={r.status as "Approved" | "Pending" | "Rejected"} /></TableCell>
                  <TableCell>
                    <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", r.paymentStatus === "Paid" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                      {r.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm tabular-nums">{formatIDR(r.fee)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r.registeredAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
