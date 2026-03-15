import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal } from "lucide-react";
import { mockClubData } from "@/lib/mockClubData";

const categoryIcons: Record<string, React.ReactNode> = {
  League: <Trophy className="w-6 h-6 text-gold" />,
  Cup: <Medal className="w-6 h-6 text-navy" />,
  Tournament: <Award className="w-6 h-6 text-primary" />,
};

const categoryColors: Record<string, string> = {
  League: "bg-gold/10 text-gold-foreground",
  Cup: "bg-navy/10 text-navy",
  Tournament: "bg-primary/10 text-primary",
};

export default function ClubAchievements() {
  const { achievements } = mockClubData;

  // Group by category
  const byCategory = achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.category]) acc[achievement.category] = [];
      acc[achievement.category].push(achievement);
      return acc;
    },
    {} as Record<string, typeof achievements>
  );

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club achievements">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Club Achievements</h1>
        <p className="text-muted-foreground mt-1">Tournament wins and major milestones</p>
      </div>

      {/* Achievement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(byCategory).map(([category, items]) => (
          <Card key={category}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex-shrink-0">
                {categoryIcons[category]}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{category} Wins</p>
                <p className="text-3xl font-bold">{items.length}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements by Category */}
      {Object.entries(byCategory).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {categoryIcons[category]}
            {category} Titles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((achievement) => (
              <Card
                key={achievement.id}
                className={`hover:shadow-card-hover transition-all border-2 ${categoryColors[category]}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <p className="font-bold text-lg leading-tight">{achievement.title}</p>
                    </div>
                    <Badge className="flex-shrink-0">{achievement.year}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{category} Championship</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Records */}
      <Card>
        <CardHeader>
          <CardTitle>Club Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Best Season</p>
              <p className="text-2xl font-bold text-primary">2023</p>
              <p className="text-sm text-muted-foreground">Regional Youth Championship</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Consecutive Wins</p>
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Matches (2023 Season)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Players in National Team</p>
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">Current representation</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Founded</p>
              <p className="text-2xl font-bold text-primary">2010</p>
              <p className="text-sm text-muted-foreground">13+ years of excellence</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
