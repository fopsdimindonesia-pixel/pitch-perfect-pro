import { mockClubs } from "@/lib/mockData";
import { ClubStatusBadge } from "@/components/shared/StatusBadges";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClubManagement() {
  const [search, setSearch] = useState("");
  const filtered = mockClubs.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Club Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Kelola semua klub sepak bola di platform.</p>
        </div>
        <Button size="sm" className="gap-2"><Plus className="w-4 h-4" />Tambah Klub</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base">Daftar Klub</CardTitle>
            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Cari klub..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-8 text-sm" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Nama Klub</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">EO</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Kota</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Pemain</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Terdaftar</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="hover:bg-accent/30">
                  <TableCell className="font-medium text-sm">{c.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.eoName}</TableCell>
                  <TableCell className="text-sm">{c.city}</TableCell>
                  <TableCell className="text-center text-sm tabular-nums">{c.players}</TableCell>
                  <TableCell><ClubStatusBadge status={c.status as "Verified" | "Pending" | "Suspended"} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{c.registeredAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-7 h-7"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem className="text-sm">Detail</DropdownMenuItem>
                        <DropdownMenuItem className="text-sm text-destructive">Suspend</DropdownMenuItem>
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
