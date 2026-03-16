import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Trash2, Eye, AlertCircle } from "lucide-react";
import { mockPlayerData } from "@/lib/mockClubData";

export default function PlayerDocuments() {
  const player = mockPlayerData.players[0];
  const playerDocs = mockPlayerData.documents.filter(d => d.playerId === player.id);

  const documentTypes = [
    { type: "Passport", description: "National passport", required: true },
    { type: "Visa", description: "Work/travel visa", required: true },
    { type: "Work Permit", description: "Employment permit", required: true },
    { type: "Contract", description: "Club employment contract", required: true },
    { type: "Insurance", description: "Medical/accident insurance", required: false },
    { type: "Medical Report", description: "Latest medical check-up", required: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Valid":
        return "bg-green-100 text-green-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-800";
      case "Active":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player documents">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Player Documents</h1>
          <p className="text-muted-foreground mt-1">{player.name} • Document management</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="font-semibold">Pending Documents: 1</p>
            <p>Medical Report expires in 7 days</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes.map(docType => {
          const uploaded = playerDocs.find(d => d.type === docType.type);
          const isValid = uploaded && ['Valid', 'Active'].includes(uploaded.status);
          
          return (
            <Card key={docType.type} className={isValid ? "" : "border-dashed"}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{docType.type}</p>
                    <p className="text-xs text-muted-foreground">{docType.description}</p>
                  </div>
                  {docType.required && <Badge className="text-xs">Required</Badge>}
                </div>
                
                {uploaded ? (
                  <div className="space-y-2">
                    <Badge className={getStatusColor(uploaded.status)}>
                      {uploaded.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Expires: {uploaded.expiryDate}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="w-full">
                    <Upload className="w-3 h-3 mr-1" />
                    Upload
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>All documents on file</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Document Type</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playerDocs.map(doc => (
                  <TableRow key={doc.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{doc.type}</TableCell>
                    <TableCell className="text-sm">{doc.number}</TableCell>
                    <TableCell className="text-sm">{doc.issueDate}</TableCell>
                    <TableCell className="text-sm">{doc.expiryDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Document Checklist</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-blue-900">
          <p>✓ All documents must be valid and not expired</p>
          <p>✓ Copies must be certified by authorized office</p>
          <p>✓ Names on documents must match registration</p>
          <p>✓ Medical reports updated annually</p>
          <p>✓ Passports must be valid for at least 6 months</p>
        </CardContent>
      </Card>
    </div>
  );
}
