import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockImports = [
  {
    id: "IMP-001",
    name: "Users Import Q1",
    status: "Completed",
    rows: 1245,
    imported: 1240,
    failed: 5,
    date: "2024-12-10"
  },
  {
    id: "IMP-002",
    name: "Organizations Import",
    status: "Completed",
    rows: 342,
    imported: 342,
    failed: 0,
    date: "2024-12-08"
  },
  {
    id: "IMP-003",
    name: "Players Data",
    status: "Failed",
    rows: 5600,
    imported: 0,
    failed: 5600,
    date: "2024-12-05"
  }
];

export default function DataImport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Import</h1>
        <p className="text-muted-foreground mt-1">Import data from external sources</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="mapping">Mapping</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          {/* Instructions */}
          <Card className="p-4 bg-blue-50 border border-blue-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Supported Formats</p>
                <p>CSV and Excel files (xlsx, xls). Maximum 100 MB. First row should contain headers.</p>
              </div>
            </div>
          </Card>

          {/* File Upload */}
          <Card className="p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground mb-4">CSV or Excel file</p>
              <Button>Select File</Button>
            </div>
          </Card>

          {/* Data Type Selection */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Data Type</h2>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input type="radio" name="datatype" defaultChecked className="mr-3" />
                <div>
                  <p className="font-medium text-sm">Users</p>
                  <p className="text-xs text-muted-foreground">Import user accounts and profiles</p>
                </div>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input type="radio" name="datatype" className="mr-3" />
                <div>
                  <p className="font-medium text-sm">Organizations</p>
                  <p className="text-xs text-muted-foreground">Import clubs, event organizers, groups</p>
                </div>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input type="radio" name="datatype" className="mr-3" />
                <div>
                  <p className="font-medium text-sm">Competitions</p>
                  <p className="text-xs text-muted-foreground">Import competitions and schedules</p>
                </div>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input type="radio" name="datatype" className="mr-3" />
                <div>
                  <p className="font-medium text-sm">Players</p>
                  <p className="text-xs text-muted-foreground">Import player data and statistics</p>
                </div>
              </label>
            </div>
          </Card>
        </TabsContent>

        {/* Mapping Tab */}
        <TabsContent value="mapping" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Column Mapping</h2>
            <p className="text-sm text-muted-foreground mb-4">Map CSV columns to database fields</p>
            <div className="space-y-3">
              {[
                { csv: "first_name", db: "firstName" },
                { csv: "last_name", db: "lastName" },
                { csv: "email_address", db: "email" },
                { csv: "phone", db: "phone" },
                { csv: "country", db: "country" }
              ].map((mapping, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-lg border bg-muted">
                    <p className="text-sm font-medium">{mapping.csv}</p>
                  </div>
                  <span className="text-gray-400">→</span>
                  <select className="flex-1 px-3 py-2 border rounded-md text-sm">
                    <option selected>{mapping.db}</option>
                    <option>Skip field</option>
                  </select>
                </div>
              ))}
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b">
                  <tr>
                    <th className="px-3 py-2 text-left">firstName</th>
                    <th className="px-3 py-2 text-left">lastName</th>
                    <th className="px-3 py-2 text-left">email</th>
                    <th className="px-3 py-2 text-left">phone</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="px-3 py-2">John</td>
                      <td className="px-3 py-2">Doe</td>
                      <td className="px-3 py-2">john@example.com</td>
                      <td className="px-3 py-2">+1234567890</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Showing 3 of 1,245 rows</p>
          </Card>

          <div className="flex gap-3">
            <Button>Continue to Validation</Button>
            <Button variant="outline">Back</Button>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Import ID</th>
                    <th className="px-6 py-3 text-left font-semibold">Name</th>
                    <th className="px-6 py-3 text-right font-semibold">Rows</th>
                    <th className="px-6 py-3 text-right font-semibold">Imported</th>
                    <th className="px-6 py-3 text-right font-semibold">Failed</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockImports.map((imp) => (
                    <tr key={imp.id} className="border-b hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium text-sm">{imp.id}</td>
                      <td className="px-6 py-4">{imp.name}</td>
                      <td className="px-6 py-4 text-right">{imp.rows}</td>
                      <td className="px-6 py-4 text-right font-medium text-green-600">{imp.imported}</td>
                      <td className="px-6 py-4 text-right font-medium text-red-600">{imp.failed}</td>
                      <td className="px-6 py-4">
                        {imp.status === "Completed" && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
                          </div>
                        )}
                        {imp.status === "Failed" && (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <Badge className="bg-red-100 text-red-800 text-xs">Failed</Badge>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{imp.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
