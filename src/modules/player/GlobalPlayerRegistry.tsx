import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, ShieldCheck, AlertTriangle, Globe, Eye } from "lucide-react";
import { globalPlayers } from "@/lib/playerEcosystemData";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/context/RoleContext";

export default function GlobalPlayerRegistry() {
  const { role } = useRole();
  const isClub = role === "club";
  const clubName = "SSB Garuda Muda";
  
  // Club sees only own players, EO/Owner sees all
  const visiblePlayers = isClub
    ? globalPlayers.filter(p => p.currentClub === clubName)
    : globalPlayers;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = visiblePlayers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.globalId.toLowerCase().includes(search.toLowerCase()) ||
      p.currentClub.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesVerification = verificationFilter === "all" || p.verificationStatus === verificationFilter;
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const stats = {
    total: visiblePlayers.length,
    verified: visiblePlayers.filter((p) => p.verificationStatus === "Verified").length,
    pending: visiblePlayers.filter((p) => p.verificationStatus === "Pending").length,
    active: visiblePlayers.filter((p) => p.status === "Active").length,
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      Active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      Injured: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      Suspended: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      "Free Agent": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      Retired: "bg-muted text-muted-foreground",
    };
    return map[status] || "bg-muted text-muted-foreground";
  };

  const getVerificationColor = (status: string) => {
    const map: Record<string, string> = {
      Verified: "bg-primary/10 text-primary",
      Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      Rejected: "bg-destructive/10 text-destructive",
      Expired: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    };
    return map[status] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Player Registry</h1>
        <p className="text-muted-foreground mt-1">Registry pemain nasional lintas club dan kompetisi</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Users className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Pemain</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30"><ShieldCheck className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.verified}</p>
                <p className="text-xs text-muted-foreground">Terverifikasi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30"><AlertTriangle className="w-5 h-5 text-yellow-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Menunggu Verifikasi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30"><Globe className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Aktif Bermain</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cari nama, ID, atau club..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Injured">Injured</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
            <SelectItem value="Free Agent">Free Agent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={verificationFilter} onValueChange={setVerificationFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Verifikasi" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="Verified">Verified</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Player Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Pemain</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verifikasi</TableHead>
                  <TableHead className="text-right">App</TableHead>
                  <TableHead className="text-right">Goals</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((player) => (
                  <TableRow key={player.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-xs text-muted-foreground">{player.globalId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={player.photo} alt={player.name} className="w-8 h-8 rounded-full bg-muted" />
                        <div>
                          <p className="font-medium text-sm">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.nationality} • {player.age} thn</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{player.position}</Badge></TableCell>
                    <TableCell className="text-sm">{player.currentClub}</TableCell>
                    <TableCell><Badge className={getStatusColor(player.status)}>{player.status}</Badge></TableCell>
                    <TableCell><Badge className={getVerificationColor(player.verificationStatus)}>{player.verificationStatus}</Badge></TableCell>
                    <TableCell className="text-right tabular-nums">{player.totalAppearances}</TableCell>
                    <TableCell className="text-right tabular-nums font-semibold">{player.totalGoals}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/player/passport/${player.id}`)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
