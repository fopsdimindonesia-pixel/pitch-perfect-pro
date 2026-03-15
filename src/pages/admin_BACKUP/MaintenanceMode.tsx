import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";

export default function MaintenanceMode() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Maintenance Mode</h1>
        <p className="text-muted-foreground mt-1">Temporarily disable platform for maintenance</p>
      </div>

      {/* Current Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Maintenance Status</h2>
            <p className="text-sm text-muted-foreground mt-1">Platform is currently operational</p>
          </div>
          <Badge className="bg-green-100 text-green-800">Active</Badge>
        </div>
      </Card>

      {/* Enable Maintenance */}
      <Card className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">Enable Maintenance Mode</h2>
            <p className="text-sm text-muted-foreground">Users will see a maintenance page and cannot access the platform</p>
          </div>
          <Switch className="ml-4" />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Maintenance Message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                defaultValue="Scheduled Maintenance"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md text-sm min-h-32 resize-none"
                defaultValue="We're performing scheduled maintenance to improve the platform. We expect to be back online soon. Thank you for your patience!"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">What's Being Updated</h2>
          <div className="space-y-3">
            {[
              "Server Infrastructure",
              "Database Optimization",
              "Security Updates",
              "Feature Improvements"
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Estimated Duration</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input type="datetime-local" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estimated End Time</label>
              <input type="datetime-local" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Allowed Users</h2>
          <p className="text-sm text-muted-foreground mb-3">These users can still access the platform during maintenance</p>
          
          <div className="space-y-2 mb-4">
            {["System Admins", "Support Staff"].map((role, i) => (
              <label key={i} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                {role}
              </label>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Additional IP Addresses (one per line)</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md text-sm min-h-20 resize-none font-mono text-xs"
              placeholder="192.168.1.1
192.168.1.2"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm">Send email notification to users</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm">Show in-app banner before maintenance</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm">Notify administrators only</span>
            </label>
          </div>
        </div>

        <div className="border-t pt-6 flex gap-3">
          <Button disabled>Enable Maintenance Mode</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </Card>

      {/* Warning */}
      <Card className="p-4 bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-red-900">This action cannot be undone immediately</p>
          <p className="text-xs text-red-800">Once enabled, all users except those in the allowlist will be locked out</p>
        </div>
      </Card>
    </div>
  );
}
