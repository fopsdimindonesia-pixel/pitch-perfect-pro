import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockOrgDocuments } from "@/lib/mockData";

export default function OrganizationDocuments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Documents</h1>
          <p className="text-muted-foreground mt-1">Manage documents and files</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Legal", "Financial", "Reports", "Other"].map((folder) => (
          <Card key={folder} className="p-6 text-center cursor-pointer hover:bg-muted/30 transition">
            <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="font-medium">{folder}</p>
          </Card>
        ))}
      </div>

      {/* Documents List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Size</th>
                <th className="text-left p-4 font-semibold">Uploaded By</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrgDocuments.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    {doc.name}
                  </td>
                  <td className="p-4"><Badge variant="outline">{doc.type}</Badge></td>
                  <td className="p-4 text-sm">{doc.size}</td>
                  <td className="p-4 text-sm">{doc.uploadedBy}</td>
                  <td className="p-4 text-sm text-muted-foreground">{doc.uploadedAt}</td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
