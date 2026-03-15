import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, Users, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface AccessLevel {
  id: number;
  name: string;
  access: string;
  zones: string;
  status: string;
}

export default function SecurityManagement() {
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    accessLevelToRemove: null as AccessLevel | null,
    isLoading: false,
  });

  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>([
    { id: 1, name: "Players", access: "Full", zones: "All Areas", status: "Active" },
    { id: 2, name: "Staff", access: "Full", zones: "All Areas", status: "Active" },
    { id: 3, name: "Media", access: "Limited", zones: "Media Room, Stadium", status: "Active" },
    { id: 4, name: "Contractors", access: "Limited", zones: "Designated Areas", status: "Active" },
    { id: 5, name: "Visitors", access: "Restricted", zones: "Lobby, Tours", status: "Active" },
  ]);

  const handleRemoveAccess = (level: AccessLevel) => {
    setConfirmDialog({
      open: true,
      accessLevelToRemove: level,
      isLoading: false,
    });
  };

  const handleConfirmRemove = async () => {
    setConfirmDialog(prev => ({ ...prev, isLoading: true }));
    // Simulate async deletion
    await new Promise(resolve => setTimeout(resolve, 500));
    if (confirmDialog.accessLevelToRemove) {
      setAccessLevels(prev => prev.filter(level => level.id !== confirmDialog.accessLevelToRemove.id));
    }
    setConfirmDialog({
      open: false,
      accessLevelToRemove: null,
      isLoading: false,
    });
  };

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
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{level.name}</p>
                    <p className="text-sm text-muted-foreground">{level.zones}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="outline">{level.access}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{level.status}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveAccess(level)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

      <ConfirmDialog
        open={confirmDialog.open}
        title="Remove Access Level"
        description={`Are you sure you want to remove access for "${confirmDialog.accessLevelToRemove?.name}"? This will immediately revoke their system access.`}
        actionLabel="Remove Access"
        cancelLabel="Cancel"
        isDangerous={true}
        isLoading={confirmDialog.isLoading}
        onConfirm={handleConfirmRemove}
        onCancel={() => setConfirmDialog({ open: false, accessLevelToRemove: null, isLoading: false })}
      />
    </div>
  );
}
