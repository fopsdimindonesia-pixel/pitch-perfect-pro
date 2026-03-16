import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrganizationPublicPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="h-64 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">PSSI Central</h1>
          <p className="text-xl text-blue-100">Indonesian Football Organization</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <Trophy className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <p className="text-sm text-muted-foreground">Competitions</p>
          <p className="text-3xl font-bold mt-2">45</p>
        </Card>
        <Card className="p-6 text-center">
          <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <p className="text-sm text-muted-foreground">Members</p>
          <p className="text-3xl font-bold mt-2">2,500+</p>
        </Card>
        <Card className="p-6 text-center">
          <Globe className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <p className="text-sm text-muted-foreground">Regions</p>
          <p className="text-3xl font-bold mt-2">34</p>
        </Card>
      </div>

      {/* About */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-muted-foreground mb-4">
          PSSI Central is the governing body for football in Indonesia. We organize and manage competitions at all levels.
        </p>
        <p className="text-muted-foreground">
          Our mission is to develop the sport of football and nurture talented players throughout the nation.
        </p>
      </Card>

      {/* Members Preview */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4">Our Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Club 1", "Club 2", "Club 3", "Club 4"].map((club) => (
            <div key={club} className="p-4 border rounded-lg text-center">
              <p className="font-medium">{club}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Button className="px-8 py-3 text-lg">Join Us</Button>
        <Button variant="outline" className="px-8 py-3 text-lg">Contact Admin</Button>
      </div>
    </div>
  );
}
