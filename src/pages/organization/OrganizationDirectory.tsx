import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockOrganizations } from "@/lib/mockData";

export default function OrganizationDirectory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Directory</h1>
        <p className="text-muted-foreground mt-1">Browse all organizations</p>
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search organizations..." className="pl-10" />
          </div>
          <select className="px-4 py-2 border rounded-md">
            <option>All Types</option>
            <option>Federation</option>
            <option>Regional</option>
            <option>League</option>
          </select>
        </div>
      </Card>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockOrganizations.map((org) => (
          <Card key={org.id} className="p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold flex-1">{org.name}</h3>
              <Badge variant="outline">{org.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Owner: {org.owner}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground text-xs">Members</p>
                <p className="font-bold">{org.members}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Status</p>
                <Badge className={org.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {org.status}
                </Badge>
              </div>
            </div>
            <button className="w-full text-xs px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
              View Profile
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
