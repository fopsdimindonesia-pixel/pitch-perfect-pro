import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ArrowRight } from "lucide-react";

export default function FixtureGenerator() {
  return (
    <div className="space-y-6" role="main" aria-label="Fixture generator">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Fixture Generator</h1>
        <p className="text-muted-foreground mt-1">Generate match fixtures automatically</p>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="league">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="league">League</TabsTrigger>
            <TabsTrigger value="knockout">Knockout</TabsTrigger>
            <TabsTrigger value="mixed">Mixed</TabsTrigger>
          </TabsList>

          <TabsContent value="league" className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium">Select Category</label>
              <select className="w-full border rounded-md p-2 mt-2 bg-white">
                <option>U-16 Male (12 teams)</option>
                <option>U-14 Female (8 teams)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Match Format</label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" defaultChecked />
                  <span className="text-sm">Round-Robin (Each team plays each other)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" />
                  <span className="text-sm">Double Round-Robin (Home and Away)</span>
                </label>
              </div>
            </div>

            <Button className="w-full mt-4">Generate Fixtures</Button>
          </TabsContent>

          <TabsContent value="knockout" className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium">Match Format</label>
              <select className="w-full border rounded-md p-2 mt-2 bg-white">
                <option>Single Elimination</option>
                <option>Quarter-Finals</option>
              </select>
            </div>
            <Button className="w-full">Generate Knockout</Button>
          </TabsContent>

          <TabsContent value="mixed" className="space-y-4 mt-6">
            <p className="text-sm text-muted-foreground">Group Round + Knockout</p>
            <Button className="w-full">Generate Mixed Format</Button>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-4 bg-green-50 border-green-200">
        <p className="text-sm font-medium text-green-900">✓ Fixtures ready for generation</p>
        <p className="text-xs text-green-700 mt-1">Total matches that will be created: 45</p>
      </Card>
    </div>
  );
}
