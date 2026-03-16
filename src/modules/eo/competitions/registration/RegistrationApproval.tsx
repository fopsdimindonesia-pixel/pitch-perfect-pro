import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Check, X } from "lucide-react";

const mockApprovals = [
  { id: 1, club: "SSB Garuda Muda", category: "U-16 Male", reason: "Standard registration", status: "Pending" },
  { id: 2, club: "Youth Academy", category: "U-12 Mixed", reason: "Needs birth certificate verification", status: "Pending" },
  { id: 3, club: "Training Center", category: "U-14 Female", reason: "Coach credential review", status: "Pending" },
];

export default function RegistrationApproval() {
  return (
    <div className="space-y-6" role="main" aria-label="Registration approval">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Registration Approval</h1>
        <p className="text-muted-foreground mt-1">{mockApprovals.length} pending approvals</p>
      </div>

      <div className="space-y-4">
        {mockApprovals.map((item) => (
          <Card key={item.id} className="p-6 border-l-4 border-l-yellow-500">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.club}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                <div className="flex items-center gap-2 mt-3 text-sm text-orange-700 bg-orange-50 p-2 rounded w-fit">
                  <AlertCircle className="w-4 h-4" />
                  {item.reason}
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4" />
                  Approve
                </Button>
                <Button variant="destructive" className="gap-2">
                  <X className="w-4 h-4" />
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {mockApprovals.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">
          <p>No pending approvals</p>
        </Card>
      )}
    </div>
  );
}
