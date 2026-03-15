import { useState } from "react";
import { mockRegistrations } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RegistrationStatusBadge } from "@/components/shared/StatusBadges";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formatIDR = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

export default function ClubRegistrations() {
  const { toast } = useToast();
  const [regs, setRegs] = useState(mockRegistrations);

  const updateStatus = (id: string, status: "Approved" | "Rejected") => {
    setRegs((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    toast({ title: status === "Approved" ? "Registrasi Disetujui" : "Registrasi Ditolak", description: `Klub berhasil ${status === "Approved" ? "disetujui" : "ditolak"}.` });
  };

  const pending = regs.filter((r) => r.status === "Pending");
  const rest = regs.filter((r) => r.status !== "Pending");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Club Registration</h1>
        <p className="text-muted-foreground text-sm mt-1">Approve atau reject pendaftaran klub ke kompetisi.</p>
      </div>

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
                        <Button size="sm" className="h-7 px-2 gap-1 text-xs" onClick={() => updateStatus(r.id, "Approved")}>
                          <Check className="w-3 h-3" />Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2 gap-1 text-xs text-destructive hover:text-destructive" onClick={() => updateStatus(r.id, "Rejected")}>
                          <X className="w-3 h-3" />Reject
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
