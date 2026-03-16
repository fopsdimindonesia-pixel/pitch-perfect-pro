import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

const mockAnnouncements = [
  { id: 1, title: "Schedule Released", content: "Match schedule is now available", date: "2024-01-15", status: "Published" },
  { id: 2, title: "Registration Deadline", content: "Team registration closes on January 20", date: "2024-01-10", status: "Published" },
  { id: 3, title: "Venue Changed", content: "Main match venue updated", date: "2024-01-12", status: "Draft" },
];

export default function Announcement() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition announcements">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground mt-1">Create and manage competition announcements</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Announcement
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Title</th>
                <th className="px-6 py-3 text-left font-semibold">Content</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAnnouncements.map((a) => (
                <tr key={a.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{a.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{a.content.substring(0, 30)}...</td>
                  <td className="px-6 py-4">{a.date}</td>
                  <td className="px-6 py-4">
                    <Badge className={a.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
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
