import { mockEOs } from "@/lib/mockData";
import { EOStatusBadge } from "@/components/shared/StatusBadges";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const planColors: Record<string, string> = {
  Starter: "text-muted-foreground",
  Pro: "text-primary font-semibold",
  Enterprise: "text-gold-foreground font-semibold",
};

const formatIDR = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

export default function EOManagement() {
  const [search, setSearch] = useState("");
  const filtered = mockEOs.filter((eo) => eo.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">EO Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Kelola semua Event Organizer di platform.</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah EO
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base">Daftar EO</CardTitle>
            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Cari EO..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Nama EO</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Plan</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Kompetisi</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Klub</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Revenue</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Bergabung</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((eo) => (
                <TableRow key={eo.id} className="hover:bg-accent/30">
                  <TableCell className="font-medium text-sm">{eo.name}</TableCell>
                  <TableCell className={`text-sm ${planColors[eo.plan]}`}>{eo.plan}</TableCell>
                  <TableCell className="text-center text-sm tabular-nums">{eo.competitions}</TableCell>
                  <TableCell className="text-center text-sm tabular-nums">{eo.clubs}</TableCell>
                  <TableCell className="text-sm tabular-nums">{formatIDR(eo.revenue)}</TableCell>
                  <TableCell><EOStatusBadge status={eo.status as "Active" | "Suspended"} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{eo.joinedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-7 h-7">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem className="text-sm">Lihat Detail</DropdownMenuItem>
                        <DropdownMenuItem className="text-sm">Edit Plan</DropdownMenuItem>
                        <DropdownMenuItem className="text-sm text-destructive">
                          {eo.status === "Active" ? "Suspend" : "Aktifkan"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
