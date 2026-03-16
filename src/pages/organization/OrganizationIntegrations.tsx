import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockIntegrations } from "@/lib/mockData";

export default function OrganizationIntegrations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect third-party services</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Integration
        </Button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockIntegrations.map((integration) => (
          <Card key={integration.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{integration.name}</h3>
                <p className="text-xs text-muted-foreground">{integration.category}</p>
              </div>
              <Badge
                className={
                  integration.status === "connected"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {integration.status === "connected" ? "Connected" : "Disconnected"}
              </Badge>
            </div>
            {integration.status === "connected" ? (
              <p className="text-xs text-muted-foreground mb-4">
                Connected since {integration.connectedAt}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mb-4">Not connected</p>
            )}
            <Button
              variant={integration.status === "connected" ? "outline" : "default"}
              className="w-full text-sm"
            >
              {integration.status === "connected" ? "Disconnect" : "Connect"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
