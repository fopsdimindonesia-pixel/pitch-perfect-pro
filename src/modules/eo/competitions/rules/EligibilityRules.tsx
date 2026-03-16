import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompetition } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";

export default function EligibilityRules() {
  const { activeCompetition } = useCompetition();

  // Parse age from ageGroup like "U13" → 13
  const maxAge = activeCompetition ? parseInt(activeCompetition.ageGroup.replace(/\D/g, '')) || 18 : 18;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Player Eligibility Rules</h1>
        <p className="text-muted-foreground mt-1">Configure age and registration requirements</p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : (
        <Card className="p-6">
          <Tabs defaultValue="age" className="w-full">
            <TabsList>
              <TabsTrigger value="age">Age Requirements</TabsTrigger>
              <TabsTrigger value="registration">Registration Rules</TabsTrigger>
            </TabsList>

            <TabsContent value="age" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">Rules for: {activeCompetition.name} ({activeCompetition.ageGroup})</p>
              <div>
                <label className="block text-sm font-medium mb-2">Maximum Age</label>
                <div className="flex gap-2">
                  <Input type="number" defaultValue={maxAge} />
                  <span className="text-sm text-muted-foreground flex items-center">years old</span>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-sm font-medium">Allow age-group exceptions with written approval</span>
                </label>
              </div>
              <Button>Save Age Requirements</Button>
            </TabsContent>

            <TabsContent value="registration" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">Registration deadline for: {activeCompetition.name}</p>
              <div>
                <label className="block text-sm font-medium mb-2">Registration Deadline</label>
                <Input type="date" defaultValue={activeCompetition.startDate} />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-sm font-medium">Require birth certificate for age verification</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-sm font-medium">Require parental consent for U-18 players</span>
                </label>
              </div>
              <Button>Save Registration Rules</Button>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
}
