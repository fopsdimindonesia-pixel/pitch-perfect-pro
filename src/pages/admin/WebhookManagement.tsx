import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, Copy } from "lucide-react";

const mockWebhooks = [
  {
    id: "WHK-001",
    name: "Match Update Webhook",
    url: "https://external-service.com/webhooks/matches",
    events: ["match.created", "match.updated", "match.finished"],
    status: "Active",
    lastTriggered: "2024-12-15 14:32:15",
    successRate: 99.8,
    totalEvents: 2845
  },
  {
    id: "WHK-002",
    name: "User Registration Webhook",
    url: "https://crm.example.com/api/users",
    events: ["user.registered", "user.verified"],
    status: "Active",
    lastTriggered: "2024-12-15 13:45:30",
    successRate: 98.5,
    totalEvents: 1240
  },
  {
    id: "WHK-003",
    name: "Payment Webhook",
    url: "https://payment-system.com/webhooks",
    events: ["payment.completed", "payment.failed", "payment.refunded"],
    status: "Active",
    lastTriggered: "2024-12-15 12:20:10",
    successRate: 99.9,
    totalEvents: 5620
  },
  {
    id: "WHK-004",
    name: "Analytics Webhook",
    url: "https://analytics.example.com/events",
    events: ["event.tracked"],
    status: "Inactive",
    lastTriggered: "2024-12-01",
    successRate: 0,
    totalEvents: 0
  }
];

const mockEvents = [
  { event: "user.registered", description: "New user created" },
  { event: "user.verified", description: "User email verified" },
  { event: "user.suspended", description: "User account suspended" },
  { event: "match.created", description: "New match scheduled" },
  { event: "match.updated", description: "Match details changed" },
  { event: "match.finished", description: "Match completed" },
  { event: "competition.created", description: "New competition created" },
  { event: "payment.completed", description: "Payment processed" },
  { event: "payment.failed", description: "Payment failed" },
  { event: "payment.refunded", description: "Payment refunded" }
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case "Inactive":
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
    case "Error":
      return <Badge className="bg-red-100 text-red-800">Error</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function WebhookManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Webhook Management</h1>
        <p className="text-muted-foreground mt-1">Manage webhooks and event subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Webhooks</p>
          <p className="text-2xl font-bold mt-2">{mockWebhooks.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Webhooks</p>
          <p className="text-2xl font-bold mt-2">3</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Events Sent</p>
          <p className="text-2xl font-bold mt-2">9,705</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Success Rate</p>
          <p className="text-2xl font-bold mt-2">99.4%</p>
        </Card>
      </div>

      {/* Create New Webhook */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Webhook</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Webhook Name</label>
            <Input placeholder="e.g., Match Updates" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Endpoint URL</label>
            <Input placeholder="https://example.com/webhooks/matches" type="url" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Subscribe to Events</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {mockEvents.map((event, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-sm">
                    <span className="font-mono text-xs">{event.event}</span>
                    <span className="text-muted-foreground text-xs ml-2">({event.description})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Enable SSL Verification</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Secret Token (optional)</label>
            <Input placeholder="Leave empty to generate automatically" type="password" />
          </div>

          <Button>Create Webhook</Button>
        </div>
      </Card>

      {/* Webhooks List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">URL</th>
                <th className="px-6 py-3 text-left font-semibold">Events</th>
                <th className="px-6 py-3 text-right font-semibold">Success Rate</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockWebhooks.map((webhook) => (
                <tr key={webhook.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{webhook.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded truncate max-w-48">
                        {webhook.url}
                      </code>
                      <button title="Copy URL" className="text-gray-500 hover:text-gray-700">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {webhook.events.map((event, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {event.split(".")[1]}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {webhook.status === "Active" ? (
                      <div className="flex items-center justify-end gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">{webhook.successRate}%</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(webhook.status)}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Test Webhook */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Test Webhook: {mockWebhooks[0].name}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Test Event</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select event..." />
              </SelectTrigger>
              <SelectContent>
                {mockWebhooks[0].events.map((event) => (
                  <SelectItem key={event} value={event}>{event}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button>Send Test Event</Button>
        </div>
      </Card>

      {/* Event History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Events</h2>
        <div className="space-y-2">
          {[
            { event: "match.updated", status: "Success", timestamp: "2024-12-15 14:32:15", duration: "145ms" },
            { event: "match.created", status: "Success", timestamp: "2024-12-15 14:20:45", duration: "98ms" },
            { event: "payment.completed", status: "Success", timestamp: "2024-12-15 13:45:30", duration: "280ms" },
            { event: "payment.failed", status: "Failed", timestamp: "2024-12-15 13:30:20", duration: "5000ms+" },
            { event: "user.registered", status: "Success", timestamp: "2024-12-15 12:50:10", duration: "156ms" }
          ].map((record, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
              <div>
                <p className="text-sm font-medium">{record.event}</p>
                <p className="text-xs text-muted-foreground">{record.timestamp}</p>
              </div>
              <div className="flex items-center gap-4">
                {record.status === "Success" ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <span className="text-xs text-muted-foreground">{record.duration}</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
