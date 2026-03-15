import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";

const mockWithdrawals = [
  { id: 1, team: "Star Academy", category: "U-14 Male", reason: "Insufficient players", status: "Pending", requestDate: "2024-03-22" },
  { id: 2, team: "Rising Stars", category: "U-16 Female", reason: "Coach unavailable", status: "Approved", requestDate: "2024-03-20" },
];

export default function TeamWithdrawal() {
  return (
    <div className="space-y-6" role="main" aria-label="Team withdrawal">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Team Withdrawal</h1>
        <p className="text-muted-foreground mt-1">Manage team withdrawal requests</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Team</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Reason</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockWithdrawals.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{item.team}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {item.reason}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={item.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.status === "Pending" && (
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline">Approve</Button>
                        <Button size="sm" variant="destructive">Reject</Button>
                      </div>
                    )}
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
