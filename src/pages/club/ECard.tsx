import { useState } from "react";
import { mockPlayers } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerEligibilityBadge } from "@/components/shared/StatusBadges";
import { Download, Printer, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ECard() {
  const [selectedId, setSelectedId] = useState(mockPlayers[0].id);
  const player = mockPlayers.find((p) => p.id === selectedId) || mockPlayers[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">E-Card Pemain (QR)</h1>
          <p className="text-muted-foreground text-sm mt-1">Cetak kartu digital pemain dengan QR code verifikasi.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Printer className="w-4 h-4" />Print</Button>
          <Button size="sm" className="gap-2"><Download className="w-4 h-4" />Download PNG</Button>
        </div>
      </div>

      {/* Player selector */}
      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger className="w-64 h-8 text-sm">
          <SelectValue placeholder="Pilih pemain" />
        </SelectTrigger>
        <SelectContent>
          {mockPlayers.map((p) => (
            <SelectItem key={p.id} value={p.id} className="text-sm">
              #{p.number} {p.name} ({p.position})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* E-Card */}
      <div className="flex justify-center">
        <Card className={cn("w-80 overflow-hidden shadow-card-hover print:shadow-none")}>
          {/* Header */}
          <div className="bg-navy p-4 text-navy-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-navy-foreground/60 font-semibold">FootballOS Platform</p>
                <p className="font-bold text-lg">SSB Garuda Muda</p>
                <p className="text-[10px] text-navy-foreground/60">Makassar · Indonesia</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xl">G</span>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Player photo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-muted border-2 border-border">
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Player info */}
              <div className="flex-1 space-y-1.5">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Nama</p>
                  <p className="font-bold text-sm leading-tight">{player.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Posisi</p>
                    <p className="text-xs font-semibold">{player.position}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">No. Punggung</p>
                    <p className="text-xl font-black tabular-nums text-primary">{player.number}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tanggal Lahir</p>
                  <p className="text-xs font-medium">{player.dob}</p>
                </div>
                <PlayerEligibilityBadge status={player.eligibility} />
              </div>
            </div>

            {/* ID Number */}
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ID Pemain</p>
              <p className="text-xs font-mono font-semibold tracking-wider">{player.idNumber}</p>
            </div>

            {/* QR Code placeholder */}
            <div className="mt-3 flex items-center gap-3">
              <div className="aspect-square w-20 h-20 rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <QrCode className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-[8px] text-muted-foreground mt-1">QR Code</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Scan untuk verifikasi keaslian kartu pemain ini melalui sistem FootballOS.</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-1">fos://verify/{player.idNumber}</p>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <div className="bg-muted/50 px-4 py-2">
            <p className="text-[9px] text-muted-foreground text-center">
              Kartu ini diterbitkan oleh FootballOS Platform · Valid untuk Musim 2024
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
