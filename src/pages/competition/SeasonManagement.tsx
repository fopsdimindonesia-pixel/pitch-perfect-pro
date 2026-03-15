import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";

const mockSeasons = [
  { id: 1, name: "Season 2024 Spring", startDate: "2024-03-01", endDate: "2024-05-31", status: "Active" },
  { id: 2, name: "Season 2024 Summer", startDate: "2024-06-01", endDate: "2024-08-31", status: "Upcoming" },
  { id: 3, name: "Season 2023 Fall", startDate: "2023-09-01", endDate: "2023-11-30", status: "Completed" },
];

export default function SeasonManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Season management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Season Management</h1>
          <p className="text-muted-foreground mt-1">Manage competition seasons</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Season
        </Button>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Season Name</th>
                <th className="px-6 py-3 text-left font-semibold">Start Date</th>
                <th className="px-6 py-3 text-left font-semibold">End Date</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSeasons.map((season) => (
                <tr key={season.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{season.name}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {season.startDate}
                  </td>
                  <td className="px-6 py-4">{season.endDate}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        season.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : season.status === "Upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {season.status}
                    </Badge>
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
