import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockStatuses = [
  { id: 1, name: "Team Approved", description: "Team has been approved" },
  { id: 2, name: "Payment Pending", description: "Waiting for payment confirmation" },
  { id: 3, name: "Squad Complete", description: "All player registrations are done" },
];

export default function RegistrationStatus() {
  return (
    <div className="space-y-6" role="main" aria-label="Registration status">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Registration Status</h1>
          <p className="text-muted-foreground mt-1">Track team registration progress</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Status
        </Button>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          {mockStatuses.map((status) => (
            <div
              key={status.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-semibold">{status.name}</p>
                <p className="text-sm text-muted-foreground">{status.description}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Active</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
