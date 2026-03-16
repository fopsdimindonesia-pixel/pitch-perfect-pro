import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, ShieldCheck, ShieldAlert, Search, ScanLine, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { globalPlayers, verificationLogs } from "@/lib/playerEcosystemData";
import { useRole } from "@/context/RoleContext";

export default function PlayerVerificationSystem() {
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState<null | { found: boolean; player?: typeof globalPlayers[0] }>(null);
  const [filterResult, setFilterResult] = useState("all");

  const handleScan = () => {
    const player = globalPlayers.find(
      (p) => p.globalId.toLowerCase() === scanInput.toLowerCase() || p.passportNumber.toLowerCase() === scanInput.toLowerCase()
    );
    setScanResult(player ? { found: true, player } : { found: false });
  };

  const filteredLogs = verificationLogs.filter(
    (log) => filterResult === "all" || log.result === filterResult
  );

  const stats = {
    total: verificationLogs.length,
    verified: verificationLogs.filter((l) => l.result === "Verified").length,
    failed: verificationLogs.filter((l) => l.result === "Failed").length,
    expired: verificationLogs.filter((l) => l.result === "Expired").length,
    mismatch: verificationLogs.filter((l) => l.result === "Mismatch").length,
  };

  const resultConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    Verified: { icon: <CheckCircle2 className="w-4 h-4" />, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    Failed: { icon: <XCircle className="w-4 h-4" />, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
    Expired: { icon: <Clock className="w-4 h-4" />, color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
    Mismatch: { icon: <AlertTriangle className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Player Verification System</h1>
        <p className="text-muted-foreground mt-1">Sistem verifikasi identitas pemain via QR code, manual, atau biometric</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Scan", value: stats.total, icon: <ScanLine className="w-5 h-5" />, bg: "bg-primary/10" },
          { label: "Verified", value: stats.verified, icon: <CheckCircle2 className="w-5 h-5 text-green-600" />, bg: "bg-green-100 dark:bg-green-900/30" },
          { label: "Failed", value: stats.failed, icon: <XCircle className="w-5 h-5 text-red-600" />, bg: "bg-red-100 dark:bg-red-900/30" },
          { label: "Expired", value: stats.expired, icon: <Clock className="w-5 h-5 text-orange-600" />, bg: "bg-orange-100 dark:bg-orange-900/30" },
          { label: "Mismatch", value: stats.mismatch, icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />, bg: "bg-yellow-100 dark:bg-yellow-900/30" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Scan */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />Quick Verification
          </CardTitle>
          <CardDescription>Masukkan Global ID atau Passport Number untuk verifikasi manual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="SOS-XXXXXX atau SOS-PAS-XXXXXX"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="pl-9 font-mono"
              />
            </div>
            <Button onClick={handleScan} className="gap-2">
              <ScanLine className="w-4 h-4" />Verifikasi
            </Button>
          </div>

          {/* Scan Result */}
          {scanResult && (
            <div className={`mt-4 p-4 rounded-lg border-2 ${scanResult.found ? "border-green-200 bg-green-50 dark:bg-green-900/10" : "border-red-200 bg-red-50 dark:bg-red-900/10"}`}>
              {scanResult.found && scanResult.player ? (
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-10 h-10 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-green-800 dark:text-green-400">VERIFIED ✓</p>
                      <Badge className="bg-green-100 text-green-800">{scanResult.player.verificationStatus}</Badge>
                    </div>
                    <p className="text-sm mt-1"><strong>{scanResult.player.name}</strong> — {scanResult.player.position} • {scanResult.player.currentClub}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ID: {scanResult.player.globalId} • Medical: {scanResult.player.medicalClearance ? "✅ Cleared" : "❌ Not Cleared"}
                    </p>
                  </div>
                  <img src={scanResult.player.photo} alt="" className="w-14 h-14 rounded-lg bg-muted" />
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <ShieldAlert className="w-10 h-10 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-800 dark:text-red-400">NOT FOUND ✗</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      ID &quot;{scanInput}&quot; tidak ditemukan dalam registry. Pastikan ID yang dimasukkan benar.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Log Verifikasi</CardTitle>
              <CardDescription>Riwayat verifikasi pemain</CardDescription>
            </div>
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Mismatch">Mismatch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Waktu</TableHead>
                  <TableHead>Pemain</TableHead>
                  <TableHead>Metode</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Diverifikasi Oleh</TableHead>
                  <TableHead>Hasil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const config = resultConfig[log.result] || resultConfig.Failed;
                  return (
                    <TableRow key={log.id} className="hover:bg-muted/50">
                      <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                      <TableCell className="font-medium text-sm">{log.playerName}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{log.method}</Badge></TableCell>
                      <TableCell className="text-sm">{log.location}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.verifiedBy}</TableCell>
                      <TableCell>
                        <Badge className={`${config.color} gap-1`}>
                          {config.icon} {log.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
