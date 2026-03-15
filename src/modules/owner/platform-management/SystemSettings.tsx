import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function GlobalSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Global Settings</h1>
        <p className="text-muted-foreground mt-1">Platform-wide configuration options</p>
      </div>

      <div className="space-y-4">
        {/* Notification Settings */}
        <Card className="p-0">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notification Settings</h2>
              <ChevronDown className="w-5 h-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6 space-y-4 border-t">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Email Notifications</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">SMS Notifications</label>
                <input type="checkbox" className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Push Notifications</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notification Frequency</label>
                <select className="w-full px-3 py-2 border rounded-md text-sm">
                  <option>Immediate</option>
                  <option>Daily Digest</option>
                  <option>Weekly Digest</option>
                </select>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Email Settings */}
        <Card className="p-0">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Email Configuration</h2>
              <ChevronDown className="w-5 h-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6 space-y-4 border-t">
              <div>
                <label className="block text-sm font-medium mb-2">SMTP Server</label>
                <Input defaultValue="smtp.sendgrid.net" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">SMTP Port</label>
                <Input type="number" defaultValue="587" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">From Email</label>
                <Input type="email" defaultValue="noreply@pitchperfectpro.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">From Name</label>
                <Input defaultValue="Pitch Perfect Pro" />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Security Settings */}
        <Card className="p-0">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Security Settings</h2>
              <ChevronDown className="w-5 h-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6 space-y-4 border-t">
              <div>
                <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                <Input type="number" defaultValue="30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password Expiry (days)</label>
                <Input type="number" defaultValue="90" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Require 2FA for Admins</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">IP Whitelist Enabled</label>
                <input type="checkbox" className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">SSL/TLS Required</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* API Settings */}
        <Card className="p-0">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold">API Settings</h2>
              <ChevronDown className="w-5 h-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6 space-y-4 border-t">
              <div>
                <label className="block text-sm font-medium mb-2">Rate Limit (requests/minute)</label>
                <Input type="number" defaultValue="1000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Request Size (MB)</label>
                <Input type="number" defaultValue="10" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">API Versioning</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">CORS Enabled</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Storage Settings */}
        <Card className="p-0">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Storage Settings</h2>
              <ChevronDown className="w-5 h-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-6 space-y-4 border-t">
              <div>
                <label className="block text-sm font-medium mb-2">Cloud Storage Provider</label>
                <select className="w-full px-3 py-2 border rounded-md text-sm">
                  <option>AWS S3</option>
                  <option>Google Cloud Storage</option>
                  <option>Azure Blob</option>
                  <option>Local Storage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Upload Size (MB)</label>
                <Input type="number" defaultValue="100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">File Retention (days)</label>
                <Input type="number" defaultValue="365" />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button>Save All Settings</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
