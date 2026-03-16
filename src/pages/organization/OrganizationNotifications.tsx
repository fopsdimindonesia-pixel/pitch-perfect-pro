import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockNotifications = [
  { id: "1", category: "System", message: "New feature available", time: "2 hours ago", read: false },
  { id: "2", category: "Billing", message: "Invoice ready for download", time: "4 hours ago", read: false },
  { id: "3", category: "System", message: "Scheduled maintenance", time: "1 day ago", read: true },
  { id: "4", category: "Members", message: "New member joined", time: "2 days ago", read: true },
];

export default function OrganizationNotifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Notifications</h1>
          <p className="text-muted-foreground mt-1">Manage notification preferences</p>
        </div>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="members">Members</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {mockNotifications.map((notif) => (
          <Card key={notif.id} className="p-4 hover:bg-muted/30 transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">{notif.category}</Badge>
                  {!notif.read && <Badge className="bg-blue-100 text-blue-800">New</Badge>}
                </div>
                <p className="font-medium">{notif.message}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notif.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
