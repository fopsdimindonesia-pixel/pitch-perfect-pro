import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EventManagement() {
  const events = [
    { id: 1, name: "Match Day Operations", date: "2024-03-23", type: "Match", status: "Scheduled", attendance: 35000 },
    { id: 2, name: "Youth Team Training", date: "2024-03-21", type: "Training", status: "Scheduled", attendance: 45 },
    { id: 3, name: "Media Conference", date: "2024-03-20", type: "Media", status: "In Progress", attendance: 12 },
    { id: 4, name: "Stadium Tour", date: "2024-03-19", type: "Tour", status: "Completed", attendance: 150 },
  ];

  const statusColor = {
    Scheduled: "bg-blue-100 text-blue-800",
    "In Progress": "bg-amber-100 text-amber-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Event Management</h1>
          <p className="text-muted-foreground mt-1">Stadium and training events</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Event
        </Button>
      </div>

      <div className="space-y-2">
        {events.map(event => (
          <Card key={event.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.date} • {event.type}</p>
                  <p className="text-xs text-muted-foreground mt-1">Expected: {event.attendance.toLocaleString()} attendees</p>
                </div>
                <Badge className={statusColor[event.status as keyof typeof statusColor]}>
                  {event.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
