import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const mockRegions = [
  { id: "1", name: "Makassar Region", leagues: 8, clubs: 145, members: 2890 },
  { id: "2", name: "Jakarta Region", leagues: 12, clubs: 230, members: 4560 },
  { id: "3", name: "Surabaya Region", leagues: 6, clubs: 98, members: 1840 },
  { id: "4", name: "Bandung Region", leagues: 7, clubs: 125, members: 2340 },
];

export default function RegionalOrganizationSystem() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Regional Organization System</h1>
        <p className="text-muted-foreground mt-1">Manage regional football organizations</p>
      </div>

      {/* Map Placeholder */}
      <Card className="p-12 text-center bg-muted">
        <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Interactive map would be displayed here</p>
      </Card>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRegions.map((region) => (
          <Card key={region.id} className="p-6">
            <h3 className="font-semibold text-lg mb-4">{region.name}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Leagues</p>
                <p className="text-2xl font-bold">{region.leagues}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Clubs</p>
                <p className="text-2xl font-bold">{region.clubs}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Members</p>
                <p className="text-2xl font-bold">{region.members}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
