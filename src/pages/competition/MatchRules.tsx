import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatchRules() {
  return (
    <div className="space-y-6" role="main" aria-label="Match rules">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Match Rules</h1>
        <p className="text-muted-foreground mt-1">Set match duration and substitution rules</p>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="duration">
          <TabsList>
            <TabsTrigger value="duration">Match Duration</TabsTrigger>
            <TabsTrigger value="substitutions">Substitutions</TabsTrigger>
            <TabsTrigger value="extratime">Extra Time</TabsTrigger>
          </TabsList>

          <TabsContent value="duration" className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">U-12 Match Duration</label>
              <div className="flex gap-2 mt-2">
                <Input type="number" placeholder="Minutes" defaultValue="40" className="w-32" />
                <span className="text-sm text-muted-foreground flex items-center">minutes per half</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">U-14+ Match Duration</label>
              <div className="flex gap-2 mt-2">
                <Input type="number" placeholder="Minutes" defaultValue="45" className="w-32" />
                <span className="text-sm text-muted-foreground flex items-center">minutes per half</span>
              </div>
            </div>

            <Button>Save</Button>
          </TabsContent>

          <TabsContent value="substitutions" className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">Maximum Substitutions Per Match</label>
              <Input type="number" placeholder="Number" defaultValue="3" className="w-32 mt-2" />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer mt-4">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Allow tactical substitutions (unlimited)</span>
              </label>
            </div>

            <Button>Save</Button>
          </TabsContent>

          <TabsContent value="extratime" className="space-y-4 mt-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Enable extra time in knockout stages</span>
              </label>
            </div>

            <div>
              <label className="text-sm font-medium">Extra Time Duration</label>
              <div className="flex gap-2 mt-2">
                <Input type="number" placeholder="Minutes" defaultValue="5" className="w-32" />
                <span className="text-sm text-muted-foreground flex items-center">minutes per period</span>
              </div>
            </div>

            <Button>Save</Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
