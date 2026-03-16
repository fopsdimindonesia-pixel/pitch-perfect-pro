import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2 } from "lucide-react";

const mockCategories = [
  { id: 1, name: "Male", ageGroups: 4, teams: 12, status: "Active" },
  { id: 2, name: "Female", ageGroups: 4, teams: 8, status: "Active" },
  { id: 3, name: "Mixed (U-12)", ageGroups: 1, teams: 4, status: "Active" },
];

export default function CompetitionCategories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Competition Categories</h1>
          <p className="text-muted-foreground mt-1">Manage player categories for your competition</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input placeholder="Search category..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Clear Filters</Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Category Name</th>
                <th className="px-6 py-3 text-left font-semibold">Age Groups</th>
                <th className="px-6 py-3 text-left font-semibold">Teams Allowed</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCategories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4">{cat.ageGroups}</td>
                  <td className="px-6 py-4">{cat.teams}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-800">{cat.status}</Badge>
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
