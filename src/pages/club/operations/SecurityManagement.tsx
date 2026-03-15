import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, Users } from "lucide-react";

export default function SecurityManagement() {
  const accessLevels = [
    { id: 1, name: "Players", access: "Full", zones: "All Areas", status: "Active" },
    { id: 2, name: "Staff", access: "Full", zones: "All Areas", status: "Active" },
    { id: 3, name: "Media", access: "Limited", zones: "Media Room, Stadium", status: "Active" },
    { id: 4, name: "Contractors", access: "Limited", zones: "Designated Areas", status: "Active" },
    { id: 5, name: "Visitors", access: "Restricted", zones: "Lobby, Tours", status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Management</h1>
          <p className="text-muted-foreground mt-1">Access control and security protocols</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Lock className="w-4 h-4" />
          Security Settings
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Current Security Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ All Access Points Secure</p>
          <p>✓ CCTV Systems Operational (24/7)</p>
          <p>✓ Security Staff On Duty</p>
          <p>✓ No Active Threats</p>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-semibold mb-3">Access Control by Group</h3>
        <div className="space-y-2">
          {accessLevels.map(level => (
            <Card key={level.id}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{level.name}</p>
                    <p className="text-sm text-muted-foreground">{level.zones}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{level.access}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{level.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Staff Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Verified Staff</span>
            <span className="font-semibold">38/40</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Verification</span>
            <span className="font-semibold text-amber-600">2</span>
          </div>
          <Button className="w-full mt-2">Manage Verifications</Button>
        </CardContent>
      </Card>
    </div>
  );
}
