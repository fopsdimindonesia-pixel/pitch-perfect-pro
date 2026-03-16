import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockVerificationQueue } from "@/lib/mockData";

export default function EventOrganizerVerification() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">EO Verification</h1>
        <p className="text-muted-foreground mt-1">Manage verification requests</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-3xl font-bold mt-2">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-3xl font-bold mt-2">1</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Rejected</p>
          <p className="text-3xl font-bold mt-2">0</p>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Organization</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Submitted</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Documents</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockVerificationQueue.map((ver) => (
                <tr key={ver.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{ver.organizationName}</td>
                  <td className="p-4">{ver.type}</td>
                  <td className="p-4 text-sm text-muted-foreground">{ver.submittedAt}</td>
                  <td className="p-4">
                    <Badge className={
                      ver.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      ver.status === "Approved" ? "bg-green-100 text-green-800" :
                      "bg-blue-100 text-blue-800"
                    }>{ver.status}</Badge>
                  </td>
                  <td className="p-4">{ver.documents} files</td>
                  <td className="p-4 text-center">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Review</span>
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
