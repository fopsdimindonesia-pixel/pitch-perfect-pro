import { Card } from "@/components/ui/card";

const clubRoles = [
  { name: "Head Coach", permissions: ["manage_team", "set_lineup", "training_plan"] },
  { name: "Assistant Coach", permissions: ["manage_players", "training_plan"] },
  { name: "Physiotherapist", permissions: ["health_records", "reports"] },
  { name: "Analyst", permissions: ["view_data", "reports"] },
];

export default function ClubStaffRoles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Club Staff Roles</h1>
        <p className="text-muted-foreground mt-1">Define role permissions</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Role Permissions Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3">Role</th>
                <th className="text-center p-3">Manage Team</th>
                <th className="text-center p-3">Health Records</th>
                <th className="text-center p-3">Analytics</th>
                <th className="text-center p-3">Training</th>
                <th className="text-center p-3">Reports</th>
              </tr>
            </thead>
            <tbody>
              {clubRoles.map((role) => (
                <tr key={role.name} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{role.name}</td>
                  <td className="text-center p-3">{role.permissions.includes("manage_team") ? "✓" : ""}</td>
                  <td className="text-center p-3">{role.permissions.includes("health_records") ? "✓" : ""}</td>
                  <td className="text-center p-3">{role.permissions.includes("view_data") ? "✓" : ""}</td>
                  <td className="text-center p-3">{role.permissions.includes("training_plan") ? "✓" : ""}</td>
                  <td className="text-center p-3">{role.permissions.includes("reports") ? "✓" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
