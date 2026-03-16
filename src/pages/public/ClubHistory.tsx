import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClubHistory() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Our History</h1>
        <p className="text-muted-foreground mt-1">Club heritage and milestones</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="pb-4 border-b">
              <p className="font-bold text-lg">1987</p>
              <p className="text-sm">PSMA United founded</p>
            </div>
            <div className="pb-4 border-b">
              <p className="font-bold text-lg">1995</p>
              <p className="text-sm">First National Championship Victory</p>
            </div>
            <div className="pb-4 border-b">
              <p className="font-bold text-lg">2005</p>
              <p className="text-sm">Joined International Competitions</p>
            </div>
            <div>
              <p className="font-bold text-lg">2023</p>
              <p className="text-sm">Modern Stadium Expansion Project</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
