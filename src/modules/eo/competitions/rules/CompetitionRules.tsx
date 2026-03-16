import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function CompetitionRules() {
  const { activeCompetition } = useCompetition();

  const [rules, setRules] = useState({
    general: `1. All players must be registered with valid identification
2. Coaches must hold valid coaching credentials
3. Teams must comply with all regulations
4. Matches are subject to official FIFA rules with modifications`,
    match: `1. Match duration: 2 x 40 minutes (U-12), 2 x 45 minutes (U-14+)
2. Water breaks allowed at 20-minute marks
3. Each team allowed 3 substitutions per match
4. Extra time only in knockout stages`,
    discipline: `1. Yellow card accumulation: 3 cards = 1 match ban
2. Red card suspension: Minimum 1 match ban
3. Violent conduct: Minimum 3 match ban + fine
4. Abusive language: 1 match ban + fine`,
  });

  return (
    <div className="space-y-6" role="main" aria-label="Competition rules">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Rules</h1>
        <p className="text-muted-foreground mt-1">Manage competition rules and regulations</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <Card>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="border-b rounded-none w-full justify-start bg-muted/50 h-auto p-0">
              <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">General Rules</TabsTrigger>
              <TabsTrigger value="match" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Match Rules</TabsTrigger>
              <TabsTrigger value="discipline" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Discipline Rules</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">Rules for: {activeCompetition.name}</p>
              <Textarea value={rules.general} onChange={(e) => setRules({ ...rules, general: e.target.value })} className="min-h-64 font-mono text-sm" />
              <Button>Save General Rules</Button>
            </TabsContent>

            <TabsContent value="match" className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">Match rules for: {activeCompetition.name}</p>
              <Textarea value={rules.match} onChange={(e) => setRules({ ...rules, match: e.target.value })} className="min-h-64 font-mono text-sm" />
              <Button>Save Match Rules</Button>
            </TabsContent>

            <TabsContent value="discipline" className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">Discipline for: {activeCompetition.name}</p>
              <Textarea value={rules.discipline} onChange={(e) => setRules({ ...rules, discipline: e.target.value })} className="min-h-64 font-mono text-sm" />
              <Button>Save Discipline Rules</Button>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
}
