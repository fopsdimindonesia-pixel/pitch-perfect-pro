import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trophy, TrendingUp, Plus } from "lucide-react";
import { mockClubData } from "@/lib/mockClubData";

export default function YouthTeams() {
  const { youthTeams } = mockClubData;

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Youth teams\">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Youth Teams</h1>
          <p className="text-muted-foreground mt-1">Academy age categories</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Team
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-3xl font-bold">{youthTeams.length}</p>
              <p className="text-sm text-muted-foreground">Teams</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{youthTeams.reduce((sum, t) => sum + t.playerCount, 0)}</p>
              <p className="text-sm text-muted-foreground">Players</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">8</p>
              <p className="text-sm text-muted-foreground">Coaches</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-navy">15</p>
              <p className="text-sm text-muted-foreground">Staff</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {youthTeams.map(team => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{team.category}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{team.ageRange} years</p>
                </div>
                <Trophy className="w-5 h-5 text-gold" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-3xl font-bold text-primary">{team.playerCount}</p>
                  <p className="text-sm text-muted-foreground">Players</p>
                </div>
                <div className="flex-1 h-12 bg-gradient-to-r from-primary to-navy rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                  {team.division}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Coach: {team.coach}</p>
                <Badge variant="outline">{team.status}</Badge>
              </div>
              <Button variant="outline" className="w-full">View Team</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
