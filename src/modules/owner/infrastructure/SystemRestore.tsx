import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockBackups = [
  {
    id: "BK-001",
    date: "2024-12-15 00:00",
    size: "245.8 GB",
    type: "Full",
    status: "Verified"
  },
  {
    id: "BK-002",
    date: "2024-12-11 00:00",
    size: "240.2 GB",
    type: "Full",
    status: "Verified"
  },
  {
    id: "BK-003",
    date: "2024-12-05 00:00",
    size: "238.5 GB",
    type: "Full",
    status: "Verified"
  },
  {
    id: "BK-004",
    date: "2024-11-30 00:00",
    size: "235.9 GB",
    type: "Full",
    status: "Verified"
  }
];

export default function SystemRestore() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Restore</h1>
        <p className="text-muted-foreground mt-1">Restore system from backup</p>
      </div>

      {/* Warning */}
      <Card className="p-4 bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-red-900">Restoration is irreversible</p>
          <p className="text-xs text-red-800">The current system will be overwritten with backup data. All changes after the backup date will be lost.</p>
        </div>
      </Card>

      <Tabs defaultValue="select" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-sm">
          <TabsTrigger value="select">Select</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="restore">Restore</TabsTrigger>
        </TabsList>

        {/* Select Tab */}
        <TabsContent value="select" className="space-y-6">
          <Card>
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Select Backup</h2>
              <p className="text-sm text-muted-foreground mt-1">Choose a backup point to restore from</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {mockBackups.map((backup) => (
                    <tr key={backup.id} className="border-b hover:bg-muted/50 cursor-pointer">
                      <td className="px-6 py-4">
                        <input type="radio" name="backup" defaultChecked={backup.id === "BK-001"} className="w-4 h-4" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{backup.id}</div>
                        <p className="text-xs text-muted-foreground">{backup.date}</p>
                      </td>
                      <td className="px-6 py-4">{backup.type}</td>
                      <td className="px-6 py-4 text-right">{backup.size}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button>Continue to Preview</Button>
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Backup Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Backup ID</p>
                <p className="text-lg font-semibold mt-1">BK-001</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="text-lg font-semibold mt-1">2024-12-15 00:00</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="text-lg font-semibold mt-1">Full Backup</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="text-lg font-semibold mt-1">245.8 GB</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verification</p>
                <p className="text-lg font-semibold mt-1" onChange={(e) => {
                  console.log(e)
                }}>
                  <span className="text-green-600">Verified</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Encryption</p>
                <p className="text-lg font-semibold mt-1">AES-256</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Impact Analysis</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Data Loss</p>
                  <p className="text-xs text-muted-foreground">4 days of data (Dec 15 - Dec 19) will be lost</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Active Sessions</p>
                  <p className="text-xs text-muted-foreground">2,847 active users will be logged out</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Downtime</p>
                  <p className="text-xs text-muted-foreground">Estimated 45-60 minutes of platform downtime</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button>Proceed with Restore</Button>
            <Button variant="outline" onClick={() => history.back()}>Back</Button>
          </div>
        </TabsContent>

        {/* Restore Tab */}
        <TabsContent value="restore" className="space-y-6">
          <Card className="p-6 space-y-6">
            <h2 className="text-lg font-semibold">Confirm Restoration</h2>

            <div className="p-4 rounded-lg border border-red-200 bg-red-50">
              <p className="text-sm font-medium text-red-900">Confirmation Required</p>
              <p className="text-sm text-red-800 mt-2">Please confirm that you want to restore from backup BK-001 (2024-12-15)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type "RESTORE" to confirm</label>
              <input
                type="text"
                placeholder="RESTORE"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">I understand that current data will be overwritten</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">I have backed up current data</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">I accept responsibility for data loss</span>
              </label>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-xs text-blue-900">
                <strong>Timeline:</strong> Restoration will begin in 5 minutes. Platform will be unavailable for approximately 45-60 minutes.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="destructive" disabled>
                Start Restoration
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Restoration Progress</h2>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Overall Progress</p>
                  <span className="text-sm font-semibold">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "0%" }} />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
