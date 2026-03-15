import { useState } from "react";
import { mockPlayerFees } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/StatCard";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { DollarSign, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { focusVisibleClass } from "@/lib/accessibility";

const months = ["Jan 2024", "Feb 2024", "Mar 2024"];

export default function ClubFinancial() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  const totalPaid = mockPlayerFees.reduce(
    (sum, pf) => sum + pf.months.filter((m) => m.status === "Paid").length, 0
  );
  const totalUnpaid = mockPlayerFees.reduce(
    (sum, pf) => sum + pf.months.filter((m) => m.status === "Unpaid").length, 0
  );

  if (isLoading) {
    return <LoadingSkeleton rows={6} type="table" />;
  }

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club financial management">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 id="page-title" className="text-2xl font-bold tracking-tight">Financial Klub</h1>
          <p className="text-muted-foreground text-sm mt-1">Status iuran bulanan pemain.</p>
        </div>
        <Button size="sm" variant="outline" className={cn("gap-2", focusVisibleClass)} onClick={handleRefresh} disabled={isLoading} aria-label="Refresh financial data">
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4" role="group" aria-label="Financial statistics">
        <StatCard title="Pembayaran Lunas" value={totalPaid} icon={CheckCircle} accent="primary" />
        <StatCard title="Belum Bayar" value={totalUnpaid} icon={AlertCircle} accent="destructive" />
        <StatCard title="Total Iuran/Bulan" value="Rp 300.000" icon={DollarSign} accent="gold" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Status Iuran Pemain</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table role="table" aria-label="Player financial status">
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider" role="columnheader">Pemain</TableHead>
                {months.map((m) => (
                  <TableHead key={m} className="text-center text-xs font-semibold uppercase tracking-wider" role="columnheader">{m}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPlayerFees.map((pf) => (
                <TableRow key={pf.playerId} className="hover:bg-accent/30">
                  <TableCell className="font-medium text-sm">{pf.playerName}</TableCell>
                  {pf.months.map((m) => (
                    <TableCell key={m.month} className="text-center">
                      <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0", m.status === "Paid" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                        {m.status === "Paid" ? "✓" : "✗"}
                      </Badge>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
