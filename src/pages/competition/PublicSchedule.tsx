import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const mockSchedule = [
  { id: 1, date: "2024-05-01", time: "14:00", home: "SSB Garuda Muda", away: "FC Makassar", status: "Completed", score: "2-1" },
  { id: 2, date: "2024-05-02", time: "16:00", home: "Elite FC", away: "Youth Academy", status: "Completed", score: "3-0" },
  { id: 3, date: "2024-05-03", time: "18:00", home: "Training Center", away: "Star Academy", status: "Upcoming", score: "-" },
  { id: 4, date: "2024-05-04", time: "14:00", home: "Premier Club", away: "Kalimantan FC", status: "Upcoming", score: "-" },
];

export default function PublicSchedule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Schedule</h1>
        <p className="text-muted-foreground mt-1">View all matches</p>
      </div>

      <div className="space-y-3">
        {mockSchedule.map((match) => (
          <Card key={match.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-mono">{match.date}</span>
                <span>•</span>
                <span className="font-mono">{match.time}</span>
              </div>
              <Badge className={match.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {match.status}
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">{match.home}</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="font-mono text-lg">{match.score}</Badge>
              </div>
              <div className="flex-1 text-right">
                <p className="font-medium">{match.away}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
