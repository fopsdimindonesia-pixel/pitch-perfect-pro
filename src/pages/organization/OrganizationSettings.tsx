import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OrganizationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your organization</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Organization Name</label>
              <Input defaultValue="PSSI Central" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Organization Type</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option selected>Federation</option>
                <option>Regional</option>
                <option>League</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea className="w-full px-3 py-2 border rounded-md" rows={4} placeholder="Organization description..." />
            </div>
            <Button>Save Changes</Button>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Logo</label>
              <input type="file" className="w-full" accept="image/*" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <input type="file" className="w-full" accept="image/*" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input type="color" className="w-20 h-10 rounded" defaultValue="#0066cc" />
            </div>
            <Button>Save Changes</Button>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Email Notifications</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Member Updates</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Activity Alerts</label>
              <input type="checkbox" />
            </div>
            <Button>Save Changes</Button>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Two-Factor Authentication</label>
              <p className="text-sm text-muted-foreground mb-2">Enhance security with 2FA</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-4">
          <Card className="p-6 space-y-4 border-red-200 bg-red-50">
            <div>
              <h3 className="text-lg font-semibold text-red-900">Delete Organization</h3>
              <p className="text-sm text-red-800 mt-1">This action cannot be undone</p>
              <Button variant="destructive" className="mt-4">Delete Organization</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
