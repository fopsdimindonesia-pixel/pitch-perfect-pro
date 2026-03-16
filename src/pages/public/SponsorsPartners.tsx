import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SponsorsPartners() {
  const sponsors = [
    { name: "ACME Corporation", level: "Platinum", logo: "AC", industry: "Technology" },
    { name: "Global Energy", level: "Gold", logo: "GE", industry: "Energy" },
    { name: "SportGear Ltd", level: "Gold", logo: "SG", industry: "Sports Equipment" },
    { name: "Finance Bank", level: "Silver", logo: "FB", industry: "Finance" },
  ];

  const levelColors = {
    Platinum: "bg-blue-100 text-blue-800",
    Gold: "bg-gold text-navy",
    Silver: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Sponsors & Partners</h1>
        <p className="text-muted-foreground mt-1">Official club sponsors</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsors.map((sponsor, i) => (
          <Card key={i}>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-lg bg-primary text-white flex items-center justify-center font-bold mx-auto text-2xl">
                {sponsor.logo}
              </div>
              <div>
                <p className="font-semibold text-sm">{sponsor.name}</p>
                <Badge className={levelColors[sponsor.level as keyof typeof levelColors]}>
                  {sponsor.level}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{sponsor.industry}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sponsorship Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">Interested in partnering with us?</p>
          <Button>Contact Sales</Button>
        </CardContent>
      </Card>
    </div>
  );
}
