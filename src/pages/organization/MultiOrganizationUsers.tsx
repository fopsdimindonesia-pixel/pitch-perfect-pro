import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockUserMultiOrgs } from "@/lib/mockData";

export default function MultiOrganizationUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Multi Organization Users</h1>
        <p className="text-muted-foreground mt-1">View users across multiple organizations</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">User</th>
                <th className="text-left p-4 font-semibold">Organizations</th>
                <th className="text-left p-4 font-semibold">Roles</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUserMultiOrgs.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{user.userName}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {user.organizations.map((org) => (
                        <Badge key={org} variant="outline">{org}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role) => (
                        <Badge key={role} className="bg-blue-100 text-blue-800">{role}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">View</span>
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
