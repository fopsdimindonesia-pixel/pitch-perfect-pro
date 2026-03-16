import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlayerEligibilityRules() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Player Eligibility Rules</h1>
        <p className="text-muted-foreground mt-1">Configure age and registration requirements</p>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="age" className="w-full">
          <TabsList>
            <TabsTrigger value="age">Age Requirements</TabsTrigger>
            <TabsTrigger value="registration">Registration Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="age" className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Age</label>
              <div className="flex gap-2">
                <Input type="number" placeholder="Min age" defaultValue="10" />
                <span className="text-sm text-muted-foreground flex items-center">years old</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Maximum Age</label>
              <div className="flex gap-2">
                <Input type="number" placeholder="Max age" defaultValue="18" />
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
            <div>
              <label className="block text-sm font-medium mb-2">Registration Deadline</label>
              <Input type="date" defaultValue="2024-04-30" />
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Allow late registrations with additional fee</span>
              </label>
            </div>

            <Button>Save Registration Rules</Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
