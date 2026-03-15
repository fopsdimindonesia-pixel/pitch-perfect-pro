import { useState } from "react";
import { mockPlayers } from "@/lib/mockData";
import { PlayerEligibilityBadge } from "@/components/shared/StatusBadges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, QrCode, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 10;

export default function Players() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = mockPlayers.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.position.includes(search.toUpperCase()),
  );
  const paged = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const posColors: Record<string, string> = {
    GK: "bg-gold/15 text-gold-foreground",
    CB: "bg-navy/10 text-navy", LB: "bg-navy/10 text-navy", RB: "bg-navy/10 text-navy",
    CM: "bg-primary/10 text-primary", DM: "bg-primary/10 text-primary", AM: "bg-primary/10 text-primary",
    LW: "bg-secondary text-secondary-foreground", RW: "bg-secondary text-secondary-foreground",
    ST: "bg-destructive/10 text-destructive", SS: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daftar Pemain</h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} pemain terdaftar di klub ini.</p>
        </div>
        <Button size="sm" className="gap-2"><Plus className="w-4 h-4" />Tambah Pemain</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base">Skuat</CardTitle>
            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Cari pemain atau posisi..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-8 h-8 text-sm" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-10 text-center text-xs font-semibold uppercase tracking-wider">#</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Pemain</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Posisi</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Usia</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Tanggal Lahir</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="w-20 text-center text-xs font-semibold uppercase tracking-wider">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((p) => (
                <TableRow key={p.id} className="hover:bg-accent/30">
                  <TableCell className="text-center text-xs font-bold tabular-nums text-muted-foreground">{p.number}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0">
                        <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{p.idNumber}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${posColors[p.position] || "bg-secondary text-secondary-foreground"}`}>
                      {p.position}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-sm tabular-nums">{p.age}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.dob}</TableCell>
                  <TableCell><PlayerEligibilityBadge status={p.eligibility} /></TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => navigate("/club/ecard")}>
                        <QrCode className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-7 h-7"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem className="text-sm">Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-sm">Detail</DropdownMenuItem>
                          <DropdownMenuItem className="text-sm text-destructive">Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Sebelumnya</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>Berikutnya</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
