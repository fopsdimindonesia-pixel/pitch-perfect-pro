import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Trash2, CheckCircle } from "lucide-react";

const mockNotifications = [
  { id: 1, title: "Match Rescheduled", message: "Match between Team A and Team B moved to April 5", type: "alert", read: false },
  { id: 2, title: "Team Registration", message: "FC Makassar has registered for U-16 Male category", type: "info", read: true },
  { id: 3, title: "Payment Received", message: "Payment received from SSB Garuda Muda", type: "success", read: true },
];

export default function CompetitionNotifications() {
  return (
    <div className="space-y-6" role="main" aria-label="Notifications settings">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground mt-1">Manage competition notifications</p>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notif) => (
          <Card key={notif.id} className="p-4 border-l-4" style={{
            borderLeftColor: notif.type === 'alert' ? '#f59e0b' : notif.type === 'success' ? '#10b981' : '#3b82f6'
          }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{notif.title}</h3>
                  {!notif.read && <Badge className="text-xs">New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{notif.message}</p>
              </div>
              <Trash2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-red-600" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
