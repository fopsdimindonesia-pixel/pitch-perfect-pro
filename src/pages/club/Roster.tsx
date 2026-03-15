import { useState } from "react";
import { mockPlayers, mockRegistrations } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerEligibilityBadge } from "@/components/shared/StatusBadges";
import { Plus, AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const approvedRegs = mockRegistrations.filter((r) => r.status === "Approved");

export default function Roster() {
  const { toast } = useToast();
  const [compId, setCompId] = useState(approvedRegs[0]?.competitionId || "");
  const [roster, setRoster] = useState<string[]>(mockPlayers.slice(0, 16).map((p) => p.id));

  const togglePlayer = (playerId: string) => {
    setRoster((r) =>
      r.includes(playerId)
        ? r.filter((id) => id !== playerId)
        : r.length < 22 ? [...r, playerId] : r
    );
  };

  const inRoster = mockPlayers.filter((p) => roster.includes(p.id));
  const notInRoster = mockPlayers.filter((p) => !roster.includes(p.id));
  const warnings = inRoster.filter((p) => p.eligibility !== "Verified");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Roster Kompetisi</h1>
          <p className="text-muted-foreground text-sm mt-1">Kelola daftar pemain untuk setiap kompetisi.</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => toast({ title: "Roster Disimpan", description: `${inRoster.length} pemain didaftarkan.` })}>
          <Check className="w-4 h-4" />Simpan Roster
        </Button>
      </div>

      <Select value={compId} onValueChange={setCompId}>
        <SelectTrigger className="w-72 h-8 text-sm">
          <SelectValue placeholder="Pilih kompetisi" />
        </SelectTrigger>
        <SelectContent>
          {approvedRegs.map((r) => (
            <SelectItem key={r.competitionId} value={r.competitionId} className="text-sm">{r.competitionName}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {warnings.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gold/10 border border-gold/30 text-gold-foreground text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{warnings.length} pemain dalam roster belum terverifikasi dan tidak bisa bermain.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roster */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Roster ({inRoster.length}/22)</CardTitle>
              <div className="w-32 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(inRoster.length / 22) * 100}%` }} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 max-h-96 overflow-y-auto">
            {inRoster.map((p) => (
              <div key={p.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-accent/50 transition-colors group">
                <span className="w-6 text-center text-[10px] font-bold tabular-nums text-muted-foreground">{p.number}</span>
                <img src={p.photo} alt="" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-medium flex-1 truncate">{p.name}</span>
                <PlayerEligibilityBadge status={p.eligibility} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  onClick={() => togglePlayer(p.id)}
                >
                  <span className="text-xs">×</span>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available players */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pemain Tersedia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 max-h-96 overflow-y-auto">
            {notInRoster.map((p) => (
              <div
                key={p.id}
                onClick={() => togglePlayer(p.id)}
                className={cn(
                  "flex items-center gap-2 py-1.5 px-2 rounded hover:bg-accent/50 transition-colors cursor-pointer",
                  roster.length >= 22 && "opacity-50 cursor-not-allowed",
                )}
              >
                <span className="w-6 text-center text-[10px] font-bold tabular-nums text-muted-foreground">{p.number}</span>
                <img src={p.photo} alt="" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-medium flex-1 truncate">{p.name}</span>
                <PlayerEligibilityBadge status={p.eligibility} />
                <Plus className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
            {notInRoster.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">Semua pemain sudah ada di roster.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
