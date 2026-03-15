import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2 } from "lucide-react";

const mockDocs = [
  { id: 1, name: "Competition Rules.pdf", size: "2.4 MB", date: "2024-03-01" },
  { id: 2, name: "Player Eligibility Form.docx", size: "1.2 MB", date: "2024-03-02" },
  { id: 3, name: "Team Registration Guidelines.pdf", size: "1.8 MB", date: "2024-03-03" },
  { id: 4, name: "Referee Instructions.pdf", size: "3.1 MB", date: "2024-03-05" },
];

export default function CompetitionDocuments() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition documents">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground mt-1">Manage competition documents</p>
        </div>
        <Button>Upload Document</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Document</th>
                <th className="px-6 py-3 text-left font-semibold">Size</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDocs.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{doc.size}</td>
                  <td className="px-6 py-4 text-muted-foreground">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
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
