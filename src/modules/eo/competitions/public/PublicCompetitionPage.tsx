import { Card } from "@/components/ui/card";
import { Trophy, Users, BarChart3, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PublicCompetitionPage() {
  return (
    <div className="space-y-8" role="main" aria-label="Public competition page">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-lg">
        <h1 id="page-title" className="text-4xl font-bold">PSSI U-16 Championship 2024</h1>
        <p className="text-blue-100 mt-2">Annual championship for youth football players</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-muted-foreground">Teams</p>
          </div>
          <p className="text-2xl font-bold">24</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-muted-foreground">Matches</p>
          </div>
          <p className="text-2xl font-bold">48</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-muted-foreground">Players</p>
          </div>
          <p className="text-2xl font-bold">400+</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-red-600" />
            <p className="text-sm text-muted-foreground">Venue</p>
          </div>
          <p className="text-sm font-medium">Makassar</p>
        </Card>
      </div>

      {/* Information */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">About This Competition</h2>
        <p className="text-muted-foreground mb-4">
          The PSSI U-16 Championship is one of the most prestigious youth football competitions in the region. 
          Teams from across Indonesia compete to showcase their talent and advance to regional competitions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-sm">Dates</p>
            <p className="text-muted-foreground">May 1 - July 30, 2024</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Location</p>
            <p className="text-muted-foreground">Makassar, Indonesia</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Organizer</p>
            <p className="text-muted-foreground">PSSI Makassar</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Status</p>
            <Badge className="w-fit mt-1">Active</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
