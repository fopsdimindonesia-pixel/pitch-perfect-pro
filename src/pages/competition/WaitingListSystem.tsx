import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Users } from "lucide-react";

const mockWaitlist = [
  { id: 1, club: "Elite FC", category: "U-16 Male", position: 1, status: "Waiting", appliedDate: "2024-03-25" },
  { id: 2, club: "Star Academy", category: "U-14 Female", position: 2, status: "Waiting", appliedDate: "2024-03-26" },
  { id: 3, club: "Premier Club", category: "U-12 Mixed", position: 3, status: "Waiting", appliedDate: "2024-03-27" },
];

export default function WaitingListSystem() {
  return (
    <div className="space-y-6" role="main" aria-label="Waiting list system">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Waiting List System</h1>
        <p className="text-muted-foreground mt-1">Manage clubs on the waiting list</p>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 border-blue-200 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-900">3 clubs waiting for spots</p>
          <p className="text-xs text-blue-700">Spots available: 2</p>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Position</th>
                <th className="px-6 py-3 text-left font-semibold">Club</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Applied Date</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockWaitlist.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {item.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.club}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.appliedDate}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-Blue-100 text-blue-800">{item.status}</Badge>
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
