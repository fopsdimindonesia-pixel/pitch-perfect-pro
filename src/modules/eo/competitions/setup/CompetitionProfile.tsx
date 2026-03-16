import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Trophy, Calendar, FileText, Settings } from "lucide-react";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

const statusColors: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  Draft: "bg-secondary text-muted-foreground",
  Finished: "bg-muted text-muted-foreground",
};

export default function CompetitionProfile() {
  const { activeCompetition, matches, registrations } = useCompetition();

  return (
    <div className="space-y-6" role="main" aria-label="Competition profile">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Profile</h1>
        <p className="text-muted-foreground mt-1">Detail dan pengaturan kompetisi</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Format</p>
              <p className="text-2xl font-bold mt-2">{activeCompetition.format}</p>
              <p className="text-xs text-muted-foreground mt-1">{activeCompetition.ageGroup}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Teams</p>
              <p className="text-2xl font-bold mt-2">{registrations.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Registered</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Matches</p>
              <p className="text-2xl font-bold mt-2">{matches.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge className={`mt-2 ${statusColors[activeCompetition.status]}`}>{activeCompetition.status}</Badge>
            </Card>
          </div>

          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="border-b rounded-none w-full justify-start bg-muted/50 h-auto p-0">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  <BarChart3 className="w-4 h-4 mr-2" />Overview
                </TabsTrigger>
                <TabsTrigger value="teams" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  <Users className="w-4 h-4 mr-2" />Teams
                </TabsTrigger>
                <TabsTrigger value="matches" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  <Trophy className="w-4 h-4 mr-2" />Matches
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  <Settings className="w-4 h-4 mr-2" />Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <p className="text-sm text-muted-foreground mt-2">{activeCompetition.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <p className="text-sm text-muted-foreground mt-1">{activeCompetition.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <p className="text-sm text-muted-foreground mt-1">{activeCompetition.endDate}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Registration Fee</label>
                  <p className="text-sm text-muted-foreground mt-1">Rp {activeCompetition.registrationFee.toLocaleString('id-ID')}</p>
                </div>
              </TabsContent>

              <TabsContent value="teams" className="p-6">
                <div className="space-y-3">
                  {registrations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Belum ada tim terdaftar</p>
                  ) : (
                    registrations.map((reg) => (
                      <div key={reg.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                        <div>
                          <p className="text-sm font-medium">{reg.clubName}</p>
                          <p className="text-xs text-muted-foreground">Fee: {reg.paymentStatus}</p>
                        </div>
                        <Badge variant={reg.status === "Approved" ? "default" : "secondary"}>{reg.status}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="matches" className="p-6">
                {matches.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Belum ada pertandingan terjadwal</p>
                ) : (
                  <div className="space-y-2">
                    {matches.map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-2 text-sm border-b last:border-b-0">
                        <span>{m.homeTeam} vs {m.awayTeam}</span>
                        <Badge variant="outline">{m.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <Button>Edit Competition Settings</Button>
              </TabsContent>
            </Tabs>
          </Card>
        </>
      )}
    </div>
  );
}
