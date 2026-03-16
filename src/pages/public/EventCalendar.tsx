import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventCalendar() {
  const events = [
    { date: "2024-03-23", title: "vs FC Jakarta (Away)", type: "Match" },
    { date: "2024-03-25", title: "Training Session", type: "Training" },
    { date: "2024-03-30", title: "vs Surabaya FC (Home)", type: "Match" },
    { date: "2024-04-06", title: "Cup Final", type: "Match" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Event Calendar</h1>
        <p className="text-muted-foreground mt-1">Upcoming matches and events</p>
      </div>

      <div className="space-y-2">
        {events.map((event, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Badge className={event.type === "Match" ? "bg-primary" : "bg-secondary"}>{event.type}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
