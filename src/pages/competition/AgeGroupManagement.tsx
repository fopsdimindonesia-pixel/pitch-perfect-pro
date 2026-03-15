import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";

const mockAgeGroups = [
  { id: 1, name: "U-12", birthYearMin: 2012, birthYearMax: 2013, category: "Male", status: "Active" },
  { id: 2, name: "U-14", birthYearMin: 2010, birthYearMax: 2011, category: "Male", status: "Active" },
  { id: 3, name: "U-16", birthYearMin: 2008, birthYearMax: 2009, category: "Female", status: "Active" },
  { id: 4, name: "U-18", birthYearMin: 2006, birthYearMax: 2007, category: "Male", status: "Active" },
];

export default function AgeGroupManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Age group management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Age Group Management</h1>
          <p className="text-muted-foreground mt-1">Configure age groups for your competition</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Age Group
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input placeholder="Search age group..." />
          <Input placeholder="Filter by category..." />
          <Button variant="outline">Clear Filters</Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Age Group</th>
                <th className="px-6 py-3 text-left font-semibold">Birth Year Range</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAgeGroups.map((group) => (
                <tr key={group.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{group.name}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs font-mono">
                    {group.birthYearMin} - {group.birthYearMax}
                  </td>
                  <td className="px-6 py-4">{group.category}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-800">{group.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
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
