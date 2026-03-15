import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Download, Trash2 } from "lucide-react";

const mockDocuments = [
  { id: 1, name: "Competition Rules", type: "PDF", uploadDate: "2024-01-01", status: "Published" },
  { id: 2, name: "Player Handbook", type: "PDF", uploadDate: "2024-01-02", status: "Published" },
  { id: 3, name: "Referee Guidelines", type: "DOCX", uploadDate: "2024-01-03", status: "Draft" },
];

export default function DocumentManagement() {
  return (
    <div className="space-y-6" role="main" aria-label="Document management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Document Management</h1>
          <p className="text-muted-foreground mt-1">Manage competition documents and resources</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Document Name</th>
                <th className="px-6 py-3 text-left font-semibold">Type</th>
                <th className="px-6 py-3 text-left font-semibold">Upload Date</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((d) => (
                <tr key={d.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{d.name}</td>
                  <td className="px-6 py-4">{d.type}</td>
                  <td className="px-6 py-4">{d.uploadDate}</td>
                  <td className="px-6 py-4">
                    <Badge className={d.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {d.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="w-4 h-4" />
                        Download
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
