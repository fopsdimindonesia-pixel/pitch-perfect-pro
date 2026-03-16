import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Printer, QrCode, ShieldCheck, AlertTriangle } from "lucide-react";
import { globalPlayers } from "@/lib/playerEcosystemData";
import { useRole } from "@/context/RoleContext";

export default function PlayerECard() {
  const { role } = useRole();
  const isClub = role === "club";
  const clubName = "SSB Garuda Muda";
  
  const visiblePlayers = isClub
    ? globalPlayers.filter(p => p.currentClub === clubName)
    : globalPlayers;

  const [selectedId, setSelectedId] = useState(visiblePlayers[0]?.id || globalPlayers[0].id);
  const cardRef = useRef<HTMLDivElement>(null);
  const player = visiblePlayers.find((p) => p.id === selectedId) || visiblePlayers[0] || globalPlayers[0];

  const handlePrint = () => {
    window.print();
  };

  const verificationIcon = player.verificationStatus === "Verified"
    ? <ShieldCheck className="w-3 h-3" />
    : <AlertTriangle className="w-3 h-3" />;

  const verificationColor = player.verificationStatus === "Verified"
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isClub ? "E-Card Pemain Klub" : "Player E-Card (QR)"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isClub ? `Kartu digital pemain ${clubName}` : "Kartu digital pemain dengan QR code verifikasi resmi SoccerOS."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />Print
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="w-4 h-4" />Download PNG
          </Button>
        </div>
      </div>

      {/* Player Selector */}
      <div className="print:hidden">
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="w-72 h-9 text-sm">
            <SelectValue placeholder="Pilih pemain" />
          </SelectTrigger>
          <SelectContent>
            {globalPlayers.map((p) => (
              <SelectItem key={p.id} value={p.id} className="text-sm">
                {p.globalId} — {p.name} ({p.position})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* E-Card - Printable Layout */}
      <div className="flex justify-center">
        <div ref={cardRef} className="w-[340px] print:w-[85mm] print:mx-auto">
          <Card className="overflow-hidden shadow-lg print:shadow-none border-2">
            {/* Header */}
            <div className="bg-gradient-to-r from-navy to-primary p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-semibold">SoccerOS Platform</p>
                  <p className="font-bold text-base text-white">{player.currentClub}</p>
                  <p className="text-[9px] text-white/50">{player.nationality} • Season 2024</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                  <span className="text-white font-black text-xl">{player.currentClub.charAt(0)}</span>
                </div>
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              {/* Player Info */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-[76px] h-[96px] rounded-lg overflow-hidden bg-muted border-2 border-border">
                    <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Nama Lengkap</p>
                    <p className="font-bold text-sm leading-tight truncate">{player.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Posisi</p>
                      <p className="text-xs font-semibold">{player.position}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Tinggi/Berat</p>
                      <p className="text-xs font-semibold">{player.height}/{player.weight}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Tanggal Lahir</p>
                      <p className="text-xs font-medium">{player.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Kaki</p>
                      <p className="text-xs font-medium">{player.foot}</p>
                    </div>
                  </div>
                  <Badge className={`${verificationColor} gap-1 text-[10px]`}>
                    {verificationIcon} {player.verificationStatus}
                  </Badge>
                </div>
              </div>

              {/* IDs */}
              <div className="pt-2 border-t border-border space-y-1">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Global ID</p>
                    <p className="text-xs font-mono font-bold tracking-wider">{player.globalId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Passport</p>
                    <p className="text-xs font-mono font-semibold tracking-wider">{player.passportNumber}</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-[72px] h-[72px] rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center flex-shrink-0">
                  <div className="text-center">
                    <QrCode className="w-7 h-7 text-muted-foreground mx-auto" />
                    <p className="text-[7px] text-muted-foreground mt-0.5">QR Verify</p>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-muted-foreground leading-tight">
                    Scan QR code ini untuk verifikasi identitas pemain melalui sistem SoccerOS secara real-time.
                  </p>
                  <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate">
                    sos://verify/{player.globalId}
                  </p>
                </div>
              </div>

              {/* Stats Mini */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border">
                {[
                  { label: "App", value: player.totalAppearances },
                  { label: "Goals", value: player.totalGoals },
                  { label: "Assists", value: player.totalAssists },
                  { label: "Caps", value: player.internationalCaps },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-base font-bold tabular-nums">{s.value}</p>
                    <p className="text-[8px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Footer */}
            <div className="bg-muted/50 px-4 py-1.5 border-t">
              <p className="text-[8px] text-muted-foreground text-center">
                Diterbitkan oleh SoccerOS Platform • Valid s.d. {player.passportExpiry} • {player.lastVerifiedAt}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
