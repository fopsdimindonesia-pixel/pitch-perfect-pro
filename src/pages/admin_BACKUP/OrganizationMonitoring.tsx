import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, CheckCircle, Clock } from "lucide-react";

const mockOrganizations = [
  { id: 1, name: "Jakarta Premier League", type: "League", members: 245, competitions: 8, status: "Active" },
  { id: 2, name: "Makassar Regional FA", type: "Regional", members: 128, competitions: 5, status: "Active" },
  { id: 3, name: "Surabaya Youth Cup", type: "Event", members: 89, competitions: 3, status: "Pending" },
  { id: 4, name: "Bandung Alliance", type: "League", members: 156, competitions: 6, status: "Active" },
  { id: 5, name: "Medan Sports", type: "Event", members: 67, competitions: 2, status: "Inactive" },
];

export default function OrganizationMonitoring() {
  const stats = [
    { label: "Total Organizations", value: 485, icon: Building2, color: "text-blue-600" },
    { label: "Verified Organizations", value: 412, icon: CheckCircle, color: "text-green-600" },
    { label: "Pending Verification", value: 73, icon: Clock, color: "text-yellow-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Monitoring</h1>
        <p className="text-muted-foreground mt-1">Track all organizations and their activities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Organizations Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Organization Name</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Members</th>
                <th className="text-left p-4 font-semibold">Active Competitions</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrganizations.map((org) => (
                <tr key={org.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{org.name}</td>
                  <td className="p-4 text-sm">{org.type}</td>
                  <td className="p-4">{org.members}</td>
                  <td className="p-4">{org.competitions}</td>
                  <td className="p-4">
                    <Badge className={org.status === "Active" ? "bg-green-100 text-green-800" : org.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}>
                      {org.status}
                    </Badge>
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
