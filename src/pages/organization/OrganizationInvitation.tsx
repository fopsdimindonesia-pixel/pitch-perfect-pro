import { Plus, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockOrgInvitations } from "@/lib/mockData";

export default function OrganizationInvitation() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800",
      Accepted: "bg-green-100 text-green-800",
      Expired: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Invitations</h1>
          <p className="text-muted-foreground mt-1">Manage pending member invitations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Invitation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" placeholder="user@example.com" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline">Cancel</Button>
                <Button>Send Invitation</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Invitations Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-left p-4 font-semibold">Role</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Sent</th>
                <th className="text-left p-4 font-semibold">Expires</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrgInvitations.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {inv.email}
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{inv.role}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(inv.status)}>{inv.status}</Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{inv.sentAt}</td>
                  <td className="p-4 text-sm text-muted-foreground">{inv.expiresAt}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="sm">Resend</Button>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
