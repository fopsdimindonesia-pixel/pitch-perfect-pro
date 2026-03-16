import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

const mockIntegrations = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing and subscription management",
    category: "Payments",
    status: "Connected",
    lastSync: "2024-12-15 10:32:15",
    usageLastMonth: 14250,
    icon: "💳"
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Email delivery and campaign management",
    category: "Email",
    status: "Connected",
    lastSync: "2024-12-15 14:45:30",
    usageLastMonth: 8450,
    icon: "📧"
  },
  {
    id: "aws-s3",
    name: "AWS S3",
    description: "Cloud storage for files and media",
    category: "Storage",
    status: "Connected",
    lastSync: "2024-12-15 15:20:45",
    usageLastMonth: 2340,
    icon: "☁️"
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Website and app analytics",
    category: "Analytics",
    status: "Connected",
    lastSync: "2024-12-15 11:15:20",
    usageLastMonth: 156280,
    icon: "📊"
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team messaging and notifications",
    category: "Notifications",
    status: "Not Connected",
    lastSync: null,
    usageLastMonth: 0,
    icon: "💬"
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Customer support platform",
    category: "Support",
    status: "Connected",
    lastSync: "2024-12-14 09:30:00",
    usageLastMonth: 450,
    icon: "🎫"
  }
];

export default function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integration Settings</h1>
        <p className="text-muted-foreground mt-1">Manage third-party integrations and API connections</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Integrations</p>
          <p className="text-2xl font-bold mt-2">{mockIntegrations.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Connected</p>
          <p className="text-2xl font-bold text-green-600 mt-2">5</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Requests This Month</p>
          <p className="text-2xl font-bold mt-2">181.8K</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Failed Requests</p>
          <p className="text-2xl font-bold text-red-600 mt-2">24</p>
        </Card>
      </div>

      {/* Integration Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockIntegrations.map((integration) => (
          <Card key={integration.id} className="p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{integration.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{integration.name}</h3>
                  <p className="text-xs text-muted-foreground">{integration.category}</p>
                </div>
              </div>
              {integration.status === "Connected" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-4 flex-grow">{integration.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Status</span>
                {integration.status === "Connected" ? (
                  <Badge className="bg-green-100 text-green-800 text-xs">Connected</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 text-xs">Not Connected</Badge>
                )}
              </div>
              {integration.lastSync && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last Sync</span>
                  <span className="text-xs">{integration.lastSync}</span>
                </div>
              )}
              {integration.usageLastMonth > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Requests (30d)</span>
                  <span className="text-xs font-mono">{integration.usageLastMonth.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Configure
              </Button>
              {integration.status === "Connected" && (
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  Disconnect
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Configuration */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Configuration: Stripe</h2>

        <Tabs defaultValue="credentials" className="space-y-4">
          <TabsList>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Public Key</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value="pk_live_**************************2X8s"
                  readOnly
                  className="bg-muted"
                />
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Secret Key</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value="sk_live_**************************5L9p"
                  readOnly
                  className="bg-muted"
                />
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Webhook Secret</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value="whsec_**************************7K4m"
                  readOnly
                  className="bg-muted"
                />
                <Button variant="outline" size="sm">Regenerate</Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button>Update Credentials</Button>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Enable automatic synchronization</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Send webhooks on transaction events</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Require 3D Secure authentication</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Webhook Endpoint</label>
              <Input value="https://api.yourplatform.com/webhooks/stripe" readOnly className="bg-muted" />
            </div>

            <div className="pt-4 border-t">
              <Button>Save Settings</Button>
            </div>
          </TabsContent>

          {/* Activity Logs Tab */}
          <TabsContent value="logs" className="space-y-3">
            {[
              { timestamp: "2024-12-15 14:32:15", action: "Payment processed", status: "Success", details: "Charge: $150" },
              { timestamp: "2024-12-15 13:45:30", action: "Subscription created", status: "Success", details: "Plan: Premium" },
              { timestamp: "2024-12-15 12:20:10", action: "Refund processed", status: "Success", details: "Amount: $75" },
              { timestamp: "2024-12-14 16:10:45", action: "API sync", status: "Failed", details: "Connection timeout" },
              { timestamp: "2024-12-14 15:30:20", action: "Webhook received", status: "Success", details: "charge.succeeded event" }
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                </div>
                <div className="flex items-center gap-3">
                  {log.status === "Success" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-xs text-muted-foreground">{log.details}</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Integration Usage Statistics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Integration Usage (Last 30 Days)</h2>
        <div className="space-y-3">
          {mockIntegrations
            .filter(i => i.usageLastMonth > 0)
            .sort((a, b) => b.usageLastMonth - a.usageLastMonth)
            .map((integration) => {
              const maxUsage = Math.max(...mockIntegrations.map(i => i.usageLastMonth));
              const percentage = (integration.usageLastMonth / maxUsage) * 100;

              return (
                <div key={integration.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{integration.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {integration.usageLastMonth.toLocaleString()} requests
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Available Integrations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Discover Integrations</h2>
          <Button variant="outline" size="sm">
            Browse Marketplace
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Connect with over 1,000+ applications to extend platform functionality
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { name: "HubSpot", category: "CRM" },
            { name: "Salesforce", category: "CRM" },
            { name: "Mailchimp", category: "Email" },
            { name: "Twilio", category: "SMS" },
            { name: "Datadog", category: "Monitoring" },
            { name: "PagerDuty", category: "Alerts" },
            { name: "GitHub", category: "DevOps" },
            { name: "Jira", category: "Project Mgmt" }
          ].map((app, i) => (
            <Button key={i} variant="outline" className="justify-center">
              <div className="text-center">
                <p className="text-xs font-medium">{app.name}</p>
                <p className="text-xs text-muted-foreground">{app.category}</p>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
