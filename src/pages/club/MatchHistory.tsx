import { mockMatchHistory } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MatchHistory() {
  const resultColors = {
    W: "bg-primary/10 text-primary",
    D: "bg-secondary text-muted-foreground",
    L: "bg-destructive/10 text-destructive",
  };
  const resultLabel = { W: "Menang", D: "Seri", L: "Kalah" };

  const wins = mockMatchHistory.filter((m) => m.result === "W").length;
  const draws = mockMatchHistory.filter((m) => m.result === "D").length;
  const losses = mockMatchHistory.filter((m) => m.result === "L").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Riwayat Pertandingan</h1>
        <p className="text-muted-foreground text-sm mt-1">Seluruh pertandingan yang telah dimainkan.</p>
      </div>

      {/* W/D/L summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-black tabular-nums text-primary">{wins}</p>
            <p className="text-xs text-muted-foreground mt-1">Menang</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-black tabular-nums text-muted-foreground">{draws}</p>
            <p className="text-xs text-muted-foreground mt-1">Seri</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-black tabular-nums text-destructive">{losses}</p>
            <p className="text-xs text-muted-foreground mt-1">Kalah</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Semua Pertandingan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Tanggal</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Lawan</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Kompetisi</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Kandang/Tandang</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Skor</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Hasil</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMatchHistory.map((m) => (
                <TableRow key={m.id} className="hover:bg-accent/30">
                  <TableCell className="text-xs text-muted-foreground">{m.date}</TableCell>
                  <TableCell className="font-medium text-sm">{m.opponent}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.competition}</TableCell>
                  <TableCell className="text-center">
                    <Badge className="text-[10px] px-2 py-0.5 rounded-full border-0 bg-secondary text-muted-foreground">
                      {m.isHome ? "Kandang" : "Tandang"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-bold tabular-nums text-sm">
                    {m.isHome ? `${m.homeScore}–${m.awayScore}` : `${m.awayScore}–${m.homeScore}`}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full border-0 font-semibold", resultColors[m.result as keyof typeof resultColors])}>
                      {resultLabel[m.result as keyof typeof resultLabel]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="w-7 h-7">
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
