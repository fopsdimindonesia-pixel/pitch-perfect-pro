import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerHistory() {
  const player = mockPlayerData.players[0];
  const careerHistory = mockPlayerData.careerHistory.filter(ch => ch.playerId === player.id);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Transfer":
        return "bg-blue-100 text-blue-800";
      case "Achievement":
        return "bg-gold text-navy";
      case "International":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const typeEmojis: Record<string, string> = {
    Transfer: "🔄",
    Achievement: "🏆",
    International: "🌍",
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player history">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Player History</h1>
        <p className="text-muted-foreground mt-1">{player.name} • Career timeline</p>
      </div>

      <div className="relative">
        {/* Timeline */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-navy" />

        {/* Timeline Events */}
        <div className="space-y-6 ml-24">
          {careerHistory.length > 0 ? (
            careerHistory.map((event, i) => (
              <div key={event.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-20 top-2 w-6 h-6 rounded-full border-4 border-background bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-2xl font-bold text-primary">{event.year}</p>
                        <p className="font-semibold mt-1">{event.event}</p>
                      </div>
                      <Badge className={getTypeColor(event.type)}>
                        {typeEmojis[event.type]} {event.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No career history recorded yet
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-navy/5 border-primary/20">
        <CardHeader>
          <CardTitle>Career Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-3xl font-bold">{player.appearances}</p>
            <p className="text-xs text-muted-foreground mt-1">Appearances</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gold">{player.goals}</p>
            <p className="text-xs text-muted-foreground mt-1">Goals Scored</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-navy">{player.assists}</p>
            <p className="text-xs text-muted-foreground mt-1">Assists Provided</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{player.internationalCaps}</p>
            <p className="text-xs text-muted-foreground mt-1">International Caps</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
