import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";

const mockApprovals = [
  { id: 1, item: "Competition Details", status: "Pending", submittedAt: "2024-01-10" },
  { id: 2, item: "Budget Allocation", status: "Approved", submittedAt: "2024-01-08" },
  { id: 3, item: "Venue Arrangement", status: "Pending", submittedAt: "2024-01-12" },
];

export default function CompetitionApproval() {
  return (
    <div className="space-y-6" role="main" aria-label="Competition approval">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Competition Approval</h1>
        <p className="text-muted-foreground mt-1">Track approval status of competition components</p>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          {mockApprovals.map((approval) => (
            <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                {approval.status === "Approved" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
                <div>
                  <p className="font-semibold">{approval.item}</p>
                  <p className="text-sm text-muted-foreground">Submitted: {approval.submittedAt}</p>
                </div>
              </div>
              <Badge className={approval.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                {approval.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Approval Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Items:</span>
            <span className="font-medium">{mockApprovals.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Approved:</span>
            <span className="font-medium text-green-600">{mockApprovals.filter(a => a.status === "Approved").length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pending:</span>
            <span className="font-medium text-yellow-600">{mockApprovals.filter(a => a.status === "Pending").length}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
