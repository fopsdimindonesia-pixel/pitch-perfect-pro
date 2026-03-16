import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Archive } from "lucide-react";
import { mockArchivedOrgs } from "@/lib/mockData";

export default function OrganizationArchive() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Archive</h1>
        <p className="text-muted-foreground mt-1">View archived organizations</p>
      </div>

      {/* Archived Organizations */}
      <div className="space-y-3">
        {mockArchivedOrgs.map((org) => (
          <Card key={org.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Archive className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">{org.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Archived on {org.archivedAt}</p>
                  <p className="text-sm text-muted-foreground">Reason: {org.reason}</p>
                </div>
              </div>
              <Badge variant="secondary">{org.type}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Archive Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Archive Management</h2>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Archived organizations are inactive but retain their historical data.
          </p>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
              Restore Organization
            </button>
            <button className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">
              Permanently Delete
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
