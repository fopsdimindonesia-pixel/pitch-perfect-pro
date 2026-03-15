import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockUsers = [
  { id: 1, name: "Ahmad Riyadi", email: "ahmad@pssi.id", role: "Admin", orgs: 3, lastActive: "2 min ago", status: "Online" },
  { id: 2, name: "Budi Santoso", email: "budi@makassar.id", role: "Manager", orgs: 2, lastActive: "15 min ago", status: "Online" },
  { id: 3, name: "Citra Dewi", email: "citra@jakarta.id", role: "Editor", orgs: 1, lastActive: "1 hour ago", status: "Idle" },
  { id: 4, name: "Doni Reza", email: "doni@surabaya.id", role: "Viewer", orgs: 1, lastActive: "3 hours ago", status: "Offline" },
  { id: 5, name: "Eka Putri", email: "eka@bandung.id", role: "Manager", orgs: 2, lastActive: "5 min ago", status: "Online" },
];

export default function UserMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Monitoring</h1>
        <p className="text-muted-foreground mt-1">Track user activity and engagement</p>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap items-end">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">User Name</th>
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-left p-4 font-semibold">Role</th>
                <th className="text-left p-4 font-semibold">Organizations</th>
                <th className="text-left p-4 font-semibold">Last Active</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="p-4">
                    <Badge variant="outline">{user.role}</Badge>
                  </td>
                  <td className="p-4">{user.orgs}</td>
                  <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                  <td className="p-4">
                    <Badge className={
                      user.status === "Online" ? "bg-green-100 text-green-800" :
                      user.status === "Idle" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
