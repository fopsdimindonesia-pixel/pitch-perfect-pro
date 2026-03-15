import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PlayerAvailability() {
  const availability = [
    { name: "Rizky Pratama", status: "Available", next: "Always" },
    { name: "Andi Kusuma", status: "Suspended", next: "2024-03-22" },
    { name: "Budi Santoso", status: "Injured", next: "2024-04-15" },
    { name: "Citra Wijaya", status: "Available", next: "Always" },
  ];

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player availability">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Player Availability</h1>
        <p className="text-muted-foreground mt-1">Current playing status</p>
      </div>

      <div className="space-y-2">
        {availability.map((a, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{a.name}</p>
                <div className="text-right">
                  <Badge className={a.status === "Available" ? "bg-green-100 text-green-800" : a.status === "Injured" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                    {a.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Back: {a.next}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
