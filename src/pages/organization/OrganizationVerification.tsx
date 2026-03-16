import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockVerificationQueue } from "@/lib/mockData";

export default function OrganizationVerification() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Verification</h1>
        <p className="text-muted-foreground mt-1">Manage verification requests and approvals</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-3xl font-bold mt-2">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">In Review</p>
          <p className="text-3xl font-bold mt-2">1</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-3xl font-bold mt-2">1</p>
        </Card>
      </div>

      {/* Verification Queue */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Organization</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Submitted</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Review</th>
              </tr>
            </thead>
            <tbody>
              {mockVerificationQueue.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{item.organizationName}</td>
                  <td className="p-4">{item.type}</td>
                  <td className="p-4 text-sm text-muted-foreground">{item.submittedAt}</td>
                  <td className="p-4">
                    <Badge className={
                      item.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      item.status === "Approved" ? "bg-green-100 text-green-800" :
                      "bg-blue-100 text-blue-800"
                    }>{item.status}</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200">
                      Review
                    </span>
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
