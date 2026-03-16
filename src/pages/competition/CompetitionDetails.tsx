import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function CompetitionDetails() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition details">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Competition Details</h1>
          <p className="text-muted-foreground mt-1">View and manage detailed competition information</p>
        </div>
        <Button className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Details
        </Button>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Basic Info</TabsTrigger>
          <TabsTrigger value="dates">Important Dates</TabsTrigger>
          <TabsTrigger value="details">Additional Details</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Competition Name</p>
                <p className="font-semibold mt-1">Football Championship 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Organizer</p>
                <p className="font-semibold mt-1">PSSI Makassar</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold mt-1">Makassar, Indonesia</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Competition Type</p>
                <p className="font-semibold mt-1">Tournament</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="dates" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Registration Start</p>
                <p className="font-semibold mt-1">January 1, 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registration End</p>
                <p className="font-semibold mt-1">January 20, 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Competition Start</p>
                <p className="font-semibold mt-1">February 1, 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Competition End</p>
                <p className="font-semibold mt-1">March 31, 2024</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Maximum Teams</p>
                <p className="font-semibold mt-1">16</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Players per Team</p>
                <p className="font-semibold mt-1">11-18</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Match Format</p>
                <p className="font-semibold mt-1">90 minutes + 2x45 minutes</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Competition Format</p>
                <p className="font-semibold mt-1">Group Stage + Knockout</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
