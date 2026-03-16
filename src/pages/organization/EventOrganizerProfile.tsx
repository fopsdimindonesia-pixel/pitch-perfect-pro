import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockEOs } from "@/lib/mockData";

export default function EventOrganizerProfile() {
  const eo = mockEOs[0];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{eo.name}</h1>
          <p className="text-muted-foreground mt-1">{eo.plan} Plan Member</p>
          <p className="text-sm text-muted-foreground mt-2">Joined: {eo.joinedAt}</p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events Hosted</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Competitions</p>
                <p className="text-2xl font-bold">{eo.competitions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clubs</p>
                <p className="text-2xl font-bold">{eo.clubs}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Revenue</p>
                <p className="text-2xl font-bold">Rp {eo.revenue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="p-6">
            <p className="text-muted-foreground">Events listing interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="p-6">
            <p className="text-muted-foreground">Team management interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="p-6">
            <p className="text-muted-foreground">Reviews and ratings here</p>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <p className="text-muted-foreground">Document management here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
