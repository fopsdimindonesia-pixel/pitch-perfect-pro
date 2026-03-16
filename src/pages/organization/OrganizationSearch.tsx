import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockOrganizations } from "@/lib/mockData";

export default function OrganizationSearch() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Global Organization Search</h1>
        <p className="text-muted-foreground mt-1">Find organizations across the platform</p>
      </div>

      {/* Search Bar */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, type, region..."
            className="pl-12 py-3 text-lg"
          />
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-sm font-medium mb-2">Organization Type</label>
            <select className="px-4 py-2 border rounded-md">
              <option>All Types</option>
              <option>Federation</option>
              <option>Regional</option>
              <option>League</option>
              <option>Club</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Region</label>
            <select className="px-4 py-2 border rounded-md">
              <option>All Regions</option>
              <option>Jakarta</option>
              <option>Makassar</option>
              <option>Surabaya</option>
              <option>Bandung</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">League</label>
            <select className="px-4 py-2 border rounded-md">
              <option>All Leagues</option>
              <option>Jakarta Premier</option>
              <option>Makassar League</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button>Search</Button>
          </div>
        </div>
      </Card>

      {/* Search Results */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Search Results ({mockOrganizations.length})</h2>
        <div className="space-y-3">
          {mockOrganizations.map((org) => (
            <div key={org.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/30 transition">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{org.name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline">{org.type}</Badge>
                  <span className="text-sm text-muted-foreground">Owner: {org.owner}</span>
                  <span className="text-sm text-muted-foreground">{org.members} members</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Created {org.createdAt}</p>
              </div>
              <div className="text-right">
                <Badge className={org.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {org.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
