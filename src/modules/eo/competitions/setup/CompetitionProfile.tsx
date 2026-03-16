import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Calendar, Trophy, FileText, Settings, Settings2 } from "lucide-react";

const mockCompetition = {
  name: "PSSI U-16 Championship 2024",
  description: "Annual championship for U-16 age groups across Makassar and surrounding regions",
  startDate: "2024-05-01",
  endDate: "2024-07-30",
  organizer: "PSSI Makassar",
  categories: 3,
  ageGroups: 4,
  totalTeams: 24,
  totalMatches: 48,
  status: "Active"
};

export default function CompetitionProfile() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition profile">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Profile</h1>
        <p className="text-muted-foreground mt-1">{mockCompetition.organizer}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Categories</p>
          <p className="text-2xl font-bold mt-2">{mockCompetition.categories}</p>
          <p className="text-xs text-muted-foreground mt-1">Age groups</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Teams</p>
          <p className="text-2xl font-bold mt-2">{mockCompetition.totalTeams}</p>
          <p className="text-xs text-muted-foreground mt-1">Registered</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Matches</p>
          <p className="text-2xl font-bold mt-2">{mockCompetition.totalMatches}</p>
          <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Status</p>
          <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          <p className="text-xs text-muted-foreground mt-2">Ongoing</p>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="border-b rounded-none w-full justify-start bg-muted/50 h-auto p-0">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="teams" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Users className="w-4 h-4 mr-2" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="matches" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Trophy className="w-4 h-4 mr-2" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="standings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Standings
            </TabsTrigger>
            <TabsTrigger value="media" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <FileText className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="documents" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Description</label>
              <p className="text-sm text-muted-foreground mt-2">{mockCompetition.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <p className="text-sm text-muted-foreground mt-1">{mockCompetition.startDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <p className="text-sm text-muted-foreground mt-1">{mockCompetition.endDate}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="p-6">
            <div className="space-y-3">
              {[
                { name: "SSB Garuda Muda", category: "U-16 Male", status: "Confirmed" },
                { name: "FC Makassar", category: "U-16 Female", status: "Confirmed" },
                { name: "Youth Academy", category: "U-14 Mixed", status: "Pending" },
              ].map((team, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.category}</p>
                  </div>
                  <Badge variant={team.status === "Confirmed" ? "default" : "secondary"}>{team.status}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="p-6">
            <p className="text-sm text-muted-foreground">48 matches scheduled across all categories and age groups</p>
          </TabsContent>

          <TabsContent value="standings" className="p-6">
            <p className="text-sm text-muted-foreground">Live standings will appear here during competition</p>
          </TabsContent>

          <TabsContent value="media" className="p-6">
            <p className="text-sm text-muted-foreground">Media gallery coming soon</p>
          </TabsContent>

          <TabsContent value="documents" className="p-6">
            <p className="text-sm text-muted-foreground">Competition documents and files</p>
          </TabsContent>

          <TabsContent value="settings" className="p-6">
            <Button>Edit Competition Settings</Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
