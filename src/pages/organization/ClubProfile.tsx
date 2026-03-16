import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockClubs } from "@/lib/mockData";

export default function ClubProfile() {
  const club = mockClubs[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{club.name}</h1>
        <p className="text-muted-foreground">City: {club.city}</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Club Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Players</p>
                <p className="text-2xl font-bold">{club.players}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-2xl font-bold">{club.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registered</p>
                <p className="text-lg font-medium">{club.registeredAt}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">League</p>
                <p className="text-lg font-medium">{club.eoName}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="players">
          <Card className="p-6">
            <p className="text-muted-foreground">Player roster interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card className="p-6">
            <p className="text-muted-foreground">Staff management interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="matches">
          <Card className="p-6">
            <p className="text-muted-foreground">Match history interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card className="p-6">
            <p className="text-muted-foreground">Media gallery interface here</p>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6">
            <p className="text-muted-foreground">Club history interface here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
