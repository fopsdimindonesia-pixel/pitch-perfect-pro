import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, TrendingUp } from "lucide-react";

export default function CompetitionDashboard() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition dashboard">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Dashboard</h1>
        <p className="text-muted-foreground mt-1">Live competition overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Matches Today</p>
              <p className="text-2xl font-bold mt-1">3</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Upcoming</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Teams</p>
              <p className="text-2xl font-bold mt-1">24</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Participation</p>
              <p className="text-2xl font-bold mt-1">75%</p>
            </div>
            <Trophy className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Today's Matches</h2>
        <div className="space-y-3">
          {[
            { time: "14:00", home: "SSB Garuda Muda", away: "FC Makassar" },
            { time: "16:00", home: "Youth Academy", away: "Training Center" },
            { time: "18:00", home: "Elite FC", away: "Star Academy" },
          ].map((match, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
              <span className="text-sm font-mono text-muted-foreground">{match.time}</span>
              <span className="text-sm font-medium flex-1 mx-4">{match.home}</span>
              <span className="text-xs text-muted-foreground">vs</span>
              <span className="text-sm font-medium flex-1 ml-4">{match.away}</span>
              <Badge variant="outline">Live Soon</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Recent Results</h2>
        <div className="space-y-2">
          {[
            { home: "Team A", score: "3-1", away: "Team B" },
            { home: "Team C", score: "2-2", away: "Team D" },
          ].map((result, i) => (
            <div key={i} className="flex items-center justify-between p-2 text-sm border-b last:border-b-0">
              <span>{result.home}</span>
              <Badge className="font-mono">{result.score}</Badge>
              <span>{result.away}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
