import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

const mockFeatures = [
  {
    id: "FEAT-001",
    name: "Advanced Analytics",
    description: "New advanced analytics dashboard",
    enabled: true,
    rollout: 100,
    status: "Live",
    lastUpdated: "2024-12-15"
  },
  {
    id: "FEAT-002",
    name: "AI Predictions",
    description: "AI-powered match predictions",
    enabled: true,
    rollout: 45,
    status: "Rolling Out",
    lastUpdated: "2024-12-10"
  },
  {
    id: "FEAT-003",
    name: "Mobile App",
    description: "Native mobile application",
    enabled: false,
    rollout: 15,
    status: "Beta",
    lastUpdated: "2024-12-08"
  },
  {
    id: "FEAT-004",
    name: "Video Broadcasting",
    description: "Live match streaming",
    enabled: true,
    rollout: 80,
    status: "Rolling Out",
    lastUpdated: "2024-12-12"
  },
  {
    id: "FEAT-005",
    name: "Social Features",
    description: "Fan engagement tools",
    enabled: false,
    rollout: 0,
    status: "Planned",
    lastUpdated: "2024-11-20"
  }
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Live":
      return <Badge className="bg-green-100 text-green-800">Live</Badge>;
    case "Rolling Out":
      return <Badge className="bg-blue-100 text-blue-800">Rolling Out</Badge>;
    case "Beta":
      return <Badge className="bg-purple-100 text-purple-800">Beta</Badge>;
    case "Planned":
      return <Badge className="bg-gray-100 text-gray-800">Planned</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function FeatureFlagManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feature Flag Management</h1>
        <p className="text-muted-foreground mt-1">Control feature rollouts and experimental features</p>
      </div>

      {/* Info */}
      <Card className="p-4 bg-blue-50 border border-blue-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-blue-900">Feature flags help control releases</p>
          <p className="text-xs text-blue-800">Use rollout percentage to gradually introduce features to users</p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Features</p>
          <p className="text-2xl font-bold mt-2">{mockFeatures.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Live</p>
          <p className="text-2xl font-bold mt-2">1</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Rolling Out</p>
          <p className="text-2xl font-bold mt-2">2</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Beta</p>
          <p className="text-2xl font-bold mt-2">2</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="rolling">Rolling Out</SelectItem>
            <SelectItem value="beta">Beta</SelectItem>
            <SelectItem value="planned">Planned</SelectItem>
          </SelectContent>
        </Select>
        <Input type="search" placeholder="Search features..." className="flex-1 min-w-40" />
      </Card>

      {/* Features List */}
      <div className="space-y-4">
        {mockFeatures.map((feature) => (
          <Card key={feature.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{feature.name}</h3>
                  {getStatusBadge(feature.status)}
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Last updated: {feature.lastUpdated}</p>
              </div>
              <Switch checked={feature.enabled} className="ml-4" />
            </div>

            {feature.enabled && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Rollout Percentage</label>
                  <span className="text-sm font-semibold">{feature.rollout}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${feature.rollout}%` }}
                  />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
