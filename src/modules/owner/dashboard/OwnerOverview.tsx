import { StatCard } from "@/components/shared/StatCard";
import { MatchCard } from "@/components/shared/MatchCard";
import { Building2, Shield, Users, Trophy, DollarSign, Swords } from "lucide-react";
import { mockPlatformStats, mockMatches, mockEOs } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EOStatusBadge } from "@/components/shared/StatusBadges";

export default function OwnerOverview() {
  const s = mockPlatformStats;
  const formatIDR = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Platform overview">
      <div>
        <h1 id="page-title" className="text-2xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitoring seluruh ekosistem Football Platform.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Event Organizer" value={s.totalEOs} icon={Building2} trend={{ value: 25, label: "vs last month" }} accent="primary" />
        <StatCard title="Total Clubs" value={s.totalClubs} icon={Shield} trend={{ value: 12, label: "vs last month" }} accent="navy" />
        <StatCard title="Total Players" value={s.totalPlayers} icon={Users} trend={{ value: 8, label: "vs last month" }} accent="primary" />
        <StatCard title="Active Competitions" value={s.activeCompetitions} icon={Trophy} trend={{ value: 50, label: "vs last month" }} accent="gold" />
        <StatCard title="Total Matches" value={s.totalMatches} icon={Swords} accent="primary" />
        <StatCard title="Revenue" value={formatIDR(s.totalRevenue)} icon={DollarSign} trend={{ value: 13, label: "vs last month" }} accent="gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold">Recent Matches</h2>
          <div className="space-y-3">
            {mockMatches.slice(0, 3).map((m) => (
              <MatchCard key={m.id} {...m} competitionName={m.competitionName} />
            ))}
          </div>
        </div>

        {/* EO Quick Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Event Organizers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockEOs.map((eo) => (
              <div key={eo.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{eo.name}</p>
                  <p className="text-xs text-muted-foreground">{eo.competitions} kompetisi · {eo.clubs} klub</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">{eo.plan}</span>
                  <EOStatusBadge status={eo.status as "Active" | "Suspended"} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
