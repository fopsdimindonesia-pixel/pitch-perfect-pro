import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

export default function CompetitionOverview() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition overview">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Competition Overview</h1>
          <p className="text-muted-foreground mt-1">View competition details and status</p>
        </div>
        <Button className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Competition
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="text-2xl font-bold mt-2">Active</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Teams</p>
          <p className="text-2xl font-bold mt-2">16</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Matches</p>
          <p className="text-2xl font-bold mt-2">48</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Start Date</p>
          <p className="text-xl font-bold mt-2">Jan 2024</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Competition Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Competition Name:</span>
            <span className="font-medium">Football Championship 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Organizer:</span>
            <span className="font-medium">PSSI Makassar</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">Makassar, Indonesia</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Format:</span>
            <span className="font-medium">Group Stage + Knockout</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
