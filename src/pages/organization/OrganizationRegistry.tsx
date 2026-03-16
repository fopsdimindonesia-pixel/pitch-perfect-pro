import { useState } from "react";
import { Search, Plus, Eye, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockOrganizations } from "@/lib/mockData";

export default function OrganizationRegistry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<typeof mockOrganizations[0] | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filtered = mockOrganizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Registry</h1>
          <p className="text-muted-foreground mt-1">Manage all organizations in the system</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Organization
        </Button>
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Organizations Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Organization Name</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Owner</th>
                <th className="text-left p-4 font-semibold">Members</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Created</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((org) => (
                <tr key={org.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{org.name}</td>
                  <td className="p-4">{org.type}</td>
                  <td className="p-4">{org.owner}</td>
                  <td className="p-4">{org.members}</td>
                  <td className="p-4">
                    <Badge className={getStatusColor(org.status)}>{org.status}</Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{org.createdAt}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrg(org)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Organization Drawer */}
      {selectedOrg && (
        <Dialog open={!!selectedOrg} onOpenChange={() => setSelectedOrg(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedOrg.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Type</label>
                <p className="text-lg font-medium">{selectedOrg.type}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Owner</label>
                <p className="text-lg font-medium">{selectedOrg.owner}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Members</label>
                <p className="text-lg font-medium">{selectedOrg.members}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Status</label>
                <Badge className={getStatusColor(selectedOrg.status)}>{selectedOrg.status}</Badge>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Created</label>
                <p className="text-lg font-medium">{selectedOrg.createdAt}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Organization Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Organization</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Organization Name</label>
              <Input placeholder="Enter organization name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>Federation</option>
                <option>Regional</option>
                <option>League</option>
                <option>Club</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
