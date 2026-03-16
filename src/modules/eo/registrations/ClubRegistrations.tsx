import { useState, useMemo } from "react";
import { mockRegistrations } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RegistrationStatusBadge } from "@/components/shared/StatusBadges";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, Check, X, AlertTriangle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { registrationValidator } from "@/services/registrationValidator";
import { ValidationErrorAlert } from "@/components/registration/ValidationErrorAlert";
import { ValidationWarningAlert } from "@/components/registration/ValidationWarningAlert";
import { RegistrationDetails } from "@/components/registration/RegistrationDetails";
import { ValidationSummary } from "@/components/registration/ValidationSummary";
import { ValidationResult } from "@/types/registration";

const formatIDR = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

interface ConfirmState {
  open: boolean;
  action?: "approve" | "reject";
  registrationId?: string;
  clubName?: string;
  competitionName?: string;
  isLoading?: boolean;
  validationResult?: ValidationResult | null;
}

interface ValidationState {
  registrationId?: string;
  validationResult?: ValidationResult | null;
  isValidating: boolean;
}

interface DetailsModalState {
  open: boolean;
  registrationId?: string;
}

export default function ClubRegistrations() {
  const { toast } = useToast();
  const [regs, setRegs] = useState(mockRegistrations);
  const [confirm, setConfirm] = useState<ConfirmState>({ open: false });
  const [validation, setValidation] = useState<ValidationState>({ isValidating: false });
  const [detailsModal, setDetailsModal] = useState<DetailsModalState>({ open: false });

  // Get current registration for details modal
  const currentRegistration = detailsModal.registrationId
    ? regs.find((r) => r.id === detailsModal.registrationId)
    : null;

  const openConfirm = async (
    id: string,
    action: "approve" | "reject",
    clubName: string,
    competitionName: string
  ) => {
    if (action === "approve") {
      // Run validation before showing confirm dialog
      setValidation({ registrationId: id, isValidating: true });

      try {
        // Find the registration
        const reg = regs.find((r) => r.id === id);
        if (!reg) {
          toast({ title: "Error", description: "Registrasi tidak ditemukan", variant: "destructive" });
          return;
        }

        // Run validator
        const result = await registrationValidator.validateRegistration(id, {
          registration: reg,
          competition: {
            id: reg.competitionId,
            name: reg.competitionName,
            constraints: reg.competitionConstraints,
          },
        });

        setValidation({ registrationId: id, validationResult: result, isValidating: false });

        // If there are blocking errors, show them and don't proceed
        const errors = result.errors.filter((e) => e.severity === "error");
        if (errors.length > 0) {
          toast({
            title: "Validasi Gagal",
            description: `Ditemukan ${errors.length} masalah yang harus diselesaikan terlebih dahulu`,
            variant: "destructive",
          });
          return;
        }

        // If validation passes, show approve dialog
        setConfirm({
          open: true,
          action,
          registrationId: id,
          clubName,
          competitionName,
          isLoading: false,
          validationResult: result,
        });
      } catch (error) {
        console.error("Validation error:", error);
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat validasi",
          variant: "destructive",
        });
        setValidation({ isValidating: false });
      }
    } else {
      // For reject, no validation needed
      setConfirm({
        open: true,
        action,
        registrationId: id,
        clubName,
        competitionName,
        isLoading: false,
      });
    }
  };

  const updateStatus = (status: "Approved" | "Rejected") => {
    if (!confirm.registrationId) return;

    setConfirm((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    setTimeout(() => {
      setRegs((prev) =>
        prev.map((r) => (r.id === confirm.registrationId ? { ...r, status } : r))
      );
      toast({
        title: status === "Approved" ? "Registrasi Disetujui" : "Registrasi Ditolak",
        description: `${confirm.clubName} untuk ${confirm.competitionName} berhasil ${
          status === "Approved" ? "disetujui" : "ditolak"
        }.`,
      });
      setConfirm({ open: false });
      setValidation({ isValidating: false });
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club registration management">
      <div>
        <h1 id="page-title" className="text-2xl font-bold tracking-tight">Club Registration</h1>
        <p className="text-muted-foreground text-sm mt-1">Approve atau reject pendaftaran klub ke kompetisi dengan validasi otomatis.</p>
      </div>

      {/* Validation Alerts Modal (when validating, show validation details) */}
      {validation.registrationId && validation.validationResult && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 space-y-4">
            <ValidationSummary result={validation.validationResult} />

            {validation.validationResult.errors.length > 0 && (
              <ValidationErrorAlert
                errors={validation.validationResult.errors}
                className="mt-3"
              />
            )}

            {validation.validationResult.warnings.length > 0 && (
              <ValidationWarningAlert
                warnings={validation.validationResult.warnings}
                className="mt-3"
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Approval Confirmation Dialog */}
      <ConfirmDialog
        open={confirm.open}
        title={confirm.action === "approve" ? "Setujui Registrasi" : "Tolak Registrasi"}
        description={
          confirm.action === "approve"
            ? `Anda yakin ingin menyetujui registrasi ${confirm.clubName} untuk ${confirm.competitionName}? Semua validasi telah lulus.`
            : `Anda yakin ingin menolak registrasi ${confirm.clubName} untuk ${confirm.competitionName}? Tindakan ini tidak dapat dibatalkan.`
        }
        actionLabel={confirm.action === "approve" ? "Setujui" : "Tolak"}
        isDangerous={confirm.action === "reject"}
        isLoading={confirm.isLoading}
        onConfirm={() => updateStatus(confirm.action === "approve" ? "Approved" : "Rejected")}
        onCancel={() => setConfirm({ open: false })}
      />

      {/* Registration Details Modal */}
      {currentRegistration && (
        <Dialog open={detailsModal.open} onOpenChange={(open) => setDetailsModal({ ...detailsModal, open })}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentRegistration.clubName}</DialogTitle>
              <DialogDescription>
                {currentRegistration.competitionName} • {currentRegistration.registeredAt}
              </DialogDescription>
            </DialogHeader>
            <RegistrationDetails
              registration={currentRegistration}
              constraints={currentRegistration.competitionConstraints}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Pending Approvals Section */}
      {regs.filter((r) => r.status === "Pending").length > 0 && (
        <Card className="border-gold/30 bg-gold/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gold-foreground">
              {regs.filter((r) => r.status === "Pending").length} Pending Approval
            </CardTitle>
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
                {regs.filter((r) => r.status === "Pending").map((r) => (
                  <TableRow key={r.id} className="hover:bg-accent/30">
                    <TableCell className="font-medium text-sm">{r.clubName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.competitionName}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full border-0",
                          r.paymentStatus === "Paid"
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        )}
                      >
                        {r.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm tabular-nums">{formatIDR(r.fee)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.registeredAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-foreground"
                          onClick={() => setDetailsModal({ open: true, registrationId: r.id })}
                          disabled={validation.isValidating && validation.registrationId === r.id}
                        >
                          <Eye className="w-3 h-3" />
                          Details
                        </Button>

                        <Button
                          size="sm"
                          className="h-7 px-2 gap-1 text-xs"
                          onClick={() => openConfirm(r.id, "approve", r.clubName, r.competitionName)}
                          disabled={validation.isValidating && validation.registrationId === r.id}
                        >
                          {validation.isValidating && validation.registrationId === r.id ? (
                            <>
                              <span className="animate-spin">⏳</span>
                              Validasi...
                            </>
                          ) : (
                            <>
                              <Check className="w-3 h-3" />
                              Approve
                            </>
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 gap-1 text-xs text-destructive hover:text-destructive"
                          onClick={() => openConfirm(r.id, "reject", r.clubName, r.competitionName)}
                          disabled={validation.isValidating && validation.registrationId === r.id}
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
