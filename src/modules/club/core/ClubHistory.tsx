import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockClubData } from "@/lib/mockClubData";

export default function ClubHistory() {
  const { history, club } = mockClubData;

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club history">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Club History</h1>
        <p className="text-muted-foreground mt-1">{club.name} - Timeline of milestones</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-navy" />

        {/* Timeline items */}
        <div className="space-y-8">
          {history.map((item, idx) => (
            <div key={idx} className="relative pl-24">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-16 h-16 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                </div>
              </div>

              {/* Card */}
              <Card className="hover:shadow-card-hover transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge className="mb-2 bg-primary/10 text-primary">{item.year}</Badge>
                      <p className="font-semibold text-lg">{item.event}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Club Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{new Date().getFullYear() - parseInt(club.founded)}</p>
              <p className="text-sm text-muted-foreground mt-1">Years Active</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-navy">4</p>
              <p className="text-sm text-muted-foreground mt-1">Major Titles</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gold">1200+</p>
              <p className="text-sm text-muted-foreground mt-1">Players Developed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Tournament Wins</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
