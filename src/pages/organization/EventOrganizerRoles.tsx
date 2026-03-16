import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockRoles = [
  { id: "1", name: "Admin", permissions: ["create", "read", "update", "delete"] },
  { id: "2", name: "Manager", permissions: ["read", "update", "report"] },
  { id: "3", name: "Coordinator", permissions: ["read", "create"] },
];

export default function EventOrganizerRoles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">EO Role Management</h1>
        <p className="text-muted-foreground mt-1">Define roles and permissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockRoles.map((role) => (
          <Card key={role.id} className="p-6">
            <h3 className="text-lg font-semibold mb-3">{role.name}</h3>
            <div className="space-y-2">
              {role.permissions.map((perm) => (
                <Badge key={perm} variant="outline">{perm}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Permissions Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2">Permission</th>
                <th className="text-center p-2">Admin</th>
                <th className="text-center p-2">Manager</th>
                <th className="text-center p-2">Coordinator</th>
              </tr>
            </thead>
            <tbody>
              {["Create", "Read", "Update", "Delete", "Report"].map((perm) => (
                <tr key={perm} className="border-b">
                  <td className="p-2">{perm}</td>
                  <td className="text-center p-2">✓</td>
                  <td className="text-center p-2">{perm === "Create" || perm === "Update" ? "✓" : ""}</td>
                  <td className="text-center p-2">{perm === "Read" || perm === "Create" ? "✓" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
