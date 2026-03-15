import { mockAuditLog } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const actionColors: Record<string, string> = {
  CREATE_COMPETITION: "bg-primary/10 text-primary",
  APPROVE_REGISTRATION: "bg-primary/10 text-primary",
  ADD_PLAYER: "bg-primary/10 text-primary",
  SUSPEND_EO: "bg-destructive/10 text-destructive",
  UPDATE_MATCH_SCORE: "bg-gold/15 text-gold-foreground",
  SUBMIT_LINEUP: "bg-secondary text-secondary-foreground",
  CREATE_EO: "bg-primary/10 text-primary",
};

const entityIcons: Record<string, string> = {
  Competition: "🏆",
  Club: "🛡️",
  Player: "👤",
  EO: "🏢",
  Match: "⚽",
};

export default function AuditLog() {
  const [search, setSearch] = useState("");
  const filtered = mockAuditLog.filter(
    (l) => l.actor.includes(search) || l.action.includes(search.toUpperCase()) || l.entity.toLowerCase().includes(search.toLowerCase()),
  );

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground text-sm mt-1">Riwayat aktivitas seluruh pengguna platform.</p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Cari aktivitas..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-8 text-sm" />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{filtered.length} aktivitas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          {filtered.map((log, i) => (
            <div key={log.id} className={cn("flex gap-4 px-6 py-4 hover:bg-accent/30 transition-colors", i !== filtered.length - 1 && "border-b border-border")}>
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
                  {entityIcons[log.entityType] || "📋"}
                </div>
                {i !== filtered.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-start gap-2 flex-wrap">
                  <Badge className={cn("text-[10px] px-2 py-0.5 rounded-full font-mono border-0", actionColors[log.action] || "bg-secondary text-secondary-foreground")}>
                    {log.action}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{log.entityType}</span>
                </div>
                <p className="text-sm font-medium mt-1">{log.entity}</p>
                <p className="text-xs text-muted-foreground mt-0.5">oleh <span className="font-medium text-foreground">{log.actor}</span> · IP: {log.ip}</p>
              </div>
              <p className="text-xs text-muted-foreground flex-shrink-0">{formatTime(log.timestamp)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
