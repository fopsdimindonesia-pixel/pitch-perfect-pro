import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { MatchCard } from "@/components/shared/MatchCard";
import { Trophy, Users, Calendar, Activity, Edit } from "lucide-react";
import { mockClubData } from "@/lib/mockClubData";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function ClubDashboard() {
  const { stats, recentMatches, upcomingMatches, activityTimeline } = mockClubData;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Club Dashboard</h1>
          <p className="text-muted-foreground mt-1">SSB Garuda Muda - Complete overview</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Manage Club
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Players" value={stats.totalPlayers} icon={Users} accent="primary" />
        <StatCard title="Staff" value={stats.totalStaff} icon={Trophy} accent="navy" />
        <StatCard title="Active Competitions" value={stats.activeCompetitions} icon={Calendar} accent="gold" />
        <StatCard title="Training Sessions" value={stats.trainingSessions} icon={Activity} accent="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Matches */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold">Recent Matches</h2>
          {recentMatches.map((match) => (
            <Card key={match.id} className="hover:shadow-card-hover transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{match.opponent}</p>
                  <p className="text-sm text-muted-foreground">{match.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{match.result}</p>
                  <Badge className={match.homeTeam ? "bg-primary/10 text-primary" : "bg-secondary"}>
                    {match.homeTeam ? "Home" : "Away"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Matches */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Upcoming Matches</h2>
          {upcomingMatches.map((match) => (
            <Card key={match.id}>
              <CardContent className="p-3">
                <p className="font-medium text-sm">{match.opponent}</p>
                <p className="text-xs text-muted-foreground mt-1">{match.date} · {match.time}</p>
                <p className="text-xs text-muted-foreground">{match.competition}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Club Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activityTimeline.map((activity) => (
            <div key={activity.id} className="flex gap-3 pb-4 border-b last:border-0">
              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                activity.type === "player" ? "bg-primary" :
                activity.type === "match" ? "bg-navy" :
                "bg-gold"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
