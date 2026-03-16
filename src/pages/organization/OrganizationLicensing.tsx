import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockLicenses } from "@/lib/mockData";

export default function OrganizationLicensing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Licensing</h1>
        <p className="text-muted-foreground mt-1">Manage licenses and permits</p>
      </div>

      {/* Licenses Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">License Name</th>
                <th className="text-left p-4 font-semibold">Issue Date</th>
                <th className="text-left p-4 font-semibold">Expiry Date</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLicenses.map((license) => (
                <tr key={license.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{license.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{license.issueDate}</td>
                  <td className="p-4 text-sm text-muted-foreground">{license.expiryDate}</td>
                  <td className="p-4">
                    <Badge className={license.status === "Valid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                      {license.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded cursor-pointer">
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 bg-orange-50 border border-orange-200">
        <p className="text-sm text-orange-900">
          ⚠️  Event Hosting License is expiring soon. Please renew by June 1, 2024.
        </p>
      </Card>
    </div>
  );
}
