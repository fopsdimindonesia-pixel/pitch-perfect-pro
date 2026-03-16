import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompetitionSetup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Competition Setup</h1>
          <p className="text-muted-foreground mt-1">Configure competition settings</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="format">Competition Format</TabsTrigger>
          <TabsTrigger value="rules">Rules & Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Competition Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" defaultValue="Football Championship 2024" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea className="w-full px-3 py-2 border rounded-lg" rows={4} defaultValue="Annual football championship..." />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="format" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Competition Format</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Format Type</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Group Stage + Knockout</option>
                  <option>Round Robin</option>
                  <option>Single Elimination</option>
                  <option>Double Elimination</option>
                </select>
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Rules & Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Allow Overtime</span>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Use Golden Goal</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
